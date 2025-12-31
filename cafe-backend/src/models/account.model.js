const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

/**
 * Account Model
 * Maps to 'account' table
 * Stores user login credentials
 */
module.exports = (sequelize) => {
    const Account = sequelize.define('Account', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING(255),
            allowNull: true,
            unique: true,
            comment: 'Login username'
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: 'Hashed password'
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
        roleId: {
            type: DataTypes.BIGINT,
            allowNull: true,
            field: 'role_id',
            references: {
                model: 'role',
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    }, {
        tableName: 'account',
        timestamps: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        hooks: {
            // Hash password before creating account
            beforeCreate: async (account) => {
                if (account.password) {
                    account.password = await bcrypt.hash(account.password, 10);
                }
            },
            // Hash password before updating if it changed
            beforeUpdate: async (account) => {
                if (account.changed('password')) {
                    account.password = await bcrypt.hash(account.password, 10);
                }
            }
        }
    });

    // Instance method to validate password
    Account.prototype.validatePassword = async function (password) {
        return await bcrypt.compare(password, this.password);
    };

    return Account;
};
