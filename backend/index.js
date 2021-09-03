const express = require('express');
const http = require('http');
const path = require('path');
const dotenv = require("dotenv");
const argv = require('minimist')(process.argv.slice(2));
const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
    host: "localhost:9999"
})

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
        console.log(req);
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
    console.log(`${roomname} 에 ${message}를 보냄`);
    io.to(roomname).emit('chat message', message);
});



io.on("connection", (socket) => {
    console.log("node connected");
    let messageObj = {};

    let currentRoom = null;
    let nickname = null;

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
    socket.on("disconnect", (reason) => {
        console.log("node disconnected", reason)
    })


    socket.on('chat message', (message) => {
        // TODO: DB 저장
        const insertMsg = Object.assign({}, messageObj, {"message":message});
        console.log('messageObj: ', messageObj);
        messageController.addMessage(insertMsg);
        console.log(currentRoom);
        io.of('/').adapter.pubClient.publish(currentRoom, JSON.stringify(insertMsg));
    });



    /** leave
     * 방 퇴장
     * 회원 / 비회원 상관없이 나가면 
     */
    socket.on('leave', (data) => {
        console.log('user leave', data);
        socket.leave(data.roomName, (result) => { });
        io.of('/').adapter.subClient.unsubscribe(data.roomName) // 구독하고 있는 방 해제
        io.of('/').adapter.pubClient.publish(data.roomName, `${socket.id}님이 방을 나가셨습니다.`);
        io.of('/').adapter.subClient.end(); // 구독자 설정 해제
        io.of('/').adapter.pubClient.end(); // 발행자 설정 해제

        // TODO: DB room에서 회원 / 비회원 관련 데이터 삭제
    });


    /** join
     * 새로운 방 입장
     * room 방이름 받아옴
     * 비회원도 토큰발급
     */

    socket.on('join', (roomObject, participantObject) => {
        /*  redis에
            room : {
                no : {
                    user :{

                    }, {

                    }
                },

                no2 : {
                    user :{

                    }, {

                    }
                }
            } 이런식으로 담으면 어떨까..? 그러면 어떤 방이 있는지, 누가 처음들어왔는지 이전에 있던 사람인지 성능 측면으로 좋아지지 않을까?
        */

        console.log(roomObject, participantObject);
        currentRoom = "room " + roomObject.title;
        socket.join(currentRoom);
        io.of('/').adapter.subClient.subscribe(currentRoom);
        // io.to(curRoom).emit('join', 'join!!!!');
        io.of('/').adapter.pubClient.publish(currentRoom, ` [알림] '${participantObject.chatNickname}' 이 '${roomObject.title}'에 입장`);

        messageObj = {
            participantNo: participantObject.no,
            chatRoomNo: roomObject.no,
            not_read_count: roomObject.not_read_count, // spring boot 에서 처리후 가져오기 값에 담아서 가져오기
            message: ""
        }
        // 1. 처음들어온사람 입장 메시지
        // 2. 기존 채팅방 사람 notreadcount 수정해줘야함


        /* if(token.verifyCheck(data.token)) {
            console.log(`User ${data.nickname} join room ${data.roomName}`);
            socket.join(data.roomName);
            sub.subscribe(data.roomName);
            pub.publish(data.roomName, chat.setMsg(data, 'room', ' [알림] ')); // = SYSTEM = 유준 님이 입장하셨습니다.
        } else {
            pub.publish('chat', chat.setMsg({}, 'self',' [알림] ', MESSAGE.validationExpired, data.roomName));
            // socket.emit('chat', chat.setMsg({}, 'self',' [알림] ', MESSAGE.validationExpired, data.roomName));
        } */
    });
});



/*
    socket.on('change room', (roomName) =>{
        socket.join(roomName);
        subClient.subscribe(roomName);
        pubClient.publish(roomName, `${socket.id}: 입장했습니다.`);
        curRoom = roomName;
    });
*/
