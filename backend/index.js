const express = require('express');
const http = require('http');
const path = require('path');
const dotenv = require("dotenv");
const argv = require('minimist')(process.argv.slice(2));

// const elasticsearch = require('elasticsearch');
// const client = new elasticsearch.Client({
//     node:"localhost:9200"

// });

// async function run () {
//     client.ping({
//         // ping usually has a 3000ms timeout
//         requestTimeout: 1000
//       }, function (error) {
//         if (error) {
//           console.trace('elasticsearch cluster is down!');
//         } else {
//           console.log('All is well');
//         }
//       });


//       // callback API
//       const result = await client.search({
//         index: 'my_index',
//         body: {
//           query: {
//             match: { hello: 'world' }
//           }
//         }
//       }, (err, result) => {
//         if (err) console.log(err)
//       });

//       console.log(result);
// }

// run().catch(console.log)

// // Add this to the VERY top of the first file loaded in your app
// var apm = require('elastic-apm-node').start({

//     // Override the service name from package.json
//     // Allowed characters: a-z, A-Z, 0-9, -, _, and space
//     serviceName: 'message',

//     // Use if APM Server requires a secret token
//     secretToken: '',

//     // Set the custom APM Server URL (default: http://localhost:8200)
//     serverUrl: 'http://localhost:8200',


//     })


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
const { default: axios } = require('axios');
const { notice } = require('./logging');
const { resolve } = require('path');
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
    console.log("msgToJson", msgToJson.validation, msgToJson);

    switch (msgToJson.validation) {
        case "join": io.to(roomname).emit('join message', msgToJson);
            break;
        case "object": io.to(roomname).emit('chat message', msgToJson);
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
    let roomObj = {};
    let participantObj = {};
    let currentRoomName = null;


    socket.on('join', async (roomObject, participantObject) => {
        // console.log(socket.adapter.rooms); 
        roomObj = roomObject;
        participantObj = participantObject;
        currentRoomName = "room" + roomObject.no;
        redisClient.sadd(currentRoomName, participantObj.no);
        socket.join(currentRoomName);
        io.of('/').adapter.subClient.subscribe(currentRoomName);

        let chatMember;
        await getChatMember(currentRoomName).then(res => chatMember = res);

        const joinMessage = {
            validation: "join",
            message: `notice::${socket.id}님이 ${roomObj.no}방을 입장하셨습니다.`,
            chatMember
        }

        io.of('/').adapter.pubClient.publish(currentRoomName, JSON.stringify(joinMessage));
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
    socket.on("notice:send", async (notice) => {
        const noticeObject = {
            participantNo: participantObj.no,
            chatRoomNo: roomObj.no,
            notice: notice,
        }
        noticeController.addNotice(noticeObject);
    });

    socket.on("file:send", async (files) => {
        // console.log(files);
        // fileController.addFile(participantObj.no, roomObj.no, files);
    });

    socket.on('leave', async (data) => { // data는 의미없음 지금. roomname받아와야하는데 이미 currentRoomname에 "room 1" ㅣㅇ런식으로 나와잇어서 받아와서 앞에 "room "을 더해야하니까 굳이할필요있나업나몰라안함그래서
        // socket.leave(data.roomName, (result) => { });
        redisClient.srem(currentRoomName, participantObj.no);
        socket.leave(currentRoomName, (result) => { });
        console.log('currentRoomName: ', currentRoomName);
        console.log('participantObj.no: ', participantObj.no);
        
        let chatMember;
        await getChatMember(currentRoomName).then(res => chatMember = res);

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