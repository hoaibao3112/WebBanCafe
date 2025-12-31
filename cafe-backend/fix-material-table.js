const mysql = require('mysql2/promise');

async function fixMaterialTableV2() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'kimloan12345',
        database: 'quanlycafe'
    });

    try {
        console.log('🔧 Fixing material table (V2)...\n');

        // Get supplier id column type
        const [supplierCols] = await connection.execute(
            `SHOW COLUMNS FROM supplier WHERE Field = 'id'`
        );
        console.log('Supplier ID type:', supplierCols[0]?.Type);

        // Drop foreign key if exists
        try {
            await connection.execute(
                `ALTER TABLE material DROP FOREIGN KEY fk_material_supplier`
            );
            console.log('Dropped existing FK');
        } catch (e) {
            console.log('No existing FK to drop');
        }

        // Drop column if exists
        try {
            await connection.execute(
                `ALTER TABLE material DROP COLUMN supplier_id`
            );
            console.log('Dropped existing column');
        } catch (e) {
            console.log('No existing column to drop');
        }

        // Add column with correct type (matching supplier.id)
        console.log('\nAdding supplier_id column with correct type...');
        await connection.execute(
            `ALTER TABLE material 
             ADD COLUMN supplier_id INT UNSIGNED NULL AFTER unit`
        );
        console.log('✅ Column added');

        // Add foreign key
        console.log('Adding foreign key...');
        await connection.execute(
            `ALTER TABLE material
             ADD CONSTRAINT fk_material_supplier
             FOREIGN KEY (supplier_id) REFERENCES supplier(id)`
        );
        console.log('✅ Foreign key added');

        console.log('\n🎉 Material table fixed! Restart backend server now.');

    } catch (error) {
        console.error('❌ Error:', error.message);
        console.error(error);
    } finally {
        await connection.end();
    }
}

fixMaterialTableV2();
