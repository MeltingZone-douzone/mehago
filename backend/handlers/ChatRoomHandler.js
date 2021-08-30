module.exports = (io, socket) => {
    const changeRoom = (room) => {
        socket.join(room);
        io.of('/').adapter.subClient.subscribe(room); //of('/') : namespace
        io.of('/').adapter.pubClient.publish(room, `${socket.id}: 입장했습니다.`);

    }




    socket.on("room:change", changeRoom);

}