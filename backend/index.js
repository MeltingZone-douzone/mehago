const express = require('express');
const http = require('http');
const path = require('path');
const dotenv = require("dotenv");
const argv = require('minimist')(process.argv.slice(2));

// Environment Variables(환경 변수)
dotenv.config({ path: path.join(__dirname, 'app.config.env') });


//Logging
const logger = require("./logging");


// process Argument
process.title = argv.name;


const chatRouter = require('./routes/chat');


const application = express();
const httpServer = http.createServer(application);
const io = require("socket.io")(httpServer,{
    cors:{
        // origin: "http://localhost:8080",
        origin: "http://localhost:9999",
        methods: ["GET","POST"]
    }
})

// const onConnection = (socket) => {
//     chatRouter(io, socket);
// }



application
                            .use(express.urlencoded({extended: true})) 
                            .use(express.json())
                            .use(express.static(path.join(__dirname, process.env.STATIC_RESOURCES_DIRECTORY)))
                            .set("views",path.join(__dirname,"views"))
                            .all("*", function(req, res, next) {
                                console.log(req);
                                res.locals.req = req;
                                res.locals.resp = res;
                                next();
                            })
                            .use("/chatting", chatRouter);
                            // .use(errorRouter.error404)
                            // .use(errorRouter.error500);

// Server Setup

httpServer
    .on('listening', function() {
        logger.info(`Http Server Running on Port ${process.env.PORT}`);
    })
    .on('error', function(error) {
        if(error.syscall !== 'listen') {
            throw error;
        }
        switch(error.code) {
            case 'EACCESS' : 
                logger.error(`Port: ${process.env.PORT} requires privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE' :
                logger.error(`Port: ${process.env.PORT} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    })
    .listen(process.env.PORT);

io.on("connection", (socket) =>{
    console.log("node connected");
    socket.on("disconnect", (reason) =>{
        console.log("node disconnected", reason)
    })
});


