const { Sequelize } = require('sequelize');
const config = require('./app.config');

const sequelize = new Sequelize(config.database);

// Test database connection
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connection established successfully.');
    } catch (error) {
        console.error('❌ Unable to connect to the database:', error.message);
        process.exit(1);
    }
};

module.exports = { sequelize, testConnection };
