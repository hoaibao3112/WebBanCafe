const router = require('express').Router();
const dashboardController = require('../controllers/dashboard.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { requireStaff } = require('../middlewares/permission.middleware');

/**
 * Dashboard & Analytics Routes
 * @prefix /api/admin/dashboard
 * @middleware authMiddleware, requireStaff
 */

router.use(authMiddleware);
router.use(requireStaff);

router.get('/summary', dashboardController.getSummary);
router.get('/top-products', dashboardController.getTopProducts);
router.get('/report', dashboardController.getReport);

module.exports = router;
