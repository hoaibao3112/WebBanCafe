# WebBanCafe

☕ Cafe Management System

A comprehensive cafe management system built with **ReactJS**, **NodeJS**, **Express**, and **MySQL**.

## 🚀 Features

### 📊 Core Modules
- **Authentication & Authorization** - JWT-based login with role-based access control
- **Product Management** - Manage products, recipes, and pricing
- **Material Management** - Track ingredients and supplies
- **Warehouse Management** - Import/Export with FIFO inventory tracking
- **Point of Sale (POS)** - Fast sales interface with discount management
- **Dashboard & Analytics** - Real-time statistics and insights
- **User & Role Management** - Flexible permission system

### 🔐 Security Features
- JWT token authentication
- Role-based access control (RBAC)
- Module & function-level permissions
- Protected routes on both FE & BE

## 📁 Project Structure
```
webcafe/
├── cafe-backend/ # NodeJS + Express API
│   ├── src/
│   │   ├── config/ # Database & app configuration
│   │   ├── routes/ # API route definitions
│   │   ├── controllers/ # Request handlers
│   │   ├── services/ # Business logic layer
│   │   ├── middlewares/ # Auth, validation, error handling
│   │   ├── models/ # Sequelize models
│   │   └── utils/ # Helper functions
│   ├── .env # Environment variables
│   └── package.json # Dependencies
├── cafe-frontend/ # ReactJS Application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/ # Page components
│   │   ├── routes/ # Route configuration
│   │   ├── store/ # Redux/Zustand state management
│   │   ├── services/ # API service layer
│   │   ├── utils/ # Helper functions
│   │   └── assets/ # Images, styles
│   ├── .env # Environment variables
│   └── package.json # Dependencies
└── package.json
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **React Router v6** - Client-side routing
- **Redux Toolkit / Zustand** - State management
- **Ant Design / Material UI** - UI components
- **Axios** - HTTP client
- **Chart.js / Recharts** - Data visualization

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **Sequelize** - ORM for MySQL
- **MySQL 8** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **cors** - Cross-origin resource sharing

## 📋 Prerequisites

Before you begin, ensure you have installed:

- **Node.js** (v16 or higher)
- **MySQL** (v8 or higher)
- **Git**
- **VSCode** (recommended)

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/hoaibao3112/WebBanCafe.git
cd webcafe
```

### 2. Setup Backend
```bash
cd cafe-backend
npm install
cp .env.example .env # Edit .env with your database credentials
npm run dev
```

### 3. Setup Frontend
```bash
cd cafe-frontend
npm install
cp .env.example .env # Edit .env with your API URL
npm start
```

### 4. Database Setup
```bash
# Create database
mysql -u root -p
CREATE DATABASE cafe_management;
# Run migrations (to be implemented)
cd cafe-backend
npm run migrate
```

## 📚 Documentation
- [Database Schema & ERD](./docs/DATABASE.md)
- [API Documentation](./docs/API.md)
- [Frontend Architecture](./docs/FRONTEND.md)
- [Permission System](./docs/PERMISSIONS.md)

## 🔑 Default Credentials

**Admin Account:**
- Username: `admin`
- Password: `admin123`

**Staff Account:**
- Username: `staff`
- Password: `staff123`

> ⚠️ **Important:** Change these credentials in production!

## 🧪 Testing

### Backend Tests
```bash
cd cafe-backend
npm test
```

### Frontend Tests
```bash
cd cafe-frontend
npm test
```

## 📦 Deployment

### Frontend (Vercel/Netlify)
```bash
cd cafe-frontenda
npm run build # Deploy the 'build' folder
```

### Backend (Render/Railway)
```bash
cd cafe-backend
# Configure environment variables in your platform
# Set start command: npm start
```

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors
- **Your Name** - Initial work

## 🙏 Acknowledgments
- Thanks to all contributors
- Inspired by modern POS systems
- Built with ❤️ for cafe owners

---

**Made with ☕ and ❤️**
# ☕ Cafe Management System

