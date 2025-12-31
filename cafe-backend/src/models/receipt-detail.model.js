const { DataTypes } = require('sequelize');

/**
 * ReceiptDetail Model
 * Maps to 'receipt_detail' table
 * Stores individual items in an order
 */
module.exports = (sequelize) => {
    const ReceiptDetail = sequelize.define('ReceiptDetail', {
        receiptId: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            field: 'receipt_id',
            references: {
                model: 'receipt',
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
        quantity: {
            type: DataTypes.DOUBLE,
            allowNull: true,
            comment: 'Quantity ordered'
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: true,
            comment: 'Price at time of sale'
        }
    }, {
        tableName: 'receipt_detail',
        timestamps: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
    });

    return ReceiptDetail;
};
