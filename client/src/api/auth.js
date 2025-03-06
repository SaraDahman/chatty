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