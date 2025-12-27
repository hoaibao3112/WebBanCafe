import api from './api';

const authService = {
    // Login
    login: async (username, password) => {
        const response = await api.post('/auth/login', { username, password });
        return response;
    },

    // Register
    register: async (userData) => {
        const response = await api.post('/auth/register', userData);
        return response;
    },

    // Get current user
    getMe: async () => {
        const response = await api.get('/auth/me');
        return response;
    },

    // Logout
    logout: async () => {
        const response = await api.post('/auth/logout');
        return response;
    },
};

export default authService;
