// src/axiosConfig.js
import axios from 'axios';

// Create an instance of axios
const axiosInstance = axios.create({
    baseURL: 'https://mus-7du3.onrender.com/api/',
    timeout: 5000,
    headers: {
        Authorization: localStorage.getItem('access')
            ? `Bearer ${localStorage.getItem('access')}`
            : null,
        'Content-Type': 'application/json',
        accept: 'application/json',
    },
});

// Request interceptor to add token in header
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
