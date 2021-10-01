const express = require('express');
const http = require('http');
const path = require('path');
const dotenv = require("dotenv");
const argv = require('minimist')(process.argv.slice(2));
const date = require('date-utils');
// Environment Variables(환경 변수)
dotenv.config({ path: path.join(__dirname, 'app.config.env') });


//Logging
const logger = require("./logging");

// controllers
const messageController = require('./controllers/message');

// process Argument
process.title = argv.name;

const redisClient = require("redis").createClient();

const application = express();
const httpServer = http.createServer(application);

const io = require("socket.io")(httpServer, {
    cors: {
        // origin: "http://localhost:8080",
        origin: "http://localhost:9999",
        methods: ["GET", "POST"]
    },

    adapter: require("socket.io-redis")(
        {
            host: 'localhost',
            port: 6379
        },
        {
            pubClient: redisClient,
            subClient: redisClient.duplicate(),
        })

})

const { applicationRouter } = require("./routes");

applicationRouter.setup(application);

application.use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(express.static(path.join(__dirname, process.env.STATIC_RESOURCES_DIRECTORY)))
    .set("views", path.join(__dirname, "views"))
    .all("*", function (req, res, next) {
        res.locals.req = req;
        res.locals.resp = res;
        next();
    })
// .use(errorRouter.error404)
// .use(errorRouter.error500);

// Server Setup


