const warehouseService = require('../services/warehouse.service');
const ApiResponse = require('../utils/ApiResponse');

const warehouseController = {
    /**
     * POST /api/admin/warehouse/import
     * Import materials
     */
    importMaterials: async (req, res, next) => {
        try {
            const { Supplier } = require('../models');
            const importNote = await warehouseService.importMaterials(req.body);
            return ApiResponse.success(res, importNote, 'Materials imported successfully', 201);
        } catch (error) {
            next(error);
        }
    },

    /**
     * GET /api/admin/warehouse/imports
     * Get import history
     */
    getAllImports: async (req, res, next) => {
        try {
            const { startDate, endDate } = req.query;
            const imports = await warehouseService.getAllImports({ startDate, endDate });
            return ApiResponse.success(res, imports);
        } catch (error) {
            next(error);
        }
    },

    /**
     * GET /api/admin/warehouse/imports/:id
     * Get import details
     */
    getImportById: async (req, res, next) => {
        try {
            const importNote = await warehouseService.getImportById(req.params.id);
            return ApiResponse.success(res, importNote);
        } catch (error) {
            next(error);
        }
    },

    /**
     * POST /api/admin/warehouse/export
     * Export materials
     */
    exportMaterials: async (req, res, next) => {
        try {
            const exportNote = await warehouseService.exportMaterials(req.body);
            return ApiResponse.success(res, exportNote, 'Materials exported successfully', 201);
        } catch (error) {
            next(error);
        }
    },

    /**
     * GET /api/admin/warehouse/exports
     * Get export history
     */
    getAllExports: async (req, res, next) => {
        try {
            const { startDate, endDate } = req.query;
            const exports = await warehouseService.getAllExports({ startDate, endDate });
            return ApiResponse.success(res, exports);
        } catch (error) {
            next(error);
        }
    },

    /**
     * GET /api/admin/warehouse/exports/:id
     * Get export details
     */
    getExportById: async (req, res, next) => {
        try {
            const exportNote = await warehouseService.getExportById(req.params.id);
            return ApiResponse.success(res, exportNote);
        } catch (error) {
            next(error);
        }
    },

    /**
     * GET /api/admin/warehouse/inventory
     * Get current inventory
     */
    getInventory: async (req, res, next) => {
        try {
            const inventory = await warehouseService.getInventory();
            return ApiResponse.success(res, inventory);
        } catch (error) {
            next(error);
        }
    }
};

module.exports = warehouseController;
