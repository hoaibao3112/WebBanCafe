const {
    Receipt, ReceiptDetail, Product, Staff, Recipe, Material, Shipment
} = require('../models');
const { NotFoundError, BadRequestError } = require('../utils/errors');
const { sequelize, Op } = require('../models');

const receiptService = {
    /**
     * Create receipt (order)
     * Business logic: Deduct materials based on recipe using FIFO
     */
    createReceipt: async (receiptData) => {
        const { staffId, items, received } = receiptData;

        const transaction = await sequelize.transaction();

        try {
            // Calculate total
            const total = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
            const excess = received - total;

            // Create receipt
            const receipt = await Receipt.create({
                staffId,
                total,
                invoiceDate: new Date(),
                received,
                excess
            }, { transaction });

            // Create receipt details and deduct materials
            for (const item of items) {
                const { productId, quantity, price } = item;

                // Create receipt detail
                await ReceiptDetail.create({
                    receiptId: receipt.id,
                    productId,
                    quantity,
                    price
                }, { transaction });

                // Get product recipe
                const recipes = await Recipe.findAll({
                    where: { productId, deleted: false },
                    include: [{
                        model: Material,
                        as: 'material'
                    }],
                    transaction
                });

                // Deduct materials for each recipe ingredient
                for (const recipe of recipes) {
                    const materialQuantityNeeded = recipe.quantity * quantity;

                    // Get available shipments for this material (FIFO)
                    const shipments = await Shipment.findAll({
                        where: {
                            materialId: recipe.materialId,
                            quantity: { [Op.gt]: 0 }
                        },
                        order: [['mfg', 'ASC'], ['id', 'ASC']],
                        transaction
                    });

                    let remainingQuantity = materialQuantityNeeded;

                    // Deduct from shipments
                    for (const shipment of shipments) {
                        if (remainingQuantity <= 0) break;

                        const deductQuantity = Math.min(shipment.quantity, remainingQuantity);

                        // Update shipment quantity
                        await shipment.update({
                            quantity: shipment.quantity - deductQuantity
                        }, { transaction });

                        remainingQuantity -= deductQuantity;
                    }

                    if (remainingQuantity > 0) {
                        throw new BadRequestError(`Insufficient stock for material: ${recipe.material.name}`);
                    }

                    // Update material stock
                    const material = await Material.findByPk(recipe.materialId, { transaction });
                    await material.update({
                        remain: material.remain - materialQuantityNeeded
                    }, { transaction });
                }
            }

            await transaction.commit();

            return await receiptService.getReceiptById(receipt.id);
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    },

    /**
     * Get receipt by ID
     */
    getReceiptById: async (id) => {
        const receipt = await Receipt.findByPk(id, {
            include: [
                {
                    model: Staff,
                    as: 'staff',
                    attributes: ['id', 'name']
                },
                {
                    model: ReceiptDetail,
                    as: 'items',
                    include: [{
                        model: Product,
                        as: 'product',
                        attributes: ['id', 'name', 'category', 'unit']
                    }]
                }
            ]
        });

        if (!receipt) {
            throw new NotFoundError('Receipt not found');
        }

        return receipt;
    },

    /**
     * Get all receipts
     */
    getAllReceipts: async (filters = {}) => {
        const where = {};

        if (filters.startDate && filters.endDate) {
            where.invoiceDate = {
                [Op.between]: [filters.startDate, filters.endDate]
            };
        }

        if (filters.staffId) {
            where.staffId = filters.staffId;
        }

        const receipts = await Receipt.findAll({
            where,
            include: [{
                model: Staff,
                as: 'staff',
                attributes: ['id', 'name']
            }],
            order: [['id', 'DESC']]
        });

        return receipts;
    },

    /**
     * Get revenue statistics
     */
    getRevenue: async (filters = {}) => {
        const where = {};

        if (filters.startDate && filters.endDate) {
            where.invoiceDate = {
                [Op.between]: [filters.startDate, filters.endDate]
            };
        }

        const receipts = await Receipt.findAll({ where });

        const totalRevenue = receipts.reduce((sum, r) => sum + r.total, 0);
        const orderCount = receipts.length;
        const averageOrderValue = orderCount > 0 ? totalRevenue / orderCount : 0;

        return {
            totalRevenue,
            orderCount,
            averageOrderValue,
            startDate: filters.startDate,
            endDate: filters.endDate
        };
    }
};

module.exports = receiptService;
