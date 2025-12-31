const router = require('express').Router();
const staffController = require('../controllers/staff.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { requireAdmin } = require('../middlewares/permission.middleware');

/**
 * Staff Management Routes
 * @prefix /api/admin/staff
 * @middleware authMiddleware, requireAdmin
 */

router.use(authMiddleware);
router.use(requireAdmin);

router.post('/', staffController.createStaff);
router.get('/', staffController.getAllStaff);
router.get('/:id', staffController.getStaffById);
router.put('/:id', staffController.updateStaff);
router.delete('/:id', staffController.deleteStaff);

module.exports = router;
