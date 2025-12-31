const { DataTypes } = require('sequelize');

/**
 * Decentralization Model
 * Maps to 'decentralization' table
 * Stores role-based permissions (which roles can perform which functions on which modules)
 */
module.exports = (sequelize) => {
    const Decentralization = sequelize.define('Decentralization', {
        roleId: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            field: 'role_id',
            references: {
                model: 'role',
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        moduleId: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            field: 'module_id',
            references: {
                model: 'module',
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        functionId: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            field: 'function_id',
            references: {
                model: 'function',
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    }, {
        tableName: 'decentralization',
        timestamps: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
    });

    return Decentralization;
};
