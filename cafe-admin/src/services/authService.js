import apiClient from './apiClient';

const authService = {
    // Login
    login: async (username, password) => {
        const response = await apiClient.post('/auth/login', { username, password });
        if (response.data.success) {
            localStorage.setItem('token', response.data.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.data.user));
        }
        return response.data;
    },

    // Logout
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    // Get current user
    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            return JSON.parse(userStr);
        }
        return null;
    },

    // Check if user is authenticated
    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    },

    // Get me
    getMe: async () => {
        const response = await apiClient.get('/auth/me');
        return response.data;
    }
};

export default authService;
