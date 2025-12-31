const productService = require('../services/product.service');
const ApiResponse = require('../utils/ApiResponse');

const productController = {
    /**
     * POST /api/admin/products
     * Create new product
     */
    createProduct: async (req, res, next) => {
        try {
            const { recipes, ...productData } = req.body;
            const product = await productService.createProduct(productData, recipes);
            return ApiResponse.success(res, product, 'Product created successfully', 201);
        } catch (error) {
            next(error);
        }
    },

    /**
     * GET /api/admin/products
     * Get all products
     */
    getAllProducts: async (req, res, next) => {
        try {
            const { category, search } = req.query;
            const products = await productService.getAllProducts({ category, search });
            return ApiResponse.success(res, products);
        } catch (error) {
            next(error);
        }
    },

    /**
     * GET /api/admin/products/:id
     * Get product by ID
     */
    getProductById: async (req, res, next) => {
        try {
            const product = await productService.getProductById(req.params.id);
            return ApiResponse.success(res, product);
        } catch (error) {
            next(error);
        }
    },

    /**
     * PUT /api/admin/products/:id
     * Update product
     */
    updateProduct: async (req, res, next) => {
        try {
            const { recipes, ...productData } = req.body;
            const product = await productService.updateProduct(req.params.id, productData, recipes);
            return ApiResponse.success(res, product, 'Product updated successfully');
        } catch (error) {
            next(error);
        }
    },

    /**
     * DELETE /api/admin/products/:id
     * Soft delete product
     */
    deleteProduct: async (req, res, next) => {
        try {
            const result = await productService.deleteProduct(req.params.id);
            return ApiResponse.success(res, result);
        } catch (error) {
            next(error);
        }
    },

    /**
     * PUT /api/admin/products/:id/status
     * Update product status
     */
    updateStatus: async (req, res, next) => {
        try {
            const { deleted } = req.body;
            const product = await productService.updateStatus(req.params.id, deleted);
            return ApiResponse.success(res, product, 'Product status updated');
        } catch (error) {
            next(error);
        }
    },

    /**
     * GET /api/admin/products/categories/list
     * Get all product categories
     */
    getCategories: async (req, res, next) => {
        try {
            const categories = await productService.getCategories();
            return ApiResponse.success(res, categories);
        } catch (error) {
            next(error);
        }
    }
};

module.exports = productController;
