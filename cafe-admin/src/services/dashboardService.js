import apiClient from './apiClient';

const dashboardService = {
    getSummary: async () => {
        const response = await apiClient.get('/admin/dashboard/summary');
        return response.data;
    },

    getTopProducts: async (limit = 10) => {
        const response = await apiClient.get(`/admin/dashboard/top-products?limit=${limit}`);
        return response.data;
    },

    getReport: async (startDate, endDate) => {
        const response = await apiClient.get(`/admin/dashboard/report?startDate=${startDate}&endDate=${endDate}`);
        return response.data;
    }
};

export default dashboardService;
