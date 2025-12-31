const { Discount, DiscountDetail, Product } = require('../models');
const { NotFoundError } = require('../utils/errors');

const discountService = {
    /**
     * Create promotion
     */
    createDiscount: async (discountData) => {
        const { startDate, endDate, status, products } = discountData;

        const discount = await Discount.create({
            startDate,
            endDate,
            status: status !== undefined ? status : true
        });

        // Add product discounts
        if (products && products.length > 0) {
            for (const item of products) {
                await DiscountDetail.create({
                    discountId: discount.id,
                    productId: item.productId,
                    percent: item.percent
                });
            }
        }

        return await discountService.getDiscountById(discount.id);
    },

    /**
     * Get all discounts
     */
    getAllDiscounts: async () => {
        const discounts = await Discount.findAll({
            include: [{
                model: DiscountDetail,
                as: 'details',
                include: [{
                    model: Product,
                    as: 'product',
                    attributes: ['id', 'name', 'price']
                }]
            }],
            order: [['id', 'DESC']]
        });

        return discounts;
    },

    /**
     * Get discount by ID
     */
    getDiscountById: async (id) => {
        const discount = await Discount.findByPk(id, {
            include: [{
                model: DiscountDetail,
                as: 'details',
                include: [{
                    model: Product,
                    as: 'product',
                    attributes: ['id', 'name', 'price', 'category']
                }]
            }]
        });

        if (!discount) {
            throw new NotFoundError('Discount not found');
        }

        return discount;
    },

    /**
     * Update discount
     */
    updateDiscount: async (id, updateData) => {
        const discount = await Discount.findByPk(id);
        if (!discount) {
            throw new NotFoundError('Discount not found');
        }

        const { products, ...discountInfo } = updateData;

        await discount.update(discountInfo);

        // Update products if provided
        if (products) {
            // Delete existing details
            await DiscountDetail.destroy({ where: { discountId: id } });

            // Add new details
            for (const item of products) {
                await DiscountDetail.create({
                    discountId: id,
                    productId: item.productId,
                    percent: item.percent
                });
            }
        }

        return await discountService.getDiscountById(id);
    },

    /**
     * Delete discount
     */
    deleteDiscount: async (id) => {
        const discount = await Discount.findByPk(id);
        if (!discount) {
            throw new NotFoundError('Discount not found');
        }

        // Delete details first
        await DiscountDetail.destroy({ where: { discountId: id } });

        // Delete discount
        await discount.destroy();

        return { message: 'Discount deleted successfully' };
    },

    /**
     * Update discount status
     */
    updateStatus: async (id, status) => {
        const discount = await Discount.findByPk(id);
        if (!discount) {
            throw new NotFoundError('Discount not found');
        }

        await discount.update({ status });
        return discount;
    }
};

module.exports = discountService;
