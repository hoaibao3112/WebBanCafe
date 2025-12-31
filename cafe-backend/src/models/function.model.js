const { DataTypes } = require('sequelize');

/**
 * Function Model
 * Maps to 'function' table
 * Stores permission functions (view, add, edit, remove, etc.)
 */
module.exports = (sequelize) => {
    const Function = sequelize.define('Function', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: 'Function name (view, add, edit, remove, detail, excel, pdf)'
        }
    }, {
        tableName: 'function',
        timestamps: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
    });

    return Function;
};
