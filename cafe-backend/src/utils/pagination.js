/**
 * Calculate pagination offset
 */
const getPagination = (page, limit) => {
    const offset = (page - 1) * limit;
    return { offset, limit: parseInt(limit) };
};

/**
 * Get pagination params from request
 */
const getPaginationParams = (req) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    return { page, limit };
};

module.exports = {
    getPagination,
    getPaginationParams
};
