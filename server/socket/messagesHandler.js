module.exports = (io, socket, onlineUsers) => {

    const sendMessage = (messageData) => {
        const recipient = onlineUsers.find((e) => e.userId == messageData.recipientId)
        if (recipient) io.to(recipient.socketId).emit('receiveMessage', messageData)
    }

    socket.on('sendMessage', sendMessage)
}