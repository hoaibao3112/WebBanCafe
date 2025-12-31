const { DataTypes } = require('sequelize');

/**
 * Material Model
 * Maps to 'material' table
 * Stores raw materials/ingredients for products
 */
module.exports = (sequelize) => {
    const Material = sequelize.define('Material', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: 'Material/ingredient name'
        },
        supplierId: {
            type: DataTypes.BIGINT,
            allowNull: true,
            field: 'supplier_id',
            references: {
                model: 'supplier',
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        remain: {
            type: DataTypes.DOUBLE,
            allowNull: true,
            defaultValue: 0,
            comment: 'Current stock quantity'
        },
        unit: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: 'Unit of measure (kg, liter, etc.)'
        },
        deleted: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,
            comment: 'Soft delete flag'
        }
    }, {
        tableName: 'material',
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

    return Material;
};
