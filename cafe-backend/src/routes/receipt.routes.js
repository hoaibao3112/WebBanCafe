const router = require('express').Router();
const receiptController = require('../controllers/receipt.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { requireStaff } = require('../middlewares/permission.middleware');

/**
 * Receipt/Sales Management Routes
 * @prefix /api/admin/receipts
 * @middleware authMiddleware, requireStaff
 */

router.use(authMiddleware);
router.use(requireStaff);

router.post('/', receiptController.createReceipt);
router.get('/', receiptController.getAllReceipts);
router.get('/:id', receiptController.getReceiptById);

module.exports = router;
