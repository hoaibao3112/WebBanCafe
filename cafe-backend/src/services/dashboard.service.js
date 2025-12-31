const {
    Receipt, ReceiptDetail, Product, Material
} = require('../models');
const materialService = require('./material.service');
const receiptService = require('./receipt.service');
const { Op } = require('sequelize');

const dashboardService = {
    /**
     * Get dashboard summary
     */
    getSummary: async () => {
        // Total revenue (all time)
        const allReceipts = await Receipt.findAll();
        const totalRevenue = allReceipts.reduce((sum, r) => sum + r.total, 0);
        const orderCount = allReceipts.length;

        // Today's revenue
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayReceipts = await Receipt.findAll({
            where: {
                invoiceDate: {
                    [Op.gte]: today
                }
            }
        });
        const todayRevenue = todayReceipts.reduce((sum, r) => sum + r.total, 0);

        // Top products
        const topProducts = await dashboardService.getTopProducts(5);

        // Low stock items
        const lowStock = await materialService.getLowStockMaterials(10);

        return {
            totalRevenue,
            orderCount,
            todayRevenue,
            todayOrderCount: todayReceipts.length,
            topProducts,
            lowStockCount: lowStock.length,
            lowStockItems: lowStock.slice(0, 5) // Top 5 lowest
        };
    },

    /**
     * Get top selling products
     */
    getTopProducts: async (limit = 10) => {
        const products = await ReceiptDetail.findAll({
            attributes: [
                'productId',
                [ReceiptDetail.sequelize.fn('SUM', ReceiptDetail.sequelize.col('quantity')), 'totalQuantity'],
                [ReceiptDetail.sequelize.fn('SUM', ReceiptDetail.sequelize.literal('quantity * price')), 'totalRevenue']
            ],
            include: [{
                model: Product,
                as: 'product',
                attributes: ['id', 'name', 'category', 'price']
            }],
            group: ['product_id', 'product.id'],
            order: [[ReceiptDetail.sequelize.literal('totalQuantity'), 'DESC']],
            limit,
            raw: false
        });

        return products.map(p => ({
            product: p.product,
            totalQuantity: parseFloat(p.dataValues.totalQuantity),
            totalRevenue: parseFloat(p.dataValues.totalRevenue)
        }));
    },

    /**
     * Get report by date range
     */
    getReport: async (startDate, endDate) => {
        const revenue = await receiptService.getRevenue({ startDate, endDate });
        const topProducts = await dashboardService.getTopProductsByDateRange(startDate, endDate, 10);

        // Daily breakdown
        const receipts = await Receipt.findAll({
            where: {
                invoiceDate: {
                    [Op.between]: [startDate, endDate]
                }
            },
            order: [['invoiceDate', 'ASC']]
        });

        // Group by date
        const dailyRevenue = {};
        receipts.forEach(r => {
            const date = r.invoiceDate.toISOString().split('T')[0];
            if (!dailyRevenue[date]) {
                dailyRevenue[date] = { revenue: 0, orders: 0 };
            }
            dailyRevenue[date].revenue += r.total;
            dailyRevenue[date].orders += 1;
        });

        return {
            ...revenue,
            topProducts,
            dailyBreakdown: Object.entries(dailyRevenue).map(([date, data]) => ({
                date,
                ...data
            }))
        };
    },

    /**
     * Get top products by date range
     */
    getTopProductsByDateRange: async (startDate, endDate, limit = 10) => {
        const products = await ReceiptDetail.findAll({
            attributes: [
                'productId',
                [ReceiptDetail.sequelize.fn('SUM', ReceiptDetail.sequelize.col('quantity')), 'totalQuantity'],
                [ReceiptDetail.sequelize.fn('SUM', ReceiptDetail.sequelize.literal('quantity * price')), 'totalRevenue']
            ],
            include: [
                {
                    model: Product,
                    as: 'product',
                    attributes: ['id', 'name', 'category', 'price']
                },
                {
                    model: Receipt,
                    as: 'receipt',
                    attributes: [],
                    where: {
                        invoiceDate: {
                            [Op.between]: [startDate, endDate]
                        }
                    }
                }
            ],
            group: ['product_id', 'product.id'],
            order: [[ReceiptDetail.sequelize.literal('totalQuantity'), 'DESC']],
            limit,
            raw: false
        });

        return products.map(p => ({
            product: p.product,
            totalQuantity: parseFloat(p.dataValues.totalQuantity),
            totalRevenue: parseFloat(p.dataValues.totalRevenue)
        }));
    }
};

module.exports = dashboardService;
