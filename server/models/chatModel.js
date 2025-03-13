const mongoose = require('mongoose');


const chatSchema = mongoose.Schema({
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    lastMessage: {
        type: String,
        default: '',
        ref: 'Message'
    },
    unreadCounts: {
        type: Object, default: {}
    },
    isGroup: {
        type: Boolean,
        default: false
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    admins: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    groupName: {
        type: String,
        default: null
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

}, {
    timestamps: true,
    minimize: false
})

const chatModel = mongoose.model('Chat', chatSchema);

module.exports = chatModel;