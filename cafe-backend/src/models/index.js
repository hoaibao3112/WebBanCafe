const { Sequelize } = require('sequelize');
const config = require('../config/app.config');

// Initialize Sequelize
const sequelize = new Sequelize(config.database);

// Import all models
const Account = require('./account.model')(sequelize);
const Role = require('./role.model')(sequelize);
const Staff = require('./staff.model')(sequelize);
const Product = require('./product.model')(sequelize);
const Material = require('./material.model')(sequelize);
const Supplier = require('./supplier.model')(sequelize);
const ImportNote = require('./import-note.model')(sequelize);
const Shipment = require('./shipment.model')(sequelize);
const ExportNote = require('./export-note.model')(sequelize);
const ExportDetail = require('./export-detail.model')(sequelize);
const Receipt = require('./receipt.model')(sequelize);
const ReceiptDetail = require('./receipt-detail.model')(sequelize);
const Recipe = require('./recipe.model')(sequelize);
const Discount = require('./discount.model')(sequelize);
const DiscountDetail = require('./discount-detail.model')(sequelize);
const Module = require('./module.model')(sequelize);
const FunctionModel = require('./function.model')(sequelize);
const Decentralization = require('./decentralization.model')(sequelize);

// ========================================
// DEFINE ASSOCIATIONS
// ========================================

// Account associations
Account.belongsTo(Staff, { foreignKey: 'staffId', as: 'staff' });
Account.belongsTo(Role, { foreignKey: 'roleId', as: 'role' });

// Staff associations
Staff.hasOne(Account, { foreignKey: 'staffId', as: 'account' });
Staff.hasMany(ImportNote, { foreignKey: 'staffId', as: 'importNotes' });
Staff.hasMany(ExportNote, { foreignKey: 'staffId', as: 'exportNotes' });
Staff.hasMany(Receipt, { foreignKey: 'staffId', as: 'receipts' });

// Role associations
Role.hasMany(Account, { foreignKey: 'roleId', as: 'accounts' });
Role.hasMany(Decentralization, { foreignKey: 'roleId', as: 'permissions' });

// Product associations
Product.hasMany(ReceiptDetail, { foreignKey: 'productId', as: 'receiptDetails' });
Product.hasMany(Recipe, { foreignKey: 'productId', as: 'recipes' });
Product.hasMany(DiscountDetail, { foreignKey: 'productId', as: 'discountDetails' });

// Product - Material many-to-many through Recipe
Product.belongsToMany(Material, {
    through: Recipe,
    foreignKey: 'productId',
    otherKey: 'materialId',
    as: 'materials'
});

// Material associations
Material.belongsTo(Supplier, { foreignKey: 'supplierId', as: 'supplier' });
Material.hasMany(Recipe, { foreignKey: 'materialId', as: 'recipes' });
Material.hasMany(Shipment, { foreignKey: 'materialId', as: 'shipments' });

// Material - Product many-to-many through Recipe
Material.belongsToMany(Product, {
    through: Recipe,
    foreignKey: 'materialId',
    otherKey: 'productId',
    as: 'products'
});

// Supplier associations
Supplier.hasMany(Material, { foreignKey: 'supplierId', as: 'materials' });

// ImportNote associations
ImportNote.belongsTo(Staff, { foreignKey: 'staffId', as: 'staff' });
ImportNote.hasMany(Shipment, { foreignKey: 'importId', as: 'shipments' });

// Shipment associations
Shipment.belongsTo(Material, { foreignKey: 'materialId', as: 'material' });
Shipment.belongsTo(ImportNote, { foreignKey: 'importId', as: 'importNote' });
Shipment.hasMany(ExportDetail, { foreignKey: 'shipmentId', as: 'exportDetails' });

// ExportNote associations
ExportNote.belongsTo(Staff, { foreignKey: 'staffId', as: 'staff' });
ExportNote.hasMany(ExportDetail, { foreignKey: 'exportId', as: 'details' });

// ExportDetail associations
ExportDetail.belongsTo(ExportNote, { foreignKey: 'exportId', as: 'exportNote' });
ExportDetail.belongsTo(Shipment, { foreignKey: 'shipmentId', as: 'shipment' });

// Receipt associations
Receipt.belongsTo(Staff, { foreignKey: 'staffId', as: 'staff' });
Receipt.hasMany(ReceiptDetail, { foreignKey: 'receiptId', as: 'items' });

// ReceiptDetail associations
ReceiptDetail.belongsTo(Receipt, { foreignKey: 'receiptId', as: 'receipt' });
ReceiptDetail.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

// Recipe associations
Recipe.belongsTo(Product, { foreignKey: 'productId', as: 'product' });
Recipe.belongsTo(Material, { foreignKey: 'materialId', as: 'material' });

// Discount associations
Discount.hasMany(DiscountDetail, { foreignKey: 'discountId', as: 'details' });

// DiscountDetail associations
DiscountDetail.belongsTo(Discount, { foreignKey: 'discountId', as: 'discount' });
DiscountDetail.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

// Module associations
Module.hasMany(Decentralization, { foreignKey: 'moduleId', as: 'permissions' });

// Function associations
FunctionModel.hasMany(Decentralization, { foreignKey: 'functionId', as: 'permissions' });

// Decentralization associations
Decentralization.belongsTo(Role, { foreignKey: 'roleId', as: 'role' });
Decentralization.belongsTo(Module, { foreignKey: 'moduleId', as: 'module' });
Decentralization.belongsTo(FunctionModel, { foreignKey: 'functionId', as: 'function' });

// ========================================
// EXPORT ALL MODELS
// ========================================

module.exports = {
    sequelize,
    // Models
    Account,
    Role,
    Staff,
    Product,
    Material,
    Supplier,
    ImportNote,
    Shipment,
    ExportNote,
    ExportDetail,
    Receipt,
    ReceiptDetail,
    Recipe,
    Discount,
    DiscountDetail,
    Module,
    Function: FunctionModel,
    Decentralization
};
