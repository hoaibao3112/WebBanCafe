const { Material, Supplier, Shipment } = require('../models');
const { NotFoundError, ConflictError } = require('../utils/errors');
const { Op } = require('sequelize');

const materialService = {
    /**
     * Create new material
     */
    createMaterial: async (materialData) => {
        const material = await Material.create({
            ...materialData,
            remain: materialData.remain || 0,
            deleted: false
        });

        return await materialService.getMaterialById(material.id);
    },

    /**
     * Get all materials
     */
    getAllMaterials: async (filters = {}) => {
        const where = {};

        if (filters.search) {
            where[Op.or] = [
                { name: { [Op.like]: `%${filters.search}%` } },
                { unit: { [Op.like]: `%${filters.search}%` } }
            ];
        }

        if (filters.supplierId) {
            where.supplierId = filters.supplierId;
        }

        const materials = await Material.findAll({
            where,
            include: [{
                model: Supplier,
                as: 'supplier',
                attributes: ['id', 'name', 'phone']
            }],
            order: [['id', 'DESC']]
        });

        return materials;
    },

    /**
     * Get material by ID
     */
    getMaterialById: async (id) => {
        const material = await Material.findByPk(id, {
            include: [{
                model: Supplier,
                as: 'supplier'
            }]
        });

        if (!material) {
            throw new NotFoundError('Material not found');
        }

        return material;
    },

    /**
     * Update material
     */
    updateMaterial: async (id, updateData) => {
        const material = await Material.findByPk(id);
        if (!material) {
            throw new NotFoundError('Material not found');
        }

        await material.update(updateData);
        return await materialService.getMaterialById(id);
    },

    /**
     * Soft delete material
     */
    deleteMaterial: async (id) => {
        const material = await Material.findByPk(id);
        if (!material) {
            throw new NotFoundError('Material not found');
        }

        await material.update({ deleted: true });
        return { message: 'Material deleted successfully' };
    },

    /**
     * Get low stock materials
     * (materials where remain < 10% of average stock)
     */
    getLowStockMaterials: async (threshold = 10) => {
        const materials = await Material.findAll({
            where: {
                remain: { [Op.lt]: threshold },
                deleted: false
            },
            include: [{
                model: Supplier,
                as: 'supplier',
                attributes: ['id', 'name', 'phone']
            }],
            order: [['remain', 'ASC']]
        });

        return materials;
    }
};

module.exports = materialService;
