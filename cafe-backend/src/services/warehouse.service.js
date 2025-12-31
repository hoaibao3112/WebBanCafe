const {
    ImportNote, ExportNote, Shipment, ExportDetail, Material, Staff
} = require('../models');
const { NotFoundError, BadRequestError } = require('../utils/errors');
const { sequelize } = require('../models');

const warehouseService = {
    /**
     * Import materials (create import note + shipments)
     * Updates material stock
     */
    importMaterials: async (importData) => {
        const { staffId, shipments, receivedDate } = importData;

        const transaction = await sequelize.transaction();

        try {
            // Calculate total
            const total = shipments.reduce((sum, s) => sum + (s.quantity * s.unitPrice), 0);

            // Create import note
            const importNote = await ImportNote.create({
                staffId,
                total,
                receivedDate: receivedDate || new Date()
            }, { transaction });

            // Create shipments and update material stock
            for (const shipmentData of shipments) {
                // Create shipment
                await Shipment.create({
                    materialId: shipmentData.materialId,
                    importId: importNote.id,
                    quantity: shipmentData.quantity,
                    unitPrice: shipmentData.unitPrice,
                    mfg: shipmentData.mfg,
                    exp: shipmentData.exp
                }, { transaction });

                // Update material stock
                const material = await Material.findByPk(shipmentData.materialId, { transaction });
                if (!material) {
                    throw new NotFoundError(`Material with ID ${shipmentData.materialId} not found`);
                }

                await material.update({
                    remain: material.remain + shipmentData.quantity
                }, { transaction });
            }

            await transaction.commit();

            return await warehouseService.getImportById(importNote.id);
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    },

    /**
     * Get import note by ID
     */
    getImportById: async (id) => {
        const importNote = await ImportNote.findByPk(id, {
            include: [
                {
                    model: Staff,
                    as: 'staff',
                    attributes: ['id', 'name']
                },
                {
                    model: Shipment,
                    as: 'shipments',
                    include: [{
                        model: Material,
                        as: 'material',
                        attributes: ['id', 'name', 'unit']
                    }]
                }
            ]
        });

        if (!importNote) {
            throw new NotFoundError('Import note not found');
        }

        return importNote;
    },

    /**
     * Get all import notes
     */
    getAllImports: async (filters = {}) => {
        const where = {};

        if (filters.startDate && filters.endDate) {
            where.receivedDate = {
                [Op.between]: [filters.startDate, filters.endDate]
            };
        }

        const imports = await ImportNote.findAll({
            where,
            include: [{
                model: Staff,
                as: 'staff',
                attributes: ['id', 'name']
            }],
            order: [['id', 'DESC']]
        });

        return imports;
    },

    /**
     * Export materials (create export note + export details)
     * Deducts from shipments using FIFO
     */
    exportMaterials: async (exportData) => {
        const { staffId, exports, invoiceDate, reason } = exportData;

        const transaction = await sequelize.transaction();

        try {
            let total = 0;

            // Create export note
            const exportNote = await ExportNote.create({
                staffId,
                total: 0, // Will be calculated
                invoiceDate: invoiceDate || new Date()
            }, { transaction });

            // Process each export
            for (const exportItem of exports) {
                const { materialId, quantity } = exportItem;

                // Get available shipments for this material (FIFO - oldest first)
                const shipments = await Shipment.findAll({
                    where: {
                        materialId,
                        quantity: { [Op.gt]: 0 }
                    },
                    order: [['mfg', 'ASC'], ['id', 'ASC']],
                    transaction
                });

                let remainingQuantity = quantity;

                // Deduct from shipments
                for (const shipment of shipments) {
                    if (remainingQuantity <= 0) break;

                    const deductQuantity = Math.min(shipment.quantity, remainingQuantity);

                    // Create export detail
                    await ExportDetail.create({
                        exportId: exportNote.id,
                        shipmentId: shipment.id,
                        quantity: deductQuantity,
                        reason: reason || 'Manual export'
                    }, { transaction });

                    // Update shipment quantity
                    await shipment.update({
                        quantity: shipment.quantity - deductQuantity
                    }, { transaction });

                    total += deductQuantity * shipment.unitPrice;
                    remainingQuantity -= deductQuantity;
                }

                if (remainingQuantity > 0) {
                    throw new BadRequestError(`Insufficient stock for material ID ${materialId}`);
                }

                // Update material stock
                const material = await Material.findByPk(materialId, { transaction });
                await material.update({
                    remain: material.remain - quantity
                }, { transaction });
            }

            // Update export note total
            await exportNote.update({ total }, { transaction });

            await transaction.commit();

            return await warehouseService.getExportById(exportNote.id);
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    },

    /**
     * Get export note by ID
     */
    getExportById: async (id) => {
        const exportNote = await ExportNote.findByPk(id, {
            include: [
                {
                    model: Staff,
                    as: 'staff',
                    attributes: ['id', 'name']
                },
                {
                    model: ExportDetail,
                    as: 'details',
                    include: [{
                        model: Shipment,
                        as: 'shipment',
                        include: [{
                            model: Material,
                            as: 'material',
                            attributes: ['id', 'name', 'unit']
                        }]
                    }]
                }
            ]
        });

        if (!exportNote) {
            throw new NotFoundError('Export note not found');
        }

        return exportNote;
    },

    /**
     * Get all export notes
     */
    getAllExports: async (filters = {}) => {
        const where = {};

        if (filters.startDate && filters.endDate) {
            where.invoiceDate = {
                [Op.between]: [filters.startDate, filters.endDate]
            };
        }

        const exports = await ExportNote.findAll({
            where,
            include: [{
                model: Staff,
                as: 'staff',
                attributes: ['id', 'name']
            }],
            order: [['id', 'DESC']]
        });

        return exports;
    },

    /**
     * Get current inventory status
     */
    getInventory: async () => {
        const materials = await Material.findAll({
            where: { deleted: false },
            include: [{
                model: Supplier,
                as: 'supplier',
                attributes: ['id', 'name']
            }],
            order: [['name', 'ASC']]
        });

        return materials;
    }
};

module.exports = warehouseService;
