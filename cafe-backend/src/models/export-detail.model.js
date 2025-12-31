const { DataTypes } = require('sequelize');

/**
 * ExportDetail Model
 * Maps to 'export_detail' table
 * Stores individual items in export transactions
 */
module.exports = (sequelize) => {
    const ExportDetail = sequelize.define('ExportDetail', {
        exportId: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            field: 'export_id',
            references: {
                model: 'export_note',
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        shipmentId: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            field: 'shipment_id',
            references: {
                model: 'shipment',
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        quantity: {
            type: DataTypes.DOUBLE,
            allowNull: true,
            comment: 'Quantity exported from this shipment'
        },
        reason: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: 'Reason for export (damage, expiry, etc.)'
        }
    }, {
        tableName: 'export_detail',
        timestamps: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
    });

    return ExportDetail;
};
