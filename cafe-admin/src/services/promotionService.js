import apiClient from './apiClient';

const promotionService = {
    getAllPromotions: async () => {
        const response = await apiClient.get('/admin/promotions');
        return response.data;
    },

    getPromotionById: async (id) => {
        const response = await apiClient.get(`/admin/promotions/${id}`);
        return response.data;
    },

    createPromotion: async (data) => {
        const response = await apiClient.post('/admin/promotions', data);
        return response.data;
    },

    updatePromotion: async (id, data) => {
        const response = await apiClient.put(`/admin/promotions/${id}`, data);
        return response.data;
    },

    deletePromotion: async (id) => {
        const response = await apiClient.delete(`/admin/promotions/${id}`);
        return response.data;
    },

    updateStatus: async (id, status) => {
        const response = await apiClient.put(`/admin/promotions/${id}/status`, { status });
        return response.data;
    }
};

export default promotionService;
