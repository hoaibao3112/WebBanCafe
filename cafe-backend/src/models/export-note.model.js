const { DataTypes } = require('sequelize');

/**
 * ExportNote Model
 * Maps to 'export_note' table
 * Stores material export transactions
 */
module.exports = (sequelize) => {
    const ExportNote = sequelize.define('ExportNote', {
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
            comment: 'Total export cost'
        },
        invoiceDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            field: 'invoice_date',
            comment: 'Export date'
        }
    }, {
        tableName: 'export_note',
        timestamps: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
    });

    return ExportNote;
};
