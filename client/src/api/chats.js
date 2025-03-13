/* eslint-disable no-useless-catch */
import axios from "./axios";

export const createChat = async ({ sender, receiver }) => {
    try {
        const { data } = await axios.post(`/api/chat`, {
            sender,
            receiver
        })
        return data

    } catch (error) {
        throw error
    }
}

export const getChat = async (sender, receiver) => {
    try {
        const { data } = await axios.get(`/api/chat/find`, {
            params: {
                sender,
                receiver
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


export const createMessage = async ({ chat, sender, receiver, text }) => {
    try {
        const { data } = await axios.post('/api/message', {
            chat, sender, receiver, text
        })
        return data
    } catch (error) {
        throw error;
    }
}

export const getChatMessages = async (chat, userId) => {
    try {
        const { data } = await axios.get('/api/message', {
            params: {
                chat,
                userId
            }
        })
        return data
    } catch (error) {
        throw error
    }
}


