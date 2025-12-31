const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

async function updatePasswords() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'kimloan12345',
        database: 'quanlycafe'
    });

    try {
        console.log('🔗 Kết nối database...\n');

        // Hash password cho user1
        const hashedUser1 = await bcrypt.hash('123456', 10);
        await connection.execute(
            'UPDATE account SET password = ? WHERE username = ?',
            [hashedUser1, 'user1']
        );
        console.log('✅ Updated user1 password (123456)');

        // Hash password cho các user khác
        for (let i = 2; i <= 5; i++) {
            const username = `user${i}`;
            const plainPassword = i === 2 ? 'pass456' : i === 3 ? 'pass789' : i === 4 ? 'passabc' : 'passdef';
            const hashed = await bcrypt.hash(plainPassword, 10);

            await connection.execute(
                'UPDATE account SET password = ? WHERE username = ?',
                [hashed, username]
            );
            console.log(`✅ Updated ${username} password (${plainPassword})`);
        }

        // Tạo admin nếu chưa có (với password hash)
        const hashedAdmin = await bcrypt.hash('admin123', 10);
        await connection.execute(
            `UPDATE account SET password = ? WHERE username = 'admin'`,
            [hashedAdmin]
        );
        console.log('✅ Updated admin password (admin123)');

        console.log('\n🎉 PASSWORD ĐÃ ĐƯỢC HASH!');
        console.log('\n📝 Tài khoản login:');
        console.log('   user1 / 123456');
        console.log('   admin / admin123\n');

    } catch (error) {
        console.error('❌ Lỗi:', error.message);
    } finally {
        await connection.end();
    }
}

updatePasswords();
