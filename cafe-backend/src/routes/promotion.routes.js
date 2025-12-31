const router = require('express').Router();
const discountController = require('../controllers/discount.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { requireAdmin } = require('../middlewares/permission.middleware');

/**
 * Promotion/Discount Management Routes
 * @prefix /api/admin/promotions
 * @middleware authMiddleware, requireAdmin
 */

router.use(authMiddleware);
router.use(requireAdmin);

router.post('/', discountController.createDiscount);
router.get('/', discountController.getAllDiscounts);
router.get('/:id', discountController.getDiscountById);
router.put('/:id', discountController.updateDiscount);
router.delete('/:id', discountController.deleteDiscount);
router.put('/:id/status', discountController.updateStatus);

module.exports = router;
