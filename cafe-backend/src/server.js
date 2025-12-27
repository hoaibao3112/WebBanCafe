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

// API Routes (to be implemented)
// app.use('/api/auth', require('./routes/auth.routes'));
// app.use('/api/products', require('./routes/product.routes'));
// app.use('/api/materials', require('./routes/material.routes'));
// app.use('/api/warehouse', require('./routes/warehouse.routes'));
// app.use('/api/sales', require('./routes/sale.routes'));
// app.use('/api/users', require('./routes/user.routes'));
// app.use('/api/roles', require('./routes/role.routes'));
// app.use('/api/dashboard', require('./routes/dashboard.routes'));

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal server error',
        ...(config.env === 'development' && { stack: err.stack })
    });
});

// Start server
const PORT = config.port;

const startServer = async () => {
    try {
        // Test database connection
        await testConnection();

        // Sync database models (in development)
        // await require('./models').sequelize.sync({ alter: true });

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
