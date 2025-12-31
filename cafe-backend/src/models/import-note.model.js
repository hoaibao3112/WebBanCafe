const { DataTypes } = require('sequelize');

/**
 * ImportNote Model
 * Maps to 'import_note' table
 * Stores material import transactions
 */
module.exports = (sequelize) => {
    const ImportNote = sequelize.define('ImportNote', {
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
            comment: 'Total import cost'
        },
        receivedDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            field: 'received_date',
            comment: 'Date materials were received'
        }
    }, {
        tableName: 'import_note',
        timestamps: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
    });

    return ImportNote;
};
