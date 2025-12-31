import apiClient from './apiClient';

const productService = {
    getAllProducts: async (category = '', search = '') => {
        const response = await apiClient.get(`/admin/products?category=${category}&search=${search}`);
        return response.data;
    },

    getProductById: async (id) => {
        const response = await apiClient.get(`/admin/products/${id}`);
        return response.data;
    },

    createProduct: async (productData) => {
        const response = await apiClient.post('/admin/products', productData);
        return response.data;
    },

    updateProduct: async (id, productData) => {
        const response = await apiClient.put(`/admin/products/${id}`, productData);
        return response.data;
    },

    deleteProduct: async (id) => {
        const response = await apiClient.delete(`/admin/products/${id}`);
        return response.data;
    },

    updateStatus: async (id, deleted) => {
        const response = await apiClient.put(`/admin/products/${id}/status`, { deleted });
        return response.data;
    },

    getCategories: async () => {
        const response = await apiClient.get('/admin/products/categories/list');
        return response.data;
    }
};

export default productService;
