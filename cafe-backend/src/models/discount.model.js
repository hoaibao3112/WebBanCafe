const { DataTypes } = require('sequelize');

/**
 * Discount Model
 * Maps to 'discount' table
 * Stores promotion campaigns
 */
module.exports = (sequelize) => {
    const Discount = sequelize.define('Discount', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        startDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            field: 'start_date',
            comment: 'Promotion start date'
        },
        endDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            field: 'end_date',
            comment: 'Promotion end date'
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true,
            comment: 'Active/Inactive status'
        }
    }, {
        tableName: 'discount',
        timestamps: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
    });

    return Discount;
};
