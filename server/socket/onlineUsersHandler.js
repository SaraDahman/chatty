module.exports = (io, socket, onlineUsers) => {

    const addOnlineUser = (userId) => {
        if (!onlineUsers.some((user) => user.userId === userId) && userId) {
            onlineUsers.push({
                userId,
                socketId: socket.id
            });
        }

        io.emit('getOnlineUsers', onlineUsers);
    }


    const removeOnlineUser = () => {
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id)
        io.emit('getOnlineUsers', onlineUsers);
    }



    socket.on('addOnlineUser', addOnlineUser);
    socket.on('disconnect', removeOnlineUser);
}