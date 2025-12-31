const { Account, Role, Staff } = require('../models');
const { NotFoundError, ConflictError, ValidationError } = require('../utils/errors');
const bcrypt = require('bcryptjs');

const accountService = {
    /**
     * Create new account
     */
    createAccount: async (accountData) => {
        const { username, password, staffId, roleId } = accountData;

        // Validate required fields
        if (!username || !password || !staffId || !roleId) {
            throw new ValidationError('Username, password, staffId, and roleId are required');
        }

        // Check if username exists
        const existing = await Account.findOne({ where: { username } });
        if (existing) {
            throw new ConflictError('Username already exists');
        }

        // Check if staff exists
        const staff = await Staff.findByPk(staffId);
        if (!staff) {
            throw new NotFoundError('Staff not found');
        }

        // Check if staff already has an account
        const staffAccount = await Account.findOne({ where: { staffId } });
        if (staffAccount) {
            throw new ConflictError('Staff already has an account');
        }

        // Check if role exists
        const role = await Role.findByPk(roleId);
        if (!role) {
            throw new NotFoundError('Role not found');
        }

        // Create account (password will be hashed automatically by model hook)
        const account = await Account.create({
            username,
            password,
            staffId,
            roleId
        });

        return account;
    },

    /**
     * Get all accounts
     */
    getAllAccounts: async () => {
        const accounts = await Account.findAll({
            include: [
                {
                    model: Role,
                    as: 'role',
                    attributes: ['id', 'name']
                },
                {
                    model: Staff,
                    as: 'staff',
                    attributes: ['id', 'no', 'name', 'email', 'phone']
                }
            ],
            attributes: ['id', 'username', 'roleId', 'staffId'],
            order: [['id', 'DESC']]
        });

        return accounts;
    },

    /**
     * Get account by ID
     */
    getAccountById: async (id) => {
        const account = await Account.findByPk(id, {
            include: [
                {
                    model: Role,
                    as: 'role',
                    attributes: ['id', 'name']
                },
                {
                    model: Staff,
                    as: 'staff'
                }
            ],
            attributes: ['id', 'username', 'roleId', 'staffId']
        });

        if (!account) {
            throw new NotFoundError('Account not found');
        }

        return account;
    },

    /**
     * Update account
     */
    updateAccount: async (id, updateData) => {
        const account = await Account.findByPk(id);
        if (!account) {
            throw new NotFoundError('Account not found');
        }

        // Check username uniqueness if updating
        if (updateData.username && updateData.username !== account.username) {
            const existing = await Account.findOne({ where: { username: updateData.username } });
            if (existing) {
                throw new ConflictError('Username already exists');
            }
        }

        // Check role exists if updating
        if (updateData.roleId) {
            const role = await Role.findByPk(updateData.roleId);
            if (!role) {
                throw new NotFoundError('Role not found');
            }
        }

        // Update account (password will be hashed if changed)
        await account.update(updateData);
        return account;
    },

    /**
     * Delete account
     */
    deleteAccount: async (id) => {
        const account = await Account.findByPk(id);
        if (!account) {
            throw new NotFoundError('Account not found');
        }

        await account.destroy();
        return { message: 'Account deleted successfully' };
    },

    /**
     * Change password
     */
    changePassword: async (id, currentPassword, newPassword) => {
        const account = await Account.findByPk(id);
        if (!account) {
            throw new NotFoundError('Account not found');
        }

        // Verify current password
        const isValid = await account.validatePassword(currentPassword);
        if (!isValid) {
            throw new ValidationError('Current password is incorrect');
        }

        // Update password (will be hashed by model hook)
        await account.update({ password: newPassword });
        return { message: 'Password changed successfully' };
    }
};

module.exports = accountService;
