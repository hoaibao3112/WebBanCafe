const receiptService = require('../services/receipt.service');
const ApiResponse = require('../utils/ApiResponse');

const receiptController = {
    /**
     * POST /api/admin/receipts
     * Create new receipt/order
     */
    createReceipt: async (req, res, next) => {
        try {
            const receipt = await receiptService.createReceipt(req.body);
            return ApiResponse.success(res, receipt, 'Receipt created successfully', 201);
        } catch (error) {
            next(error);
        }
    },

    /**
     * GET /api/admin/receipts
     * Get all receipts
     */
    getAllReceipts: async (req, res, next) => {
        try {
            const { startDate, endDate, staffId } = req.query;
            const receipts = await receiptService.getAllReceipts({ startDate, endDate, staffId });
            return ApiResponse.success(res, receipts);
        } catch (error) {
            next(error);
        }
    },

    /**
     * GET /api/admin/receipts/:id
     * Get receipt by ID
     */
    getReceiptById: async (req, res, next) => {
        try {
            const receipt = await receiptService.getReceiptById(req.params.id);
            return ApiResponse.success(res, receipt);
        } catch (error) {
            next(error);
        }
    },

    /**
     * GET /api/admin/revenue
     * Get revenue statistics
     */
    getRevenue: async (req, res, next) => {
        try {
            const { startDate, endDate } = req.query;
            const stats = await receiptService.getRevenue({ startDate, endDate });
            return ApiResponse.success(res, stats);
        } catch (error) {
            next(error);
        }
    }
};

module.exports = receiptController;
