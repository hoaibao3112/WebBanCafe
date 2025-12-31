const staffService = require('../services/staff.service');
const ApiResponse = require('../utils/ApiResponse');

const staffController = {
    /**
     * POST /api/admin/staff
     * Create new staff member
     */
    createStaff: async (req, res, next) => {
        try {
            const staff = await staffService.createStaff(req.body);
            return ApiResponse.success(res, staff, 'Staff created successfully', 201);
        } catch (error) {
            next(error);
        }
    },

    /**
     * GET /api/admin/staff
     * Get all staff
     */
    getAllStaff: async (req, res, next) => {
        try {
            const { search } = req.query;
            const staff = await staffService.getAllStaff({ search });
            return ApiResponse.success(res, staff);
        } catch (error) {
            next(error);
        }
    },

    /**
     * GET /api/admin/staff/:id
     * Get staff by ID
     */
    getStaffById: async (req, res, next) => {
        try {
            const staff = await staffService.getStaffById(req.params.id);
            return ApiResponse.success(res, staff);
        } catch (error) {
            next(error);
        }
    },

    /**
     * PUT /api/admin/staff/:id
     * Update staff
     */
    updateStaff: async (req, res, next) => {
        try {
            const staff = await staffService.updateStaff(req.params.id, req.body);
            return ApiResponse.success(res, staff, 'Staff updated successfully');
        } catch (error) {
            next(error);
        }
    },

    /**
     * DELETE /api/admin/staff/:id
     * Soft delete staff
     */
    deleteStaff: async (req, res, next) => {
        try {
            const result = await staffService.deleteStaff(req.params.id);
            return ApiResponse.success(res, result);
        } catch (error) {
            next(error);
        }
    }
};

module.exports = staffController;
