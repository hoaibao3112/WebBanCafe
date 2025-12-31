const { DataTypes } = require('sequelize');

/**
 * Staff Model
 * Maps to 'staff' table
 * Stores employee information
 */
module.exports = (sequelize) => {
    const Staff = sequelize.define('Staff', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        no: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
            field: 'no.',
            comment: 'Staff number/code'
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: 'Staff full name'
        },
        gender: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            comment: '0 = Female, 1 = Male'
        },
        birthdate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            comment: 'Date of birth'
        },
        phone: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: 'Contact phone number'
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: 'Home address'
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: 'Email address'
        },
        hourlyWage: {
            type: DataTypes.DOUBLE,
            allowNull: true,
            field: 'hourly_wage',
            comment: 'Hourly wage rate'
        },
        deleted: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,
            comment: 'Soft delete flag'
        }
    }, {
        tableName: 'staff',
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

    return Staff;
};
