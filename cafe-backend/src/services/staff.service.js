const { Staff, Account, Role } = require('../models');
const { NotFoundError, ConflictError, BadRequestError } = require('../utils/errors');
const { Op } = require('sequelize');

const staffService = {
    /**
     * Create new staff member
     */
    createStaff: async (staffData) => {
        // Check if staff number already exists
        const existing = await Staff.findOne({ where: { no: staffData.no } });
        if (existing) {
            throw new ConflictError('Staff number already exists');
        }

        // Check email uniqueness if provided
        if (staffData.email) {
            const emailExists = await Staff.scope('withDeleted').findOne({
                where: { email: staffData.email, deleted: false }
            });
            if (emailExists) {
                throw new ConflictError('Email already in use');
            }
        }

        const staff = await Staff.create(staffData);
        return staff;
    },

    /**
     * Get all staff (exclude deleted by default)
     */
    getAllStaff: async (filters = {}) => {
        const where = {};

        if (filters.search) {
            where[Op.or] = [
                { name: { [Op.like]: `%${filters.search}%` } },
                { no: { [Op.like]: `%${filters.search}%` } },
                { phone: { [Op.like]: `%${filters.search}%` } },
                { email: { [Op.like]: `%${filters.search}%` } }
            ];
        }

        const staff = await Staff.findAll({
            where,
            include: [{
                model: Account,
                as: 'account',
                include: [{
                    model: Role,
                    as: 'role',
                    attributes: ['id', 'name']
                }],
                attributes: ['id', 'username', 'roleId']
            }],
            order: [['id', 'DESC']]
        });

        return staff;
    },

    /**
     * Get staff by ID
     */
    getStaffById: async (id) => {
        const staff = await Staff.findByPk(id, {
            include: [{
                model: Account,
                as: 'account',
                include: [{
                    model: Role,
                    as: 'role',
                    attributes: ['id', 'name']
                }],
                attributes: ['id', 'username', 'roleId']
            }]
        });

        if (!staff) {
            throw new NotFoundError('Staff not found');
        }

        return staff;
    },

    /**
     * Update staff
     */
    updateStaff: async (id, updateData) => {
        const staff = await Staff.findByPk(id);
        if (!staff) {
            throw new NotFoundError('Staff not found');
        }

        // Check if updating staff number
        if (updateData.no && updateData.no !== staff.no) {
            const existing = await Staff.findOne({ where: { no: updateData.no } });
            if (existing) {
                throw new ConflictError('Staff number already exists');
            }
        }

        // Check email uniqueness if updating
        if (updateData.email && updateData.email !== staff.email) {
            const emailExists = await Staff.scope('withDeleted').findOne({
                where: {
                    email: updateData.email,
                    id: { [Op.ne]: id },
                    deleted: false
                }
            });
            if (emailExists) {
                throw new ConflictError('Email already in use');
            }
        }

        await staff.update(updateData);
        return staff;
    },

    /**
     * Soft delete staff
     */
    deleteStaff: async (id) => {
        const staff = await Staff.findByPk(id);
        if (!staff) {
            throw new NotFoundError('Staff not found');
        }

        // Check if staff has associated account
        const account = await Account.findOne({ where: { staffId: id } });
        if (account) {
            // Also delete the account
            await account.destroy();
        }

        await staff.update({ deleted: true });
        return { message: 'Staff deleted successfully' };
    }
};

module.exports = staffService;
