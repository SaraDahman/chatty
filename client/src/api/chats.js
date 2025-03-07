/* eslint-disable no-useless-catch */
import axios from "./axios";

export const createChat = async ({ senderId, receiverId }) => {
    try {
        const { data } = await axios.post(`/api/chat`, {
            senderId,
            receiverId
        })
        return data

    } catch (error) {
        throw error
    }
}

export const getChat = async (senderId, receiverId) => {
    try {
        const { data } = await axios.get(`/api/chat/find`, {
            params: {
                senderId,
                receiverId
            }
        })
        return data

    } catch (error) {
        throw error;
    }
}

export const getUserChats = async (userId) => {
    try {
        const { data } = await axios.get(`/api/chat/find/${userId}`)
        return data
    } catch (error) {
        throw error;

    }
}


export const createMessage = async ({ chatId, senderId }) => {
    try {
        const { data } = await axios.post('/api/message', {
            chatId, senderId
        })
        return data
    } catch (error) {
        throw error;
    }
}

export const getChatMessages = async (chatId) => {
    try {
        const { data } = await axios.get('/api/message', {
            params: {
                chatId
            }
        })
        return data
    } catch (error) {
        throw error
    }
}


