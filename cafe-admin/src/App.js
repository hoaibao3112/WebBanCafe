import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './components/Layout/MainLayout';

// Pages
import Login from './pages/Auth/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import StaffList from './pages/Staff/StaffList';
import AccountList from './pages/Accounts/AccountList';
import ProductList from './pages/Products/ProductList';
import MaterialList from './pages/Materials/MaterialList';
import ImportMaterials from './pages/Warehouse/ImportMaterials';
import CurrentInventory from './pages/Warehouse/CurrentInventory';
import CreateReceipt from './pages/Receipts/CreateReceipt';
import PromotionList from './pages/Promotions/PromotionList';

function App() {
    return (
        <AuthProvider>
            <Routes>
                {/* Public route */}
                <Route path="/login" element={<Login />} />

                {/* Protected routes */}
                <Route path="/" element={
                    <ProtectedRoute>
                        <MainLayout />
                    </ProtectedRoute>
                }>
                    <Route index element={<Dashboard />} />
                    <Route path="staff" element={<StaffList />} />
                    <Route path="accounts" element={<AccountList />} />
                    <Route path="products" element={<ProductList />} />
                    <Route path="materials" element={<MaterialList />} />
                    <Route path="warehouse/import" element={<ImportMaterials />} />
                    <Route path="warehouse/inventory" element={<CurrentInventory />} />
                    <Route path="receipts" element={<CreateReceipt />} />
                    <Route path="promotions" element={<PromotionList />} />
                </Route>

                {/* Redirect to dashboard */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </AuthProvider>
    );
}

export default App;
