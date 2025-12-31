const { DataTypes } = require('sequelize');

/**
 * DiscountDetail Model
 * Maps to 'discount_detail' table
 * Stores product-specific discount percentages
 */
module.exports = (sequelize) => {
    const DiscountDetail = sequelize.define('DiscountDetail', {
        discountId: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            field: 'discount_id',
            references: {
                model: 'discount',
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
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
        percent: {
            type: DataTypes.DOUBLE,
            allowNull: true,
            comment: 'Discount percentage (0-100)'
        }
    }, {
        tableName: 'discount_detail',
        timestamps: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
    });

    return DiscountDetail;
};
