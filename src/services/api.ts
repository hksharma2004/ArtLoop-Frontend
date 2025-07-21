import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const apiClient = axios.create({ baseURL: API_BASE_URL });


apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const loginUserAPI = async (credentials) => {
    try {
        const response = await apiClient.post('/api/auth/login', credentials);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {

            throw new Error(error.response.data.error || 'Login failed.');
        }
        throw new Error('An unexpected network error occurred.');
    }
};

export const registerUserAPI = async (userData) => {
    try {
        const response = await apiClient.post('/api/auth/register', userData);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || 'Registration failed.');
        }
        throw new Error('An unexpected network error occurred.');
    }
};


export const getMeAPI = async () => {
    const response = await apiClient.get('/api/auth/me');
    return response.data;
};

export const generateImageAPI = async (payload) => {
    const response = await apiClient.post('/api/generate', payload);
    return response.data;
};