import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const instance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to include the token in every request
instance.interceptors.request.use(
    (config) => {
        const token = JSON.parse(localStorage.getItem('user'))?.token;
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle token expiry or invalid tokens
instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            const navigate = useNavigate();
            navigate('/login');
        }
        return Promise.reject(error);
    }
);

export default instance;