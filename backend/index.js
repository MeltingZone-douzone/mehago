const express = require('express');
const http = require('http');
const path = require('path');
const dotenv = require("dotenv");
const argv = require('minimist')(process.argv.slice(2));

// Environment Variables(환경 변수)
dotenv.config({ path: path.join(__dirname, 'app.config.env') });


//Logging
const logger = require("./logging");

// controllers
const messageController = require('./controllers/message');
const todoController = require('./controllers/todo');
const noticeController = require('./controllers/notice');
// const fileController = require('./controllers/file');

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


io.of('/').adapter.subClient.on('message', (roomname, message) => {
    const msgToJson = JSON.parse(message);
    // console.log("msgToJson", msgToJson.validation, msgToJson);
    // console.log("msgToJson", msgToJson.validation);

    switch (msgToJson.validation) {
        case "join": io.to(roomname).emit('join message', msgToJson);
            break;
        case "object": io.to(roomname).emit(`chat:message:${roomname}`, msgToJson);
            break;
        case "notice": io.to(roomname).emit('notice', message);
            break;
        case "update": io.to(roomname).emit('message:update:readCount', msgToJson);
            break;
        case "leave": io.to(roomname).emit('leave message', msgToJson);
            break;
        case "disconnected": io.to(roomname).emit('disconnect message', msgToJson);
    }

});

io.on("connection", (socket) => {
    console.log("node connected");
    let messageObj = {};
    // 레디스에 방들을 담아서 따로 할 필요 없이 해야함 
    // --> notReadChatCount 실시간으로 업데이트하기 위해선 처음 메세지를 저장할 때 총 인원수를 넣어야하는데
    // --> DB나 React에서 처리하게 되면 사람마다 다르게 업데이트 될 수 있음. 아니면 노드에서..?
    let roomObj = {};
    let participantObj = {};
    let currentRoomName = null;


    // DB에 저장 된 채팅 방 모두 입장
    socket.on('join', (rooms) => {
        console.log(rooms);
        socket.join(rooms);
    })


    socket.on('join:chat', async (roomObject, participantObject) => {
        roomObj = roomObject;
        participantObj = participantObject;
        // hasData는 뭔지 사용처가 없다면 false일때 ( 000님 입장했습니다.)메세지 보내기
        currentRoomName = "room" + roomObject.no;
        redisClient.sadd(currentRoomName, participantObj.no);
        socket.join(currentRoomName);
        io.of('/').adapter.subClient.subscribe(currentRoomName);
        let chatMember;
        await getChatMember(currentRoomName).then(res => chatMember = res);

        if(!participantObj.hasData) {

            const joinMessage = {
                validation: "join",
                message: `notice::${socket.id}님이 ${roomObj.no}방을 입장하셨습니다.`,
                chatMember
            }

            io.of('/').adapter.pubClient.publish(currentRoomName, JSON.stringify(joinMessage));
        }

        messageObj = {
            participantNo: participantObject.no,
            chatRoomNo: roomObject.no,
            not_read_count: roomObject.not_read_count, // spring boot 에서 처리후 가져오기 값에 담아서 가져오기
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

        let chatMember;
        await getChatMember(currentRoomName).then(res => chatMember = res);

        const object = {
            "validation": "update",
            changedRows,
            chatMember
        }

        changedRows ? io.of('/').adapter.pubClient.publish(currentRoomName, JSON.stringify(object)) : null;
    })

    /** disconnect
     *  다른 방 보려고 잠시 뒤로가기 / 안나감
     * 강제종료, 튕긴거, 뒤로가기 구분?
     */
    /* if ("비회원") {
        socket.leave(roomName); //  ㄴㄴ?
        subClient.unsubscribe(roomName)
        pubClient.publish(roomName, `${socket.id}님이 방을 나가셨습니다.`);
        // TODO: DB room에서 비회원 관련 데이터 삭제
    } 
    // TODO: DB room에서 회원 관련 데이터 삭제
    socket.leave(data.roomName); */

    // TODO: disconnect도 srem추가해서 chatMember보내야함
    socket.on("disconnect", async (reason) => {
        if (currentRoomName !== null) {
            console.log('브라우저끔');
            redisClient.srem(currentRoomName, participantObj.no);
            socket.leave(currentRoomName, (result) => { });
            
            let chatMember;
            await getChatMember(currentRoomName).then(res => chatMember = res);
            
            const disconnectMessage = {
                "validation": "disconnected",
                "message": `notice:${socket.id}님이 ${currentRoomName}방을 나가셨습니다.(disconnected)`,
                chatMember
            }
            io.of('/').adapter.pubClient.publish(currentRoomName, JSON.stringify(disconnectMessage));
        }


        console.log("node disconnected", reason);
    })

    socket.on('chat message', async (message) => {
        let chatMember = await getChatCount(currentRoomName);
        // 총 인원수 수정 필요 => Navi에 유저를 구하는데 거기서 총 몇명인지 가져와야함.
        const insertMsg = Object.assign({}, messageObj, { "validation": "object", "message": message, "notReadCount": chatMember });
        await messageController.addMessage(insertMsg);
        io.of('/').adapter.pubClient.publish(currentRoomName, JSON.stringify(insertMsg));
    });

    socket.on("todo:send", async (date, todo) => {
        const todoObject = {
            participantNo: participantObj.no,
            chatRoomNo: roomObj.no,
            todo: todo,
            date: date,
        }
        todoController.addTodo(todoObject);

    });
    socket.on("notice:send", async (notice, accountNo) => {
        console.log(notice, accountNo);
        const noticeObject = {
            participantNo: participantObj.no,
            chatRoomNo: roomObj.no,
            accountNo: accountNo,
            notice: notice,
        }
        noticeController.addNotice(noticeObject);
    });

    socket.on("file:send", async (files) => {
        // console.log(files);
        // fileController.addFile(participantObj.no, roomObj.no, files);
    });




    /** leave
     * 방 퇴장
     * 회원 / 비회원 상관없이 나가면 
     */

    // leave:chat-section -> chatsection에서 나가게 되면 redis에 담긴 유저 지워야함( 온라인, 오프라인 용도)
    // leave:chat-room -> 방 나가기로 소켓에서도 떠나야함.

    socket.on('leave:chat-section', async () => { 
        redisClient.srem(currentRoomName, participantObj.no);

        let chatMember;
        await getChatMember(currentRoomName).then(res => chatMember = res);

        
    });

    // leave:chat-room -> 방 나가기로 소켓에서도 떠나야함. (DB에서 채팅방 is_deleted = true 일때)
    socket.on('leave:chat-room', ()=>{

        // socket.leave(data.roomName, (result) => { });

        const leaveMessage = {
            "validation": "leave",
            "message": `notice:${socket.id}님이 ${currentRoomName}방을 나가셨습니다.`,
            chatMember
        }
        io.of('/').adapter.pubClient.publish(currentRoomName, JSON.stringify(leaveMessage));


        // io.of('/').adapter.subClient.unsubscribe(currentRoomName) // 구독하고 있는 방 해제 / 얘를 하면 다른애들도 pub이안옴

        // io.of('/').adapter.subClient.end(); // 구독자 설정 해제
        // io.of('/').adapter.pubClient.end(); // 발행자 설정 해제

        /* io.of('/').adapter.subClient.unsubscribe(data.roomName) // 구독하고 있는 방 해제
        io.of('/').adapter.pubClient.publish(data.roomName, JSON.stringify(leaveMsg));
        io.of('/').adapter.subClient.end(); // 구독자 설정 해제
        io.of('/').adapter.pubClient.end(); // 발행자 설정 해제 */

        // TODO: DB room에서 회원 / 비회원 관련 데이터 삭제

    });

});

const getChatCount = currentRoomName => {
    return new Promise((resolve, reject) => {
        redisClient.scard(currentRoomName, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
};

const getChatMember = currentRoomName => {
    return new Promise((resolve, reject) => {
        redisClient.smembers(currentRoomName, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
};