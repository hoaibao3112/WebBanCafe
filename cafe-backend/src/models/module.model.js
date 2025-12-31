const { DataTypes } = require('sequelize');

/**
 * Module Model
 * Maps to 'module' table
 * Stores system modules for permission management
 */
module.exports = (sequelize) => {
    const Module = sequelize.define('Module', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: 'Module name (homepage, sale, warehouse, etc.)'
        }
    }, {
        tableName: 'module',
        timestamps: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
    });

    return Module;
};
