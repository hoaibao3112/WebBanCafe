const router = require('express').Router();
const warehouseController = require('../controllers/warehouse.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { requireStaff } = require('../middlewares/permission.middleware');

/**
 * Warehouse Management Routes
 * @prefix /api/admin/warehouse
 * @middleware authMiddleware, requireStaff
 */

router.use(authMiddleware);
router.use(requireStaff);

// Inventory
router.get('/inventory', warehouseController.getInventory);

// Imports
router.post('/import', warehouseController.importMaterials);
router.get('/imports', warehouseController.getAllImports);
router.get('/imports/:id', warehouseController.getImportById);

// Exports
router.post('/export', warehouseController.exportMaterials);
router.get('/exports', warehouseController.getAllExports);
router.get('/exports/:id', warehouseController.getExportById);

module.exports = router;
