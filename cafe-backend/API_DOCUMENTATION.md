# Cafe Management Backend - API Documentation

## 🔐 Authentication

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": 1,
      "username": "admin",
      "roleId": 1,
      "roleName": "ADMIN",
      "staffId": 1,
      "staffName": "Admin User"
    }
  },
  "message": "Login successful"
}
```

### Get Current User
```http
GET /api/auth/me
Authorization: Bearer {token}
```

---

## 👥 Staff Management

### Create Staff
```http
POST /api/admin/staff
Authorization: Bearer {token}
Content-Type: application/json

{
  "no": "ST002",
  "name": "John Doe",
  "gender": true,
  "birthdate": "1990-01-15",
  "phone": "0987654321",
  "email": "john@cafe.com",
  "address": "123 Main St",
  "hourlyWage": 40000
}
```

### Get All Staff
```http
GET /api/admin/staff?search=John
Authorization: Bearer {token}
```

### Update Staff
```http
PUT /api/admin/staff/2
Authorization: Bearer {token}
Content-Type: application/json

{
  "hourlyWage": 45000
}
```

### Delete Staff
```http
DELETE /api/admin/staff/2
Authorization: Bearer {token}
```

---

## 🔑 Account Management

### Create Account
```http
POST /api/admin/accounts
Authorization: Bearer {token}
Content-Type: application/json

{
  "username": "staff001",
  "password": "password123",
  "staffId": 2,
  "roleId": 2
}
```

### Get All Accounts
```http
GET /api/admin/accounts
Authorization: Bearer {token}
```

---

## ☕ Product Management

### Create Product with Recipe
```http
POST /api/admin/products
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Cappuccino",
  "category": "Coffee",
  "price": 45000,
  "unit": "cup",
  "image": "cappuccino.jpg",
  "recipes": [
    {
      "materialId": 1,
      "quantity": 0.02
    },
    {
      "materialId": 2,
      "quantity": 0.15
    }
  ]
}
```

### Get All Products
```http
GET /api/admin/products?category=Coffee&search=cap
Authorization: Bearer {token}
```

### Update Product
```http
PUT /api/admin/products/1
Authorization: Bearer {token}
Content-Type: application/json

{
  "price": 50000,
  "recipes": [
    {
      "materialId": 1,
      "quantity": 0.025
    }
  ]
}
```

### Update Product Status
```http
PUT /api/admin/products/1/status
Authorization: Bearer {token}
Content-Type: application/json

{
  "deleted": false
}
```

### Get Categories
```http
GET /api/admin/products/categories/list
Authorization: Bearer {token}
```

---

## 📦 Material Management

### Create Material
```http
POST /api/admin/materials
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Coffee Beans",
  "supplierId": 1,
  "unit": "kg",
  "remain": 0
}
```

### Get All Materials
```http
GET /api/admin/materials?search=coffee
Authorization: Bearer {token}
```

### Get Low Stock
```http
GET /api/admin/materials/low-stock/list?threshold=10
Authorization: Bearer {token}
```

---

## 🏭 Warehouse Operations

### Import Materials
```http
POST /api/admin/warehouse/import
Authorization: Bearer {token}
Content-Type: application/json

{
  "staffId": 1,
  "receivedDate": "2024-01-31",
  "shipments": [
    {
      "materialId": 1,
      "quantity": 100,
      "unitPrice": 200000,
      "mfg": "2024-01-01",
      "exp": "2024-12-31"
    }
  ]
}
```

### Export Materials
```http
POST /api/admin/warehouse/export
Authorization: Bearer {token}
Content-Type: application/json

{
  "staffId": 1,
  "invoiceDate": "2024-01-31",
  "reason": "Damaged goods",
  "exports": [
    {
      "materialId": 1,
      "quantity": 5
    }
  ]
}
```

### Get Import History
```http
GET /api/admin/warehouse/imports?startDate=2024-01-01&endDate=2024-01-31
Authorization: Bearer {token}
```

### Get Export History
```http
GET /api/admin/warehouse/exports
Authorization: Bearer {token}
```

### Get Current Inventory
```http
GET /api/admin/warehouse/inventory
Authorization: Bearer {token}
```

---

## 🧾 Receipt/Order Management

### Create Receipt (Order)
```http
POST /api/admin/receipts
Authorization: Bearer {token}
Content-Type: application/json

