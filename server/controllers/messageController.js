const { GenerateError } = require('../helpers');
const { messageModel, chatModel, userModel } = require('../models');

// create a new message

const createMessage = async (req, res, next) => {
    try {
        const { chat: chatId, sender, receiver, text } = req.body;


        if (!chatId || !sender || !receiver || !text) throw new GenerateError(400, 'Missing property: chat, sender or text')

        const chat = await chatModel.findById(chatId)
        if (!chat) throw new GenerateError(404, 'No chat for the provided chat was found')

        const user = await userModel.findById(sender)
        if (!user) throw new GenerateError(404, 'No user for the provided sender was found')


        const message = await messageModel.create({
            chat: chatId,
            sender,
            text
        })

        await chatModel.findByIdAndUpdate(
            chatId,
            {
                lastMessage: text,
                $inc: { [`unreadCounts.${receiver}`]: 1 },
                lastMessageAt: message.createdAt
            },
            { new: true }
        );

        res.status(200).json(message)
    } catch (error) {
        next(error)
    }
}
// retrieve chat messages

const getMessages = async (req, res, next) => {
    try {

        const { chat: chatId, userId } = req.query

        if (!chatId) throw new GenerateError(400, 'Missing chat')

        const chat = await chatModel.findById(chatId)
        if (!chat) throw new GenerateError(404, 'No chat for the provided chat was found')

        const messages = await messageModel.find({ chat: chatId })

        await chatModel.findByIdAndUpdate(
            chatId,
            { $set: { [`unreadCounts.${userId}`]: 0 } },
            { new: true }
        );

        res.status(200).json(messages);

    } catch (error) {
        next(error)
    }
}


module.exports = {
    createMessage,
    getMessages
}