const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

async function createAdminAccount() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'kimloan12345',
        database: 'quanlycafe'
    });

    try {
        console.log('🔗 Kết nối database...');

        // 1. Tạo role ADMIN
        console.log('Tạo role ADMIN...');
        await connection.execute(
            `INSERT IGNORE INTO role (id, name) VALUES (1, 'ADMIN'), (2, 'STAFF')`
        );

        // 2. Tạo staff admin
        console.log('Tạo staff admin...');
        const [staffResult] = await connection.execute(
            `INSERT INTO staff (no, name, gender, phone, email, deleted) 
             VALUES (?, ?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id)`,
            ['ST001', 'Admin User', 1, '0123456789', 'admin@cafe.com', 0]
        );

        const staffId = staffResult.insertId || 1;
        console.log(`✅ Staff ID: ${staffId}`);

        // 3. Hash password
        console.log('Hash password...');
        const hashedPassword = await bcrypt.hash('admin123', 10);

        // 4. Tạo account
        console.log('Tạo account admin...');
        await connection.execute(
            `INSERT INTO account (username, password, staff_id, role_id) 
             VALUES (?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE password=VALUES(password)`,
            ['admin', hashedPassword, staffId, 1]
        );

        console.log('\n🎉 THÀNH CÔNG! Tài khoản admin đã được tạo:');
        console.log('   Username: admin');
        console.log('   Password: admin123');
        console.log('   Role: ADMIN\n');

    } catch (error) {
        console.error('❌ Lỗi:', error.message);
    } finally {
        await connection.end();
    }
}

createAdminAccount();
