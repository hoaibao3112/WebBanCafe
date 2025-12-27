# Cafe Frontend

Frontend application for Cafe Management System built with React, Redux Toolkit, and Ant Design.

## 📁 Folder Structure

```
cafe-frontend/
├── public/               # Static files
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/       # Reusable components
│   │   ├── Layout/
│   │   │   ├── MainLayout.js
│   │   │   └── MainLayout.css
│   │   └── ProtectedRoute.js
│   ├── pages/           # Page components
│   │   ├── Login.js
│   │   ├── Dashboard.js
│   │   └── ...
│   ├── store/           # Redux store
│   │   ├── index.js
│   │   └── slices/
│   │       └── authSlice.js
│   ├── services/        # API services
│   │   ├── api.js
│   │   └── authService.js
│   ├── utils/           # Utility functions
│   ├── assets/          # Images, fonts, etc.
│   ├── App.js           # Main App component
│   ├── App.css
│   ├── index.js         # Entry point
│   └── index.css        # Global styles
├── .env                 # Environment variables
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
# Edit .env with your API URL
```

Default `.env`:
```
REACT_APP_API_URL=http://localhost:5000/api
```

### 3. Run development server
```bash
npm start
```

The app will open at http://localhost:3000

## 📦 Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App (⚠️ irreversible)

## 🎨 UI Components

This project uses **Ant Design** for UI components. Key features:
- Pre-built responsive components
- Vietnamese localization (vi_VN)
- Customizable theme
- Icon library (@ant-design/icons)

## 🔐 Authentication Flow

1. User enters credentials on Login page
2. Redux dispatches `loginStart` action
3. Frontend calls `/api/auth/login` endpoint
4. On success:
   - Token and user info saved to localStorage
   - Redux state updated with `loginSuccess`
   - User redirected to Dashboard
5. All API requests include JWT token in Authorization header
6. ProtectedRoute guards authenticated routes

## 📱 Pages

### Implemented
- **Login** (`/login`) - Authentication page
- **Dashboard** (`/dashboard`) - Overview with statistics

### To be Implemented (Phase 3)
- **Products** (`/products`) - Product management
- **Materials** (`/materials`) - Material management
- **Warehouse Import** (`/warehouse/import`) - Import materials
- **Warehouse Export** (`/warehouse/export`) - Export materials
- **Inventory** (`/warehouse/inventory`) - Current stock
- **POS** (`/pos`) - Point of Sale interface
- **Users** (`/users`) - User management
- **Roles** (`/roles`) - Role & permission management
- **Settings** (`/settings`) - App settings

## 🔄 State Management

Redux Toolkit is used for state management:

**Slices:**
- `authSlice` - Authentication state (user, token, loading, error)

**Actions:**
- `loginStart` - Start login process
- `loginSuccess` - Login successful
- `loginFailure` - Login failed
- `logout` - User logout
- `setUser` - Update user info

## 🌐 API Integration

Axios is configured with:
- Base URL from environment variable
- Request timeout (10s default)
- Automatic token injection
- Response/Error interceptors
- 401 handling (auto redirect to login)

## 🎯 Features

### Current
- ✅ Login/Logout
- ✅ Protected routes
- ✅ Token-based authentication
- ✅ Responsive sidebar layout
- ✅ Dashboard with statistics cards

### Planned (Phase 3)
- Product CRUD with image upload
- Material management
- Warehouse import/export with FIFO
- POS interface with cart
- Discount application
- Receipt printing
- Real-time dashboard charts
- User & role management
- Permission-based UI hiding

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=build
```

## 🧪 Testing

```bash
npm test
```

## 📝 Code Style

- Use functional components with hooks
- File naming: PascalCase for components, camelCase for utilities
- One component per file
- CSS Modules or separate CSS files for styles
- PropTypes or TypeScript for type checking

## 📄 License

MIT
