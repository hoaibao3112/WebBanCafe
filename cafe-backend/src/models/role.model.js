const { DataTypes } = require('sequelize');

/**
 * Role Model
 * Maps to 'role' table
 * Stores user roles (ADMIN, STAFF, etc.)
 */
module.exports = (sequelize) => {
    const Role = sequelize.define('Role', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: 'Role name: ADMIN, STAFF'
        }
    }, {
        tableName: 'role',
        timestamps: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
    });

    return Role;
};
