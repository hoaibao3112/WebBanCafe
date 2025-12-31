const accountService = require('../services/account.service');
const ApiResponse = require('../utils/ApiResponse');

const accountController = {
    /**
     * POST /api/admin/accounts
     * Create new account
     */
    createAccount: async (req, res, next) => {
        try {
            const account = await accountService.createAccount(req.body);
            return ApiResponse.success(res, { id: account.id, username: account.username }, 'Account created successfully', 201);
        } catch (error) {
            next(error);
        }
    },

    /**
     * GET /api/admin/accounts
     * Get all accounts
     */
    getAllAccounts: async (req, res, next) => {
        try {
            const accounts = await accountService.getAllAccounts();
            return ApiResponse.success(res, accounts);
        } catch (error) {
            next(error);
        }
    },

    /**
     * GET /api/admin/accounts/:id
     * Get account by ID
     */
    getAccountById: async (req, res, next) => {
        try {
            const account = await accountService.getAccountById(req.params.id);
            return ApiResponse.success(res, account);
        } catch (error) {
            next(error);
        }
    },

    /**
     * PUT /api/admin/accounts/:id
     * Update account
     */
    updateAccount: async (req, res, next) => {
        try {
            const account = await accountService.updateAccount(req.params.id, req.body);
            return ApiResponse.success(res, account, 'Account updated successfully');
        } catch (error) {
            next(error);
        }
    },

    /**
     * DELETE /api/admin/accounts/:id
     * Delete account
     */
    deleteAccount: async (req, res, next) => {
        try {
            const result = await accountService.deleteAccount(req.params.id);
            return ApiResponse.success(res, result);
        } catch (error) {
            next(error);
        }
    },

    /**
     * PUT /api/admin/accounts/:id/password
     * Change password
     */
    changePassword: async (req, res, next) => {
        try {
            const { currentPassword, newPassword } = req.body;
            const result = await accountService.changePassword(req.params.id, currentPassword, newPassword);
            return ApiResponse.success(res, result);
        } catch (error) {
            next(error);
        }
    }
};

module.exports = accountController;
