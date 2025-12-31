const { DataTypes } = require('sequelize');

/**
 * Shipment Model
 * Maps to 'shipment' table
 * Stores material batches with expiration tracking
 */
module.exports = (sequelize) => {
    const Shipment = sequelize.define('Shipment', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        materialId: {
            type: DataTypes.BIGINT,
            allowNull: true,
            field: 'material_id',
            references: {
                model: 'material',
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        importId: {
            type: DataTypes.BIGINT,
            allowNull: true,
            field: 'import_id',
            references: {
                model: 'import_note',
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        quantity: {
            type: DataTypes.DOUBLE,
            allowNull: true,
            comment: 'Batch quantity'
        },
        unitPrice: {
            type: DataTypes.DOUBLE,
            allowNull: true,
            field: 'unit_price',
            comment: 'Cost per unit'
        },
        mfg: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            comment: 'Manufacturing/Production date'
        },
        exp: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            comment: 'Expiration date'
        }
    }, {
        tableName: 'shipment',
        timestamps: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
    });

    return Shipment;
};
