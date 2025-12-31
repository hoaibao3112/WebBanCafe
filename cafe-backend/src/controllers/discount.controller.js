const discountService = require('../services/discount.service');
const ApiResponse = require('../utils/ApiResponse');

const discountController = {
    /**
     * POST /api/admin/promotions
     */
    createDiscount: async (req, res, next) => {
        try {
            const discount = await discountService.createDiscount(req.body);
            return ApiResponse.success(res, discount, 'Promotion created successfully', 201);
        } catch (error) {
            next(error);
        }
    },

    /**
     * GET /api/admin/promotions
     */
    getAllDiscounts: async (req, res, next) => {
        try {
            const discounts = await discountService.getAllDiscounts();
            return ApiResponse.success(res, discounts);
        } catch (error) {
            next(error);
        }
    },

    /**
     * GET /api/admin/promotions/:id
     */
    getDiscountById: async (req, res, next) => {
        try {
            const discount = await discountService.getDiscountById(req.params.id);
            return ApiResponse.success(res, discount);
        } catch (error) {
            next(error);
        }
    },

    /**
     * PUT /api/admin/promotions/:id
     */
    updateDiscount: async (req, res, next) => {
        try {
            const discount = await discountService.updateDiscount(req.params.id, req.body);
            return ApiResponse.success(res, discount, 'Promotion updated successfully');
        } catch (error) {
            next(error);
        }
    },

    /**
     * DELETE /api/admin/promotions/:id
     */
    deleteDiscount: async (req, res, next) => {
        try {
            const result = await discountService.deleteDiscount(req.params.id);
            return ApiResponse.success(res, result);
        } catch (error) {
            next(error);
        }
    },

    /**
     * PUT /api/admin/promotions/:id/status
     */
    updateStatus: async (req, res, next) => {
        try {
            const { status } = req.body;
            const discount = await discountService.updateStatus(req.params.id, status);
            return ApiResponse.success(res, discount, 'Promotion status updated');
        } catch (error) {
            next(error);
        }
    }
};

module.exports = discountController;
