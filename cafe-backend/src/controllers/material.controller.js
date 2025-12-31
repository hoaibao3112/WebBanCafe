const materialService = require('../services/material.service');
const ApiResponse = require('../utils/ApiResponse');

const materialController = {
    /**
     * POST /api/admin/materials
     * Create new material
     */
    createMaterial: async (req, res, next) => {
        try {
            const material = await materialService.createMaterial(req.body);
            return ApiResponse.success(res, material, 'Material created successfully', 201);
        } catch (error) {
            next(error);
        }
    },

    /**
     * GET /api/admin/materials
     * Get all materials
     */
    getAllMaterials: async (req, res, next) => {
        try {
            const { search, supplierId } = req.query;
            const materials = await materialService.getAllMaterials({ search, supplierId });
            return ApiResponse.success(res, materials);
        } catch (error) {
            next(error);
        }
    },

    /**
     * GET /api/admin/materials/:id
     * Get material by ID
     */
    getMaterialById: async (req, res, next) => {
        try {
            const material = await materialService.getMaterialById(req.params.id);
            return ApiResponse.success(res, material);
        } catch (error) {
            next(error);
        }
    },

    /**
     * PUT /api/admin/materials/:id
     * Update material
     */
    updateMaterial: async (req, res, next) => {
        try {
            const material = await materialService.updateMaterial(req.params.id, req.body);
            return ApiResponse.success(res, material, 'Material updated successfully');
        } catch (error) {
            next(error);
        }
    },

    /**
     * DELETE /api/admin/materials/:id
     * Soft delete material
     */
    deleteMaterial: async (req, res, next) => {
        try {
            const result = await materialService.deleteMaterial(req.params.id);
            return ApiResponse.success(res, result);
        } catch (error) {
            next(error);
        }
    },

    /**
     * GET /api/admin/materials/low-stock/list
     * Get low stock materials
     */
    getLowStock: async (req, res, next) => {
        try {
            const { threshold } = req.query;
            const materials = await materialService.getLowStockMaterials(threshold);
            return ApiResponse.success(res, materials);
        } catch (error) {
            next(error);
        }
    }
};

module.exports = materialController;
