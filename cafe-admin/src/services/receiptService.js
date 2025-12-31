import apiClient from './apiClient';

const receiptService = {
    createReceipt: async (data) => {
        const response = await apiClient.post('/admin/receipts', data);
        return response.data;
    },

    getAllReceipts: async (filters = {}) => {
        const { startDate = '', endDate = '', staffId = '' } = filters;
        const response = await apiClient.get(`/admin/receipts?startDate=${startDate}&endDate=${endDate}&staffId=${staffId}`);
        return response.data;
    },

    getReceiptById: async (id) => {
        const response = await apiClient.get(`/admin/receipts/${id}`);
        return response.data;
    },

    getRevenue: async (startDate, endDate) => {
        const response = await apiClient.get(`/admin/revenue?startDate=${startDate}&endDate=${endDate}`);
        return response.data;
    }
};

export default receiptService;
