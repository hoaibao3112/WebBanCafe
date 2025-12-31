const { Product, Recipe, Material, DiscountDetail } = require('../models');
const { NotFoundError, ConflictError, BadRequestError } = require('../utils/errors');
const { Op } = require('sequelize');

const productService = {
    /**
     * Create new product
     */
    createProduct: async (productData, recipeData = []) => {
        const { name, category, price, unit, image } = productData;

        // Create product
        const product = await Product.create({
            name,
            category,
            price,
            unit,
            image,
            deleted: false
        });

        // Add recipes if provided
        if (recipeData && recipeData.length > 0) {
            for (const recipe of recipeData) {
                await Recipe.create({
                    productId: product.id,
                    materialId: recipe.materialId,
                    quantity: recipe.quantity,
                    deleted: false
                });
            }
        }

        return await productService.getProductById(product.id);
    },

    /**
     * Get all products
     */
    getAllProducts: async (filters = {}) => {
        const where = {};

        if (filters.category) {
            where.category = filters.category;
        }

        if (filters.search) {
            where[Op.or] = [
                { name: { [Op.like]: `%${filters.search}%` } },
                { category: { [Op.like]: `%${filters.search}%` } }
            ];
        }

        const products = await Product.findAll({
            where,
            include: [{
                model: Recipe,
                as: 'recipes',
                include: [{
                    model: Material,
                    as: 'material',
                    attributes: ['id', 'name', 'unit']
                }],
                attributes: ['productId', 'materialId', 'quantity']
            }],
            order: [['id', 'DESC']]
        });

        return products;
    },

    /**
     * Get product by ID with recipe
     */
    getProductById: async (id) => {
        const product = await Product.findByPk(id, {
            include: [{
                model: Recipe,
                as: 'recipes',
                include: [{
                    model: Material,
                    as: 'material',
                    attributes: ['id', 'name', 'unit', 'remain']
                }],
                attributes: ['productId', 'materialId', 'quantity']
            }]
        });

        if (!product) {
            throw new NotFoundError('Product not found');
        }

        return product;
    },

    /**
     * Update product
     */
    updateProduct: async (id, updateData, recipeData = null) => {
        const product = await Product.findByPk(id);
        if (!product) {
            throw new NotFoundError('Product not found');
        }

        // Update product info
        await product.update(updateData);

        // Update recipes if provided
        if (recipeData !== null && Array.isArray(recipeData)) {
            // Delete existing recipes
            await Recipe.update(
                { deleted: true },
                { where: { productId: id } }
            );

            // Add new recipes
            for (const recipe of recipeData) {
                await Recipe.create({
                    productId: id,
                    materialId: recipe.materialId,
                    quantity: recipe.quantity,
                    deleted: false
                });
            }
        }

        return await productService.getProductById(id);
    },

    /**
     * Soft delete product
     */
    deleteProduct: async (id) => {
        const product = await Product.findByPk(id);
        if (!product) {
            throw new NotFoundError('Product not found');
        }

        // Soft delete product and its recipes
        await product.update({ deleted: true });
        await Recipe.update(
            { deleted: true },
            { where: { productId: id } }
        );

        return { message: 'Product deleted successfully' };
    },

    /**
     * Update product status (active/inactive)
     */
    updateStatus: async (id, deleted) => {
        const product = await Product.findByPk(id);
        if (!product) {
            throw new NotFoundError('Product not found');
        }

        await product.update({ deleted });
        return product;
    },

    /**
     * Get product categories
     */
    getCategories: async () => {
        const products = await Product.findAll({
            attributes: [[Product.sequelize.fn('DISTINCT', Product.sequelize.col('category')), 'category']],
            where: {
                category: { [Op.ne]: null }
            },
            raw: true
        });

        return products.map(p => p.category);
    }
};

module.exports = productService;
