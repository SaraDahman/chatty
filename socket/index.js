const { Server } = require('socket.io')

const onlineUsers = []

const io = new Server({
    cors: {
        origin: 'http://localhost:5173'
    }
})

io.on('connection', (socket) => {
    console.log('new connection', socket.id);

    // add a user when they log in
    socket.on("addOnlineUser", (userId) => {
        if (!onlineUsers.some((user) => user.userId === userId) && userId) {
            onlineUsers.push({
                userId,
                socketId: socket.id
            });
        }

        io.emit('getOnlineUsers', onlineUsers);
    });

    // remove a user when they disconnect
    socket.on('disconnect', () => {
        const index = onlineUsers.findIndex(user => user.socketId === socket.id);
        if (index !== -1) {
            onlineUsers.splice(index, 1);
            io.emit('getOnlineUsers', onlineUsers);
        }
    });

    // send a message 
    socket.on('sendMessage', (messageData) => {

        const recipient = onlineUsers.find((e) => e.userId == messageData.recipientId)

        if (recipient) io.to(recipient.socketId).emit('receiveMessage', messageData)
    })
})

io.listen(5000)