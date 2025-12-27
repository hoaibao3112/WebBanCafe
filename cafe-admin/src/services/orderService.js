import api from './api';

export const orderService = {
    getOrders: async (params = {}) => {
        const response = await api.get('/orders', { params });
        return response.data;
    },

    getOrderById: async (id) => {
        const response = await api.get(`/orders/${id}`);
        return response.data;
    },

    updateOrderStatus: async (id, status) => {
        const response = await api.patch(`/orders/${id}/status`, { status });
        return response.data;
    },

    deleteOrder: async (id) => {
        const response = await api.delete(`/orders/${id}`);
        return response.data;
    },
};

export default orderService;
