const mongoose = require('mongoose');


const chatSchema = mongoose.Schema({
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, {
    timestamps: true
})

const chatModel = mongoose.model('Chat', chatSchema);

module.exports = chatModel;