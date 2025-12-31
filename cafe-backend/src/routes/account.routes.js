const router = require('express').Router();
const accountController = require('../controllers/account.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { requireAdmin } = require('../middlewares/permission.middleware');

/**
 * Account Management Routes
 * @prefix /api/admin/accounts
 * @middleware authMiddleware, requireAdmin
 */

router.use(authMiddleware);
router.use(requireAdmin);

router.post('/', accountController.createAccount);
router.get('/', accountController.getAllAccounts);
router.get('/:id', accountController.getAccountById);
router.put('/:id', accountController.updateAccount);
router.delete('/:id', accountController.deleteAccount);
router.put('/:id/password', accountController.changePassword);

module.exports = router;
