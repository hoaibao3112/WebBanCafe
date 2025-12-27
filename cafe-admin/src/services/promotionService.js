import api from './api';

export const promotionService = {
    getPromotions: async (params = {}) => {
        const response = await api.get('/promotions', { params });
        return response.data;
    },

    getPromotionById: async (id) => {
        const response = await api.get(`/promotions/${id}`);
        return response.data;
    },

    createPromotion: async (promotionData) => {
        const response = await api.post('/promotions', promotionData);
        return response.data;
    },

    updatePromotion: async (id, promotionData) => {
        const response = await api.put(`/promotions/${id}`, promotionData);
        return response.data;
    },

    deletePromotion: async (id) => {
        const response = await api.delete(`/promotions/${id}`);
        return response.data;
    },
};

export default promotionService;
