import apiClient from './apiClient';

const materialService = {
    getAllMaterials: async (search = '', supplierId = '') => {
        const response = await apiClient.get(`/admin/materials?search=${search}&supplierId=${supplierId}`);
        return response.data;
    },

    getMaterialById: async (id) => {
        const response = await apiClient.get(`/admin/materials/${id}`);
        return response.data;
    },

    createMaterial: async (materialData) => {
        const response = await apiClient.post('/admin/materials', materialData);
        return response.data;
    },

    updateMaterial: async (id, materialData) => {
        const response = await apiClient.put(`/admin/materials/${id}`, materialData);
        return response.data;
    },

    deleteMaterial: async (id) => {
        const response = await apiClient.delete(`/admin/materials/${id}`);
        return response.data;
    },

    getLowStock: async (threshold = 10) => {
        const response = await apiClient.get(`/admin/materials/low-stock/list?threshold=${threshold}`);
        return response.data;
    }
};

export default materialService;
