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
const { notice } = require('./logging');
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
    const msgToJson = JSON.parse(message);
    console.log("msgToJson",msgToJson.validation);

    switch(msgToJson.validation) {
        case "object" : io.to(roomname).emit('chat message', msgToJson);
            break;
        case "notice" : io.to(roomname).emit('notice', message);
            break;
        case "update" : io.to(roomname).emit('message:update:readCount', msgToJson.changedRows);
    }
    
});

io.on("connection", (socket) => {
    console.log("node connected");
    let messageObj = {};
    let roomObj = {};
    let participantObj = {};
    let currentRoomName = null;


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

        roomObj = roomObject;
        participantObj = participantObject;
        currentRoomName = "room" + roomObject.no;
        socket.join(currentRoomName);
        io.of('/').adapter.subClient.subscribe(currentRoomName);
        const noticeMessage = {
            validation: "notice",
            message : `notice::${socket.id}님이 방을 나가셨습니다.`
        }
        io.of('/').adapter.pubClient.publish(currentRoomName, JSON.stringify(noticeMessage));
        messageObj = {
            participantNo: participantObject.no,
            chatRoomNo: roomObject.no,
            not_read_count: roomObject.not_read_count, // spring boot 에서 처리후 가져오기 값에 담아서 가져오기
            message: ""
        }
    });

    socket.on("participant:updateRead", async ()=>{
        console.log("=========================updateRead=========================");
        let changedRows;
        await messageController.updateRead(participantObj).then(res => changedRows = res);
        console.log(changedRows);
        const object = {
            "validation": "update",
            "changedRows": changedRows
        }

        changedRows ?  io.of('/').adapter.pubClient.publish(currentRoomName, JSON.stringify(object)) : null;
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
    socket.on("disconnect", (reason) => {
        console.log("node disconnected", reason)
    })


    socket.on('chat message', (message) => {
        // TODO: DB 저장
        const insertMsg = Object.assign({}, messageObj, {"validation" : "object" ,"message":message});
        messageController.addMessage(insertMsg);

        io.of('/').adapter.pubClient.publish(currentRoomName, JSON.stringify(insertMsg));
    });



    /** leave
     * 방 퇴장
     * 회원 / 비회원 상관없이 나가면 
     */
    socket.on('leave', (data) => {
        console.log('user leave', data);
        socket.leave(data.roomName, (result) => { });
        io.of('/').adapter.subClient.unsubscribe(data.roomName) // 구독하고 있는 방 해제
        io.of('/').adapter.pubClient.publish(data.roomName, `notice:${socket.id}님이 방을 나가셨습니다.`);
        io.of('/').adapter.subClient.end(); // 구독자 설정 해제
        io.of('/').adapter.pubClient.end(); // 발행자 설정 해제

        // TODO: DB room에서 회원 / 비회원 관련 데이터 삭제
    });


});
