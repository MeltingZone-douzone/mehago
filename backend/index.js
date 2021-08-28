const express = require('express');
const http = require('http');
const path = require('path');
const dotenv = require("dotenv");
const argv = require('minimist')(process.argv.slice(2));

// Environment Variables(환경 변수)
dotenv.config({ path: path.join(__dirname, 'app.config.env') });


//Logging
const logger = require("./logging");

// handlers
const ChatRoomHandler = require('./handlers/ChatRoomHandler');
const MessageHandler = require('./handlers/MessageHandler');


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

const onConnection = (socket) => {
    ChatRoomHandler(io, socket);
    MessageHandler(io, socket);
}



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

io.on("connection", onConnection);



socket.on('chat message', (messageObject) => {
    console.log(messageObject);
    // TODO: DB 저장
    // join할 떄 변수에 넣어둔 curRoom 쓸까 아니면 front에서 받아서 쓸까
    pubClient.publish(curRoom, `${messageObject.nickname} : ${messageObject.message}`);

});



/** leave
 * 방 퇴장
 * 회원 / 비회원 상관없이 나가면 
 */
socket.on('leave', (data) => {
    console.log('user leave', data);
    socket.leave(data.roomName, (result) => { });
    subClient.unsubscribe(data.roomName) // 구독하고 있는 방 해제
    pubClient.publish(data.roomName, `${socket.id}님이 방을 나가셨습니다.`);
    subClient.end(); // 구독자 설정 해제
    pubClient.end(); // 발행자 설정 해제

    // TODO: DB room에서 회원 / 비회원 관련 데이터 삭제
});


/** join
 * 새로운 방 입장
 * room 방이름 받아옴
 * 비회원도 토큰발급
 */

socket.on('join', (data) => {
    curRoom = data.roomName;
    nickname = data.nickname;
    console.log(`nickname ${data.nickname} join room ${data.roomName}`);
    socket.join(data.roomName);
    subClient.subscribe(data.roomName);
    pubClient.publish(data.roomName, ` [알림] '${data.nickname}' 이 '${data.roomName}'에 입장`); // = SYSTEM = 유준 님이 입장하셨습니다.
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
