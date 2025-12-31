import apiClient from './apiClient';

const staffService = {
    getAllStaff: async (search = '') => {
        const response = await apiClient.get(`/admin/staff?search=${search}`);
        return response.data;
    },

    getStaffById: async (id) => {
        const response = await apiClient.get(`/admin/staff/${id}`);
        return response.data;
    },

    createStaff: async (staffData) => {
        const response = await apiClient.post('/admin/staff', staffData);
        return response.data;
    },

    updateStaff: async (id, staffData) => {
        const response = await apiClient.put(`/admin/staff/${id}`, staffData);
        return response.data;
    },

    deleteStaff: async (id) => {
        const response = await apiClient.delete(`/admin/staff/${id}`);
        return response.data;
    }
};

export default staffService;