httpServer
    .on('listening', function () {
        logger.info(`Http Server Running on Port ${process.env.PORT}`);
    })
    .on('error', function (error) {
        if (error.syscall !== 'listen') {
            throw error;
        }
        switch (error.code) {
            case 'EACCESS':
                logger.error(`Port: ${process.env.PORT} requires privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                logger.error(`Port: ${process.env.PORT} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    })
    .listen(process.env.PORT);



// 모두에게 메세지 보내기
io.of('/').adapter.subClient.on('message', (roomname, message) => {
    const msgToJson = JSON.parse(message);
    // console.log("msgToJson", msgToJson.validation, msgToJson, roomname);

    switch (msgToJson.validation) {
        case "join": io.to(roomname).emit(`join:${roomname}`, msgToJson);
            break;
        case "message": io.to(roomname).emit(`chat:message:${roomname}`, msgToJson);
            break;
        case "members_count": io.to(roomname).emit(`members:count:${roomname}`, msgToJson);
            break;
        case "members_status": io.to(roomname).emit(`members:status:${roomname}`, msgToJson);
            break;
        case "notice": io.to(roomname).emit('notice', msgToJson);
            break;
        case "file": io.to(roomname).emit('file', msgToJson);
            break;
        case "todo": io.to(roomname).emit('todo', msgToJson);
            break;
        case "update": io.to(roomname).emit(`message:update:readCount:${roomname}`, msgToJson);
            break;
        case "infoupdate": io.to(roomname).emit(`room:updateInfo`, msgToJson);
            break;
        case "leave": io.to(roomname).emit(`members:leave:${roomname}`, msgToJson);
            break;
        case "disconnected": io.to(roomname).emit('disconnect message', msgToJson);
    }
});



io.on("connection", (socket) => {
    console.log("node connected");
    let messageObj = {};
    let roomObj = {};
    let participantObj = {};
    let currentRoomName = null;


    // DB에 저장 된 채팅 방 모두 입장
    socket.on('join', (rooms) => {
        socket.join(rooms);

    })

    socket.on('join:chat', async (roomObject, participantObject) => {
        roomObj = roomObject;
        participantObj = participantObject;
        currentRoomName = "room" + roomObject.no;

        redisClient.zadd(roomObject.no, 1, participantObj.no); // key : 채팅방 no, score : 상태 , members : 참여자 no  ==> 상태 1일 경우 온라인 0일 경우 오프라인
        socket.join(currentRoomName);
        io.of('/').adapter.subClient.subscribe(currentRoomName);

        // 신규 유저라면 
        if (!participantObj.hasData) {
            let AllChatMembers = await getAllChatMember(currentRoomName).then(res => res);
            console.log(participantObj)
            const joinMessage = {
                validation: "join",
                message: `${participantObj.chatNickname}님이 입장하셨습니다.`,
                chatRoomNo: roomObj.no,
                AllChatMembers,
                state : 0
            }

            io.of('/').adapter.pubClient.publish(currentRoomName, JSON.stringify(joinMessage));
            participantObj.hasData = true;
        }

        sendMemberStatus(); // 멤버 온라인, 오프라인

        messageObj = {
            participantNo: participantObject.no,
            nickname: participantObject.chatNickname,
            thumbnailUrl: participantObject.thumbnailUrl,
            chatRoomNo: roomObject.no,
            accountNo: participantObject.accountNo,
            notReadCount: "",
            message: ""
        }
    });

    socket.on("participant:updateRead", async (receivedMsg) => {
        console.log("========================= updateRead =========================");
        let changedRows;
        await messageController.updateRead(participantObj).then(res => changedRows = res);
        if (receivedMsg) {
            participantObj.lastReadChatNo = receivedMsg.no;
        }
        console.log("changedRows : " + changedRows);
        const object = {
            "validation": "update",
            changedRows
        }

        if (changedRows) {
            io.of('/').adapter.pubClient.publish(currentRoomName, JSON.stringify(object));
            io.to(socket.id).emit(`update:readCount:${currentRoomName}`, { "chatRoomNo": roomObj.no });
        }
    })

    socket.on("disconnect", async (reason) => {
        redisClient.zadd(getRoomNo(currentRoomName), 0, participantObj.no); // key : 채팅방 no, score : 상태 , members : 참여자 no  ==> 상태 1일 경우 온라인 0일 경우 오프라인
        sendMemberStatus();
        console.log("node disconnected", reason);
    })

    socket.on('chat message', async (message,state) => {
        let chatMembersCount = await getAllChatMember(currentRoomName);
        const insertMsg = Object.assign({}, messageObj, { "validation": "message", "message": message, "notReadCount": chatMembersCount , "state": state} );
        await messageController.addMessage(insertMsg);
        io.of('/').adapter.pubClient.publish(currentRoomName, JSON.stringify(insertMsg));
    });

    socket.on("notice:send", (notice, noticeNo) => {
        const createdAt = new Date();
        const noticeObject = {
            validation: "notice",
            noticeAdd: true,
            participantNo: participantObj.no,
            accountNo: participantObj.accountNo,
            nickname: participantObj.chatNickname,
            thumbnailUrl: participantObj.thumbnailUrl,
            no: noticeNo,
            notice: notice,
            createdAt: createdAt.toFormat('MM/DD HH24:MI')
        }
        io.of('/').adapter.pubClient.publish(currentRoomName, JSON.stringify(noticeObject));
    });

    socket.on('notice:delete', (noticeNo) => {
        const noticeObject = {
            validation: "notice",
            noticeAdd: false,
            no: noticeNo,
        }
        io.of('/').adapter.pubClient.publish(currentRoomName, JSON.stringify(noticeObject));
    });


    socket.on("file:send", (files) => {
        const createdAt = new Date();
        for (let i = 0; i < files.length; i++) {
            files[i].createdAt = createdAt.toFormat('YYYY/MM/DD');
        }
        const filesObject = {
            validation: "file",
            files: files,
        }
        io.of('/').adapter.pubClient.publish(currentRoomName, JSON.stringify(filesObject));
    });

    socket.on("todo", (validation, data) => {
        const todoObject = {
            validation: "todo",
            purpose: validation,
            todo: data,
        }
        io.of('/').adapter.pubClient.publish(currentRoomName, JSON.stringify(todoObject));
    });

    socket.on("room:update", (data) => {
        const roomObject = { validation: "infoupdate", roomObject: data };
        io.of('/').adapter.pubClient.publish(currentRoomName, JSON.stringify(roomObject));
    })



    /** leave
     * 방 퇴장
     * 회원 / 비회원 상관없이 나가면 
     */

    // leave:chat-section -> chatsection에서 나가게 되면 redis에 담긴 상태 변화함( 온라인, 오프라인 용도)
    socket.on('leave:chat-section', async () => {
        redisClient.zadd(getRoomNo(currentRoomName), 0, participantObj.no); // key : 채팅방 no, score : 상태 , members : 참여자 no  ==> 상태 1일 경우 온라인 0일 경우 오프라인
        sendMemberStatus();
    });

    // leave:chat-room -> 방 나가기로 소켓에서도 떠나야함. (DB에서 참여자가 채팅방에서 나갔을때)
    socket.on('leave:chat-room', async (chatRoomNo, participantNo) => {

        // socket.leave(data.roomName, (result) => { });
        // 회원
        // key : 채팅방 no, score : 상태 , members : 참여자 no  ==> 상태 1일 경우 온라인 0일 경우 오프라인

        // 비회원
        // roomNo, participantNo를 가져와야 하는데 front단에서 넘겨줘야 하지 않을까??????

        redisClient.zrem(chatRoomNo, `${participantNo}`, (err, result) => {
            console.log(result); // 1
        });
        const memberObj = {
            "chatRoomNo": chatRoomNo,
            "participantNo": participantNo,
        }
        const leaveMessage = {
            "validation": "leave",
            "message": `${socket.id}님이 room${chatRoomNo}방을 나가셨습니다.`,
            memberObj
        }
        
        io.to(socket.id).emit(`room:leave:room${chatRoomNo}`);

        io.of('/').adapter.pubClient.publish(`room${chatRoomNo}`, JSON.stringify(leaveMessage));
        

        // io.of('/').adapter.subClient.unsubscribe(`room${chatRoomNo}`) // 구독하고 있는 방 해제 / 얘를 하면 다른애들도 pub이안옴

        // io.of('/').adapter.subClient.end(); // 구독자 설정 해제
        // io.of('/').adapter.pubClient.end(); // 발행자 설정 해제

        /* io.of('/').adapter.subClient.unsubscribe(data.roomName) // 구독하고 있는 방 해제
        io.of('/').adapter.pubClient.publish(data.roomName, JSON.stringify(leaveMsg));
        io.of('/').adapter.subClient.end(); // 구독자 설정 해제
        io.of('/').adapter.pubClient.end(); // 발행자 설정 해제 */

        // TODO: DB room에서 회원 / 비회원 관련 데이터 삭제

    });

    // delete:chat-room -> 방 삭제했을 때
    socket.on("delete:chat-room", () => {

    });

    const sendMemberStatus = async () => {
        let onlineChatMember;
        await getOnlineChatMember(currentRoomName).then(res => onlineChatMember = res);
        console.log(onlineChatMember);
        const object = {
            "validation": "members_status",
            onlineChatMember
        }

        io.of('/').adapter.pubClient.publish(currentRoomName, JSON.stringify(object));
    }

});

const getOnlineChatMember = currentRoomName => { // 해당 채팅방의 온라인 상태인 유저의 no 
    currentRoomName = getRoomNo(currentRoomName);

    return new Promise((resolve, reject) => {
        redisClient.zrevrangebyscore(currentRoomName, 1, 1, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
};

const getAllChatMember = currentRoomName => { // 해당 채팅방의 총 인원 구할 때 사용
    currentRoomName = getRoomNo(currentRoomName);

    return new Promise((resolve, reject) => {
        redisClient.zcard(currentRoomName, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

const getRoomNo = currentRoomName => {
    return currentRoomName.split("room")[1];
}