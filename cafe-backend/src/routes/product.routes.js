const router = require('express').Router();
const productController = require('../controllers/product.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { requireStaff } = require('../middlewares/permission.middleware');

/**
 * Product Management Routes
 * @prefix /api/admin/products
 * @middleware authMiddleware, requireStaff
 */

router.use(authMiddleware);
router.use(requireStaff);

router.get('/categories/list', productController.getCategories);
router.post('/', productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.put('/:id/status', productController.updateStatus);

module.exports = router;
