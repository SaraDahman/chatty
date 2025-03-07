const { GenerateError } = require('../helpers');
const { messageModel, chatModel, userModel } = require('../models');

// create a new message

const createMessage = async (req, res, next) => {
    try {
        const { chatId, senderId, text } = req.body;
        if (!chatId || !senderId || !text) throw new GenerateError(400, 'Missing property: chatId, senderId or text')

        const chat = await chatModel.findById(chatId)
        if (!chat) throw new GenerateError(404, 'No chat for the provided chatId was found')

        const user = await userModel.findById(senderId)
        if (!user) throw new GenerateError(404, 'No user for the provided senderId was found')


        const message = await messageModel.create({
            chatId,
            senderId,
            text
        })

        res.status(200).json(message)
    } catch (error) {
        next(error)
    }
}
// retrieve chat messages

const getMessages = async (req, res, next) => {
    try {

        const { chatId } = req.query
        if (!chatId) throw new GenerateError(400, 'Missing chatId')

        const chat = await chatModel.findById(chatId)
        if (!chat) throw new GenerateError(404, 'No chat for the provided chatId was found')

        const messages = await messageModel.find({ chatId })

        res.status(200).json(messages);

    } catch (error) {
        next(error)
    }
}


module.exports = {
    createMessage,
    getMessages
}