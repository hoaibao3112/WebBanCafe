const { DataTypes } = require('sequelize');

/**
 * Recipe Model
 * Maps to 'recipe' table
 * Stores product ingredients (which materials make up each product)
 */
module.exports = (sequelize) => {
    const Recipe = sequelize.define('Recipe', {
        productId: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            field: 'product_id',
            references: {
                model: 'product',
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        materialId: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            field: 'material_id',
            references: {
                model: 'material',
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        quantity: {
            type: DataTypes.DOUBLE,
            allowNull: true,
            comment: 'Amount of material needed per product unit'
        },
        deleted: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,
            comment: 'Soft delete flag'
        }
    }, {
        tableName: 'recipe',
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

    return Recipe;
};
