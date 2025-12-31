const router = require('express').Router();
const receiptController = require('../controllers/receipt.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { requireStaff } = require('../middlewares/permission.middleware');

/**
 * Revenue/Sales Routes
 * @prefix /api/admin/revenue
 * @middleware authMiddleware, requireStaff
 */

router.use(authMiddleware);
router.use(requireStaff);

router.get('/', receiptController.getRevenue);

module.exports = router;
