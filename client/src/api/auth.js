/* eslint-disable no-useless-catch */
import axios from "./axios";

export const registerUser = async (registerInfo) => {
    try {
        const { data } = await axios.post('/api/users/register', registerInfo);

        localStorage.setItem('user', JSON.stringify(data));

        return data;
    } catch (error) {
        throw error;
    }
}


export const loginUser = async (loginInfo) => {
    try {
        const { data } = await axios.post('/api/users/login', loginInfo);

        localStorage.setItem('user', JSON.stringify(data));

        return data;
    } catch (error) {
        throw error;
    }
}


export const getUser = async (userId) => {
    try {
        const { data } = await axios.get(`/api/users/find/${userId}`)

        return data
    } catch (error) {
        throw error
    }
}

export const getAllUsers = async () => {
    try {
        const { data } = await axios.get(`/api/users`)

        return data
    } catch (error) {
        throw error
    }
}

export const getPotentialUsers = async () => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));

        const { data } = await axios.get(`/api/users/potential`, {
            params: {
                userId: user._id
            }
        })

        return data
    } catch (error) {
        console.log(error);

        throw error
    }
}