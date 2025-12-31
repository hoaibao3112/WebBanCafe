import apiClient from './apiClient';

const accountService = {
    getAllAccounts: async () => {
        const response = await apiClient.get('/admin/accounts');
        return response.data;
    },

    getAccountById: async (id) => {
        const response = await apiClient.get(`/admin/accounts/${id}`);
        return response.data;
    },

    createAccount: async (data) => {
        const response = await apiClient.post('/admin/accounts', data);
        return response.data;
    },

    updateAccount: async (id, data) => {
        const response = await apiClient.put(`/admin/accounts/${id}`, data);
        return response.data;
    },

    deleteAccount: async (id) => {
        const response = await apiClient.delete(`/admin/accounts/${id}`);
        return response.data;
    },

    changePassword: async (id, currentPassword, newPassword) => {
        const response = await apiClient.put(`/admin/accounts/${id}/password`, {
            currentPassword,
            newPassword
        });
        return response.data;
    }
};

export default accountService;
