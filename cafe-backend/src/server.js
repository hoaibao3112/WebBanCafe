const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const config = require('./config/app.config');
const { testConnection } = require('./config/database');

// Initialize express app
const app = express();

// Security middleware
app.use(helmet());

// CORS middleware
app.use(cors(config.cors));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Compression middleware
app.use(compression());

// Logging middleware
if (config.env === 'development') {
    app.use(morgan('dev'));
}

// Static files
app.use('/uploads', express.static('uploads'));

// Health check route
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Cafe Management API is running',
        timestamp: new Date().toISOString(),
        environment: config.env
    });
});

// API Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/admin/staff', require('./routes/staff.routes'));
app.use('/api/admin/accounts', require('./routes/account.routes'));
app.use('/api/admin/products', require('./routes/product.routes'));
app.use('/api/admin/materials', require('./routes/material.routes'));
app.use('/api/admin/warehouse', require('./routes/warehouse.routes'));
app.use('/api/admin/receipts', require('./routes/receipt.routes'));
app.use('/api/admin/revenue', require('./routes/revenue.routes'));
app.use('/api/admin/promotions', require('./routes/promotion.routes'));
app.use('/api/admin/dashboard', require('./routes/dashboard.routes'));

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);

    // Handle custom errors
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';

    res.status(statusCode).json({
        success: false,
        message,
        ...(config.env === 'development' && {
            stack: err.stack,
            error: err
        })
    });
});

// Start server
const PORT = config.port;

const startServer = async () => {
    try {
        // Test database connection
        await testConnection();

        // Sync database models (in development only)
        if (config.env === 'development') {
            console.log('⚙️  Syncing database models...');
            await require('./models').sequelize.sync({ alter: false });
            console.log('✅ Models synced successfully');
        }

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`📝 Environment: ${config.env}`);
            console.log(`🔗 Health check: http://localhost:${PORT}/health`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();

module.exports = app;
