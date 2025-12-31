const { DataTypes } = require('sequelize');

/**
 * Product Model
 * Maps to 'product' table
 * Stores cafe products (drinks, food, etc.)
 */
module.exports = (sequelize) => {
    const Product = sequelize.define('Product', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: 'Product name'
        },
        category: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: 'Product category (Coffee, Tea, Food, etc.)'
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: true,
            comment: 'Selling price'
        },
        unit: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: 'Unit of measure (cup, piece, etc.)'
        },
        image: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: 'Product image filename'
        },
        deleted: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,
            comment: 'Soft delete flag'
        }
    }, {
        tableName: 'product',
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

    return Product;
};