A comprehensive cafe management system built with **ReactJS**, **NodeJS**, **Express**, and **MySQL**.

## 🚀 Features

### 📊 Core Modules
- **Authentication & Authorization** - JWT-based login with role-based access control
- **Product Management** - Manage products, recipes, and pricing
- **Material Management** - Track ingredients and supplies
- **Warehouse Management** - Import/Export with FIFO inventory tracking
- **Point of Sale (POS)** - Fast sales interface with discount management
- **Dashboard & Analytics** - Real-time statistics and insights
- **User & Role Management** - Flexible permission system

### 🔐 Security Features
- JWT token authentication
- Role-based access control (RBAC)
- Module & function-level permissions
- Protected routes on both FE & BE

## 📁 Project Structure

```
webcafe/
├── cafe-backend/          # NodeJS + Express API
│   ├── src/
│   │   ├── config/        # Database & app configuration
│   │   ├── routes/        # API route definitions
│   │   ├── controllers/   # Request handlers
│   │   ├── services/      # Business logic layer
│   │   ├── middlewares/   # Auth, validation, error handling
│   │   ├── models/        # Sequelize models
│   │   └── utils/         # Helper functions
│   ├── .env               # Environment variables
│   └── package.json       # Dependencies
│
└── cafe-frontend/         # ReactJS Application
    ├── src/
    │   ├── components/    # Reusable UI components
    │   ├── pages/         # Page components
    │   ├── routes/        # Route configuration
    │   ├── store/         # Redux/Zustand state management
    │   ├── services/      # API service layer
    │   ├── utils/         # Helper functions
    │   └── assets/        # Images, styles
    ├── .env               # Environment variables
    └── package.json       # Dependencies
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **React Router v6** - Client-side routing
- **Redux Toolkit / Zustand** - State management
- **Ant Design / Material UI** - UI components
- **Axios** - HTTP client
- **Chart.js / Recharts** - Data visualization

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **Sequelize** - ORM for MySQL
- **MySQL 8** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **cors** - Cross-origin resource sharing

## 📋 Prerequisites

Before you begin, ensure you have installed:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MySQL** (v8 or higher) - [Download](https://dev.mysql.com/downloads/)
- **Git** - [Download](https://git-scm.com/)
- **VSCode** (recommended) - [Download](https://code.visualstudio.com/)

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd webcafe
```

### 2. Setup Backend
```bash
cd cafe-backend
npm install
cp .env.example .env
# Edit .env with your database credentials
npm run dev
```

### 3. Setup Frontend
```bash
cd cafe-frontend
npm install
cp .env.example .env
# Edit .env with your API URL
npm start
```

### 4. Database Setup
```bash
# Create database
mysql -u root -p
CREATE DATABASE cafe_management;

# Run migrations (to be implemented)
cd cafe-backend
npm run migrate
```

## 📚 Documentation

- [Database Schema & ERD](./docs/DATABASE.md)
- [API Documentation](./docs/API.md)
- [Frontend Architecture](./docs/FRONTEND.md)
- [Permission System](./docs/PERMISSIONS.md)

## 🔑 Default Credentials

**Admin Account:**
- Username: `admin`
- Password: `admin123`

**Staff Account:**
- Username: `staff`
- Password: `staff123`

> ⚠️ **Important:** Change these credentials in production!

## 🧪 Testing

### Backend Tests
```bash
cd cafe-backend
npm test
```

### Frontend Tests
```bash
cd cafe-frontend
npm test
```

## 📦 Deployment

### Frontend (Vercel/Netlify)
```bash
cd cafe-frontend
npm run build
# Deploy the 'build' folder
```

### Backend (Render/Railway)
```bash
cd cafe-backend
# Configure environment variables in your platform
# Set start command: npm start
```

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

- **Your Name** - Initial work

## 🙏 Acknowledgments

- Thanks to all contributors
- Inspired by modern POS systems
- Built with ❤️ for cafe owners

---

**Made with ☕ and ❤️**
#   W e b B a n C a f e 
 

 
