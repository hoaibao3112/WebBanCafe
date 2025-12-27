const moment = require('moment');

/**
 * Format date to Vietnamese timezone
 */
const formatDate = (date, format = 'YYYY-MM-DD HH:mm:ss') => {
    return moment(date).format(format);
};

/**
 * Get start and end of day
 */
const getStartOfDay = (date = new Date()) => {
    return moment(date).startOf('day').toDate();
};

const getEndOfDay = (date = new Date()) => {
    return moment(date).endOf('day').toDate();
};

/**
 * Get date range for reports
 */
const getDateRange = (type = 'day', date = new Date()) => {
    const start = moment(date).startOf(type).toDate();
    const end = moment(date).endOf(type).toDate();
    return { start, end };
};

module.exports = {
    formatDate,
    getStartOfDay,
    getEndOfDay,
    getDateRange
};
