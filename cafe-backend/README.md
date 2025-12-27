# Cafe Backend API

Backend API for Cafe Management System built with Node.js, Express, and MySQL.

## 📁 Folder Structure

```
cafe-backend/
├── src/
│   ├── config/           # Configuration files
│   │   ├── app.config.js
│   │   └── database.js
│   ├── routes/           # API route definitions
│   ├── controllers/      # Request handlers
│   ├── services/         # Business logic
│   ├── middlewares/      # Custom middleware
│   │   ├── auth.middleware.js
│   │   ├── permission.middleware.js
│   │   ├── validate.middleware.js
│   │   └── upload.middleware.js
│   ├── models/           # Sequelize models
│   └── utils/            # Helper functions
│       ├── ApiResponse.js
│       ├── dateHelper.js
│       └── pagination.js
├── uploads/              # File uploads directory
├── .env                  # Environment variables
└── package.json
```

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
# Edit .env with your database credentials
```

### 3. Create database
```sql
CREATE DATABASE cafe_management CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 4. Run development server
```bash
npm run dev
```

The server will start on http://localhost:5000

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user
- `POST /api/auth/refresh` - Refresh token
- `POST /api/auth/logout` - Logout

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Materials
- `GET /api/materials` - Get all materials
- `POST /api/materials` - Create material
- `PUT /api/materials/:id` - Update material
- `DELETE /api/materials/:id` - Delete material

### Warehouse
- `POST /api/warehouse/import` - Import materials
- `GET /api/warehouse/imports` - Get import history
- `POST /api/warehouse/export` - Export materials
- `GET /api/warehouse/exports` - Get export history
- `GET /api/warehouse/inventory` - Get current inventory

### Sales
- `POST /api/sales/receipt` - Create receipt
- `GET /api/sales/receipts` - Get all receipts
- `GET /api/sales/receipts/:id` - Get receipt details
- `GET /api/sales/revenue` - Get revenue statistics

### Users & Roles
- `GET /api/users` - Get all users
- `POST /api/users` - Create user
- `GET /api/roles` - Get all roles
- `POST /api/permissions/update` - Update permissions

### Dashboard
- `GET /api/dashboard/stats` - Get statistics
- `GET /api/dashboard/revenue` - Get revenue data
- `GET /api/dashboard/top-products` - Get top products
- `GET /api/dashboard/low-inventory` - Get low stock alerts

## 🔒 Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## 🛠️ Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests
- `npm run migrate` - Run database migrations
- `npm run seed` - Seed database with sample data

## 📝 Environment Variables

See `.env.example` for all available environment variables.

## 🧪 Testing

```bash
npm test
```

## 📄 License

MIT