{
  "staffId": 1,
  "items": [
    {
      "productId": 1,
      "quantity": 2,
      "price": 45000
    },
    {
      "productId": 2,
      "quantity": 1,
      "price": 35000
    }
  ],
  "received": 150000
}
```

**Note:** Creating a receipt automatically:
- Deducts materials based on product recipes (FIFO)
- Calculates total and change
- Validates sufficient stock

### Get All Receipts
```http
GET /api/admin/receipts?startDate=2024-01-01&endDate=2024-01-31&staffId=1
Authorization: Bearer {token}
```

### Get Receipt Details
```http
GET /api/admin/receipts/1
Authorization: Bearer {token}
```

---

## 💰 Revenue Statistics

### Get Revenue
```http
GET /api/admin/revenue?startDate=2024-01-01&endDate=2024-01-31
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalRevenue": 5000000,
    "orderCount": 120,
    "averageOrderValue": 41666.67,
    "startDate": "2024-01-01",
    "endDate": "2024-01-31"
  }
}
```

---

## 🎁 Promotion Management

### Create Promotion
```http
POST /api/admin/promotions
Authorization: Bearer {token}
Content-Type: application/json

{
  "startDate": "2024-02-01",
  "endDate": "2024-02-14",
  "status": true,
  "products": [
    {
      "productId": 1,
      "percent": 20
    },
    {
      "productId": 2,
      "percent": 15
    }
  ]
}
```

### Get All Promotions
```http
GET /api/admin/promotions
Authorization: Bearer {token}
```

### Update Promotion Status
```http
PUT /api/admin/promotions/1/status
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": false
}
```

---

## 📊 Dashboard & Analytics

### Get Dashboard Summary
```http
GET /api/admin/dashboard/summary
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalRevenue": 50000000,
    "orderCount": 1250,
    "todayRevenue": 500000,
    "todayOrderCount": 15,
    "topProducts": [...],
    "lowStockCount": 3,
    "lowStockItems": [...]
  }
}
```

### Get Top Products
```http
GET /api/admin/dashboard/top-products?limit=10
Authorization: Bearer {token}
```

### Get Detailed Report
```http
GET /api/admin/dashboard/report?startDate=2024-01-01&endDate=2024-01-31
Authorization: Bearer {token}
```

**Response includes:**
- Total revenue and order count
- Top products by date range
- Daily revenue breakdown

---

## 🔧 Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Database
Edit `.env`:
```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=cafe
DB_USER=root
DB_PASSWORD=your_password
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=24h
NODE_ENV=development
PORT=5000
```

### 3. Import Database Schema
```bash
mysql -u root -p cafe < cafe.sql
```

### 4. Seed Initial Data
```bash
npm run seed
```

This creates:
- Admin account (username: `admin`, password: `admin123`)
- ADMIN and STAFF roles
- Modules and functions for permission system

### 5. Run Development Server
```bash
npm run dev
```

Server runs on http://localhost:5000

---

## 📝 Business Logic

### Order Processing
1. Validate product availability
2. Calculate total price
3. For each product ordered:
   - Get product recipe
   - For each ingredient in recipe:
     - Calculate required quantity
     - Deduct from shipments using FIFO
     - Update material stock
4. Create receipt and receipt details
5. Calculate change

### Inventory Management
- **FIFO (First In, First Out)**: Materials are deducted from oldest shipments first
- **Batch Tracking**: Each import creates shipments with expiration dates
- **Low Stock Alerts**: Automatic detection when stock < threshold
- **Soft Delete**: Products, materials, staff can be soft-deleted

### Permission System
- **ADMIN**: Full access to all modules
- **STAFF**: Limited access based on decentralization table
- Each module-function combination can be assigned to roles

---

## ⚠️ Error Handling

All endpoints return consistent error format:

```json
{
  "success": false,
  "message": "Error description"
}
```

Common HTTP status codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request / Validation Error
- `401`: Unauthorized (invalid/missing token)
- `403`: Forbidden (insufficient permissions)
- `404`: Not Found
- `409`: Conflict (duplicate resource)
- `500`: Internal Server Error

---

## 🔒 Authentication

All `/api/admin/*` endpoints require:
1. Valid JWT token in `Authorization: Bearer {token}` header
2. Appropriate role (ADMIN or STAFF depending on endpoint)

Token expires after 24 hours (configurable via `JWT_EXPIRES_IN`)
