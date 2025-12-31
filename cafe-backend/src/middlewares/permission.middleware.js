const { Decentralization, Module, Function: FunctionModel } = require('../models');
const { ForbiddenError } = require('../utils/errors');

/**
 * Middleware to check user permissions based on module and function
 * This checks against the decentralization table
 * ADMIN role bypasses all permission checks
 */
const checkPermission = (moduleName, functionName) => {
    return async (req, res, next) => {
        try {
            const { roleId, roleName } = req.user;

            // ADMIN has full access to everything
            if (roleName && (roleName.toUpperCase() === 'ADMIN' || roleName.toUpperCase() === 'ADMINISTRATOR')) {
                return next();
            }

            // Find module and function IDs
            const module = await Module.findOne({ where: { name: moduleName } });
            const func = await FunctionModel.findOne({ where: { name: functionName } });

            if (!module || !func) {
                return res.status(500).json({
                    success: false,
                    message: 'Invalid module or function configuration'
                });
            }

            // Check if role has permission
            const permission = await Decentralization.findOne({
                where: {
                    roleId,
                    moduleId: module.id,
                    functionId: func.id
                }
            });

            if (!permission) {
                return res.status(403).json({
                    success: false,
                    message: 'Access denied. Insufficient permissions.'
                });
            }

            next();
        } catch (error) {
            console.error('Permission check error:', error);
            return res.status(500).json({
                success: false,
                message: 'Permission check error'
            });
        }
    };
};

/**
 * Middleware to check if user is ADMIN
 * Recommended for critical operations
 */
const requireAdmin = async (req, res, next) => {
    try {
        const { roleName } = req.user;

        if (!roleName || (roleName.toUpperCase() !== 'ADMIN' && roleName.toUpperCase() !== 'ADMINISTRATOR')) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Admin privileges required.'
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Permission check error'
        });
    }
};

/**
 * Middleware to check if user is STAFF or higher
 */
const requireStaff = async (req, res, next) => {
    try {
        const { roleName } = req.user;

        const allowedRoles = ['ADMIN', 'ADMINISTRATOR', 'STAFF', 'EMPLOYEE'];
        if (!roleName || !allowedRoles.includes(roleName.toUpperCase())) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Staff privileges required.'
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Permission check error'
        });
    }
};

module.exports = {
    checkPermission,
    requireAdmin,
    requireStaff
};

