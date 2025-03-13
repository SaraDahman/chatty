const { chatModel } = require('../models')
const { GenerateError } = require('../helpers');

// create a chat

const createChat = async (req, res, next) => {
    try {

        const { sender, receiver } = req.body;

        if (!sender || !receiver) throw new GenerateError(400, 'sender or receiver is missing')

        const chat = await chatModel.findOne({
            sender,
            receiver
        })

        if (chat) return res.status(200).send(chat)

        const newChat = await chatModel.create({
            sender,
            receiver,
        })

        const populatedChat = await chatModel.findById(newChat._id)
            .populate('sender')
            .populate('receiver');

        res.status(200).json(populatedChat)

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
                { sender: userId },
                { receiver: userId }
            ]
        })
            .populate('receiver')
            .populate('sender')


        res.status(200).json(chats);

    } catch (error) {
        console.log(error);

        next(error)
    }
}


// find a specific chat

const findChat = async (req, res, next) => {
    try {

        const { sender, receiver } = req.query;

        if (!sender || !receiver) throw new GenerateError(400, 'sender or receiver is missing')


        const chat = await chatModel.findOne({
            sender,
            receiver
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