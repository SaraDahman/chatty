const { chatModel } = require('../models')
const { GenerateError } = require('../helpers');

// create a chat

const createChat = async (req, res, next) => {
    try {

        const { senderId, receiverId } = req.body;

        if (!senderId || !receiverId) throw new GenerateError(400, 'senderId or receiverId is missing')

        const chat = await chatModel.findOne({
            senderId,
            receiverId
        })

        if (chat) return res.status(200).send(chat)

        const newChat = await chatModel.create({
            senderId,
            receiverId
        })

        res.status(200).json(newChat)

    } catch (error) {
        next(error)
    }
}


// find User Chats

const findUserChats = async (req, res, next) => {
    try {

        const { userId } = req.params;

        if (!userId) throw new GenerateError(400, 'userId is missing')


        const chats = await chatModel.find({
            $or: [
                { senderId: userId },
                { receiverId: userId }
            ]
        })

        res.status(200).json(chats);

    } catch (error) {
        next(error)
    }
}


// find a specific chat

const findChat = async (req, res, next) => {
    try {

        const { senderId, receiverId } = req.query;

        if (!senderId || !receiverId) throw new GenerateError(400, 'senderId or receiverId is missing')


        const chat = await chatModel.findOne({
            senderId,
            receiverId
        })


        res.status(200).json(chat)

    } catch (error) {
        next(error)
    }
}

module.exports = {
    createChat,
    findUserChats,
    findChat
}