const { DataTypes } = require('sequelize');

/**
 * Receipt Model
 * Maps to 'receipt' table
 * Stores customer orders/sales transactions
 */
module.exports = (sequelize) => {
    const Receipt = sequelize.define('Receipt', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        staffId: {
            type: DataTypes.BIGINT,
            allowNull: true,
            field: 'staff_id',
            references: {
                model: 'staff',
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        total: {
            type: DataTypes.DOUBLE,
            allowNull: true,
            comment: 'Total order amount'
        },
        invoiceDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            field: 'invoice_date',
            comment: 'Order date'
        },
        received: {
            type: DataTypes.DOUBLE,
            allowNull: true,
            comment: 'Amount received from customer'
        },
        excess: {
            type: DataTypes.DOUBLE,
            allowNull: true,
            comment: 'Change returned to customer'
        }
    }, {
        tableName: 'receipt',
        timestamps: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
    });

    return Receipt;
};
