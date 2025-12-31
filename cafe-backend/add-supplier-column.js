const mysql = require('mysql2/promise');

async function addSupplierColumn() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'kimloan12345',
        database: 'quanlycafe'
    });

    try {
        console.log('🔧 Adding supplier_id to material table...\n');

        // Drop FK if exists
        try {
            await connection.execute(`ALTER TABLE material DROP FOREIGN KEY fk_material_supplier`);
        } catch (e) { }

        // Drop column if exists
        try {
            await connection.execute(`ALTER TABLE material DROP COLUMN supplier_id`);
        } catch (e) { }

        // Add column (simple INT, no FK for now)
        console.log('Adding supplier_id column...');
        await connection.execute(
            `ALTER TABLE material ADD COLUMN supplier_id INT NULL`
        );

        console.log('✅ Column added successfully!');
        console.log('\n🎉 Done! Restart backend server now.\n');

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await connection.end();
    }
}

addSupplierColumn();
