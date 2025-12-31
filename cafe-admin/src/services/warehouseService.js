import apiClient from './apiClient';

const warehouseService = {
    importMaterials: async (data) => {
        const response = await apiClient.post('/admin/warehouse/import', data);
        return response.data;
    },

    getAllImports: async (startDate = '', endDate = '') => {
        const response = await apiClient.get(`/admin/warehouse/imports?startDate=${startDate}&endDate=${endDate}`);
        return response.data;
    },

    getImportById: async (id) => {
        const response = await apiClient.get(`/admin/warehouse/imports/${id}`);
        return response.data;
    },

    exportMaterials: async (data) => {
        const response = await apiClient.post('/admin/warehouse/export', data);
        return response.data;
    },

    getAllExports: async (startDate = '', endDate = '') => {
        const response = await apiClient.get(`/admin/warehouse/exports?startDate=${startDate}&endDate=${endDate}`);
        return response.data;
    },

    getInventory: async () => {
        const response = await apiClient.get('/admin/warehouse/inventory');
        return response.data;
    }
};

export default warehouseService;
