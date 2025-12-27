/**
 * Middleware to check user permissions based on module and function
 * This will check against the decentralization table
 */
const permissionMiddleware = (moduleId, functionId) => {
    return async (req, res, next) => {
        try {
            const { roleId } = req.user;

            // TODO: Implement permission check
            // Query decentralization table to check if role has access to module + function
            // const hasPermission = await checkPermission(roleId, moduleId, functionId);

            // For now, allow all authenticated users
            // This will be implemented when models are ready

            // if (!hasPermission) {
            //   return res.status(403).json({
            //     success: false,
            //     message: 'Access denied. Insufficient permissions.'
            //   });
            // }

            next();
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Permission check error'
            });
        }
    };
};

/**
 * Middleware to check if user is admin
 */
const adminOnly = async (req, res, next) => {
    try {
        const { roleName } = req.user;

        if (roleName !== 'Admin' && roleName !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Admin only.'
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
    permissionMiddleware,
    adminOnly
};
