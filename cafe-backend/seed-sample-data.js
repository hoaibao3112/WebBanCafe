const mysql = require('mysql2/promise');

async function seedSampleData() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'kimloan12345',
        database: 'quanlycafe'
    });

    try {
        console.log('🌱 Tạo data mẫu...\n');

        // 1. Tạo supplier
        console.log('Tạo nhà cung cấp...');
        await connection.execute(
            `INSERT IGNORE INTO supplier (id, name, phone, address, deleted) 
             VALUES (1, 'Nhà Cung Cấp ABC', '0987654321', 'Hà Nội', 0),
                    (2, 'Nhà Cung Cấp XYZ', '0912345678', 'TP.HCM', 0)`
        );

        // 2. Tạo materials
        console.log('Tạo nguyên liệu...');
        await connection.execute(
            `INSERT IGNORE INTO material (id, name, unit, remain, supplier_id, deleted) 
             VALUES (1, 'Cà phê hạt', 'kg', 50, 1, 0),
                    (2, 'Sữa tươi', 'lít', 30, 1, 0),
                    (3, 'Đường', 'kg', 20, 2, 0),
                    (4, 'Trà xanh', 'kg', 15, 2, 0),
                    (5, 'Ly nhựa', 'cái', 500, 2, 0)`
        );

        // 3. Tạo products
        console.log('Tạo sản phẩm...');
        await connection.execute(
            `INSERT IGNORE INTO product (id, name, category, price, unit, image, deleted) 
             VALUES (1, 'Cà phê đen', 'Coffee', 25000, 'cup', 'cafe-den.jpg', 0),
                    (2, 'Cà phê sữa', 'Coffee', 30000, 'cup', 'cafe-sua.jpg', 0),
                    (3, 'Trà sữa', 'Tea', 35000, 'cup', 'tra-sua.jpg', 0),
                    (4, 'Trà xanh', 'Tea', 20000, 'cup', 'tra-xanh.jpg', 0)`
        );

        // 4. Tạo recipes
        console.log('Tạo công thức...');
        await connection.execute(
            `INSERT IGNORE INTO recipe (product_id, material_id, quantity) 
             VALUES (1, 1, 0.02),
                    (2, 1, 0.02),
                    (2, 2, 0.1),
                    (2, 3, 0.01),
                    (3, 4, 0.01),
                    (3, 2, 0.15),
                    (3, 3, 0.02),
                    (4, 4, 0.015)`
        );

        console.log('\n✅ Data mẫu đã được tạo!');
        console.log('\n📦 Đã tạo:');
        console.log('   - 2 nhà cung cấp');
        console.log('   - 5 nguyên liệu');
        console.log('   - 4 sản phẩm');
        console.log('   - Công thức cho các sản phẩm\n');

    } catch (error) {
        console.error('❌ Lỗi:', error.message);
    } finally {
        await connection.end();
    }
}

seedSampleData();
