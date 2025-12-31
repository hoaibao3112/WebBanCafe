const dashboardService = require('../services/dashboard.service');
const ApiResponse = require('../utils/ApiResponse');

const dashboardController = {
    /**
     * GET /api/admin/dashboard/summary
     * Get dashboard summary
     */
    getSummary: async (req, res, next) => {
        try {
            const summary = await dashboardService.getSummary();
            return ApiResponse.success(res, summary);
        } catch (error) {
            next(error);
        }
    },

    /**
     * GET /api/admin/dashboard/top-products
     * Get top selling products
     */
    getTopProducts: async (req, res, next) => {
        try {
            const { limit } = req.query;
            const products = await dashboardService.getTopProducts(parseInt(limit) || 10);
            return ApiResponse.success(res, products);
        } catch (error) {
            next(error);
        }
    },

    /**
     * GET /api/admin/dashboard/report
     * Get report by date range
     */
    getReport: async (req, res, next) => {
        try {
            const { startDate, endDate } = req.query;

            if (!startDate || !endDate) {
                return ApiResponse.error(res, 'startDate and endDate are required', 400);
            }

            const report = await dashboardService.getReport(startDate, endDate);
            return ApiResponse.success(res, report);
        } catch (error) {
            next(error);
        }
    }
};

module.exports = dashboardController;
