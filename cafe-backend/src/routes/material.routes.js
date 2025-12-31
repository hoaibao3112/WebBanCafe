const router = require('express').Router();
const materialController = require('../controllers/material.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { requireStaff } = require('../middlewares/permission.middleware');

/**
 * Material Management Routes
 * @prefix /api/admin/materials
 * @middleware authMiddleware, requireStaff
 */

router.use(authMiddleware);
router.use(requireStaff);

router.get('/low-stock/list', materialController.getLowStock);
router.post('/', materialController.createMaterial);
router.get('/', materialController.getAllMaterials);
router.get('/:id', materialController.getMaterialById);
router.put('/:id', materialController.updateMaterial);
router.delete('/:id', materialController.deleteMaterial);

module.exports = router;
