const authService = require('../services/auth.service');
const ApiResponse = require('../utils/ApiResponse');

const authController = {
    /**
     * POST /api/auth/login
     * User login
     */
    login: async (req, res, next) => {
        try {
            const { username, password } = req.body;

            // Validate input
            if (!username || !password) {
                return ApiResponse.error(res, 'Username and password are required', 400);
            }

            // Authenticate user
            const result = await authService.login(username, password);

            return ApiResponse.success(res, result, 'Login successful');
        } catch (error) {
            next(error);
        }
    },

    /**
     * POST /api/auth/register
     * User registration (admin only - implemented in account controller)
     */
    register: async (req, res) => {
        return ApiResponse.error(res, 'Use /api/admin/accounts to create new accounts', 400);
    },

    /**
     * GET /api/auth/me
     * Get current user info
     */
    getMe: async (req, res, next) => {
        try {
            const userId = req.user.id;
            const userData = await authService.getMe(userId);

            return ApiResponse.success(res, userData, 'User retrieved successfully');
        } catch (error) {
            next(error);
        }
    },

    /**
     * POST /api/auth/refresh
     * Refresh JWT token (same as login, generates new token)
     */
    refreshToken: async (req, res, next) => {
        try {
            const userId = req.user.id;
            const userData = await authService.getMe(userId);

            // Create new token
            const token = authService.createToken({
                id: userData.id,
                username: userData.username,
                roleId: userData.roleId,
                role: { name: userData.roleName },
                staffId: userData.staff?.id
            });

            return ApiResponse.success(res, { token, user: userData }, 'Token refreshed');
        } catch (error) {
            next(error);
        }
    },

    /**
     * POST /api/auth/logout
     * Logout (token invalidation handled on client side)
     */
    logout: async (req, res) => {
        // JWT logout is typically handled client-side by removing the token
        return ApiResponse.success(res, null, 'Logged out successfully');
    }
};

module.exports = authController;

