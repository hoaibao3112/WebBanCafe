const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

/**
 * Authentication Routes
 * @prefix /api/auth
 */

// Public routes
router.post('/login', authController.login);
router.post('/register', authController.register);

// Protected routes
router.get('/me', authMiddleware, authController.getMe);
router.post('/refresh', authMiddleware, authController.refreshToken);
router.post('/logout', authMiddleware, authController.logout);

module.exports = router;
