module.exports = (io, socket, onlineUsers) => {

    const sendMessage = (messageData) => {
        const recipient = onlineUsers.find((e) => e.userId == messageData.recipientId)
        if (recipient) io.to(recipient.socketId).emit('receiveMessage', messageData)
    }

    const sendMessageNotifications = ({ recipientId, messageData }) => {
        const recipient = onlineUsers.find((e) => e.userId == recipientId);

        if (recipient) io.to(recipient.socketId).emit('receiveMessageNotifications', { ...messageData, recipient: recipientId })
    }

    socket.on('sendMessage', sendMessage)
    socket.on('sendMessageNotifications', sendMessageNotifications)
}