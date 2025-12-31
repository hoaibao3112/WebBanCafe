const { sequelize, Role, Account, Staff, Module, Function: FunctionModel } = require('../models');

/**
 * Seed database with initial data
 * Run: node src/utils/seed.js
 */

const seedDatabase = async () => {
    try {
        console.log('🌱 Starting database seeding...');

        // 1. Seed Roles
        console.log('Creating roles...');
        const [adminRole] = await Role.findOrCreate({
            where: { id: 1 },
            defaults: { id: 1, name: 'ADMIN' }
        });

        const [staffRole] = await Role.findOrCreate({
            where: { id: 2 },
            defaults: { id: 2, name: 'STAFF' }
        });

        console.log('✅ Roles created');

        // 2. Seed Admin Staff
        console.log('Creating admin staff...');
        const [adminStaff] = await Staff.findOrCreate({
            where: { no: 'ST001' },
            defaults: {
                no: 'ST001',
                name: 'Admin User',
                gender: true,
                phone: '0123456789',
                email: 'admin@cafe.com',
                deleted: false
            }
        });

        console.log('✅ Admin staff created');

        // 3. Seed Admin Account
        console.log('Creating admin account...');
        const existingAdmin = await Account.findOne({ where: { username: 'admin' } });

        if (!existingAdmin) {
            await Account.create({
                username: 'admin',
                password: 'admin123', // Will be hashed by model hook
                staffId: adminStaff.id,
                roleId: adminRole.id
            });
            console.log('✅ Admin account created (username: admin, password: admin123)');
        } else {
            console.log('ℹ️  Admin account already exists');
        }

        // 4. Seed Modules (for permission system)
        console.log('Creating modules...');
        const modules = [
            { id: 1, name: 'dashboard' },
            { id: 2, name: 'staff' },
            { id: 3, name: 'accounts' },
            { id: 4, name: 'products' },
            { id: 5, name: 'materials' },
            { id: 6, name: 'warehouse' },
            { id: 7, name: 'receipts' },
            { id: 8, name: 'promotions' }
        ];

        for (const module of modules) {
            await Module.findOrCreate({
                where: { id: module.id },
                defaults: module
            });
        }

        console.log('✅ Modules created');

        // 5. Seed Functions (for permission system)
        console.log('Creating functions...');
        const functions = [
            { id: 1, name: 'view' },
            { id: 2, name: 'add' },
            { id: 3, name: 'edit' },
            { id: 4, name: 'remove' }
        ];

        for (const func of functions) {
            await FunctionModel.findOrCreate({
                where: { id: func.id },
                defaults: func
            });
        }

        console.log('✅ Functions created');

        console.log('\n🎉 Database seeding completed successfully!');
        console.log('\n📝 Login Credentials:');
        console.log('   Username: admin');
        console.log('   Password: admin123');
        console.log('   Role: ADMIN\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

// Run seeding
seedDatabase();
