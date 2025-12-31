const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/app.config');
const { Account, Role, Staff } = require('../models');
const { UnauthorizedError, NotFoundError } = require('../utils/errors');

const authService = {
    /**
     * User login
     * @param {string} username
     * @param {string} password
     * @returns {object} User data and token
     */
    login: async (username, password) => {
        // Find account with role and staff info
        const account = await Account.findOne({
            where: { username },
            include: [
                {
                    model: Role,
                    as: 'role',
                    attributes: ['id', 'name']
                },
                {
                    model: Staff,
                    as: 'staff',
                    attributes: ['id', 'name', 'email', 'phone', 'deleted']
                }
            ]
        });

        if (!account) {
            throw new UnauthorizedError('Invalid username or password');
        }

        // Check if staff account is deleted
        if (account.staff && account.staff.deleted) {
            throw new UnauthorizedError('Account is inactive');
        }

        // Validate password
        const isValid = await account.validatePassword(password);
        if (!isValid) {
            throw new UnauthorizedError('Invalid username or password');
        }

        // Generate token
        const token = authService.createToken(account);

        // Return user info and token
        return {
            token,
            user: {
                id: account.id,
                username: account.username,
                roleId: account.roleId,
                roleName: account.role?.name,
                staffId: account.staffId,
                staffName: account.staff?.name
            }
        };
    },

    /**
     * Create JWT token
     * @param {object} account - Account object
     * @returns {string} JWT token
     */
    createToken: (account) => {
        const payload = {
            id: account.id,
            username: account.username,
            roleId: account.roleId,
            roleName: account.role?.name || null,
            staffId: account.staffId
        };

        return jwt.sign(payload, config.jwt.secret, {
            expiresIn: config.jwt.expiresIn || '24h'
        });
    },

    /**
     * Verify JWT token
     * @param {string} token
     * @returns {object} Decoded token
     */
    verifyToken: (token) => {
        try {
            return jwt.verify(token, config.jwt.secret);
        } catch (error) {
            throw new UnauthorizedError('Invalid or expired token');
        }
    },

    /**
     * Hash password
     * @param {string} password
     * @returns {string} Hashed password
     */
    hashPassword: async (password) => {
        return await bcrypt.hash(password, 10);
    },

    /**
     * Compare password with hash
     * @param {string} password
     * @param {string} hash
     * @returns {boolean}
     */
    comparePassword: async (password, hash) => {
        return await bcrypt.compare(password, hash);
    },

    /**
     * Get current user by ID
     * @param {number} userId
     * @returns {object} User data
     */
    getMe: async (userId) => {
        const account = await Account.findByPk(userId, {
            include: [
                {
                    model: Role,
                    as: 'role',
                    attributes: ['id', 'name']
                },
                {
                    model: Staff,
                    as: 'staff',
                    attributes: ['id', 'no', 'name', 'email', 'phone', 'gender', 'birthdate']
                }
            ],
            attributes: ['id', 'username', 'roleId', 'staffId']
        });

        if (!account) {
            throw new NotFoundError('User not found');
        }

        return {
            id: account.id,
            username: account.username,
            roleId: account.roleId,
            roleName: account.role?.name,
            staff: account.staff
        };
    }
};

module.exports = authService;

