const { DataTypes } = require('sequelize');

/**
 * Supplier Model
 * Maps to 'supplier' table
 * Stores material supplier information
 */
module.exports = (sequelize) => {
    const Supplier = sequelize.define('Supplier', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: 'Supplier company name'
        },
        phone: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: 'Contact phone number'
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: 'Supplier address'
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: 'Contact email'
        },
        deleted: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,
            comment: 'Soft delete flag'
        }
    }, {
        tableName: 'supplier',
        timestamps: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        defaultScope: {
            where: {
                deleted: false
            }
        },
        scopes: {
            withDeleted: {
                where: {}
            }
        }
    });

    return Supplier;
};
