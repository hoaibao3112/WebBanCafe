import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/Layout/AdminLayout';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import OrderManagement from './pages/OrderManagement/OrderManagement';
import ProductManagement from './pages/ProductManagement/ProductManagement';
import PromotionManagement from './pages/PromotionManagement/PromotionManagement';
import CustomerManagement from './pages/CustomerManagement/CustomerManagement';
import './App.css';

// Simple auth check - replace with proper auth logic
const isAuthenticated = () => {
    return localStorage.getItem('adminToken') !== null;
};

const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/login" element={<Login />} />
                
                <Route path="/*" element={
                    <ProtectedRoute>
                        <AdminLayout>
                            <Routes>
                                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                                <Route path="/dashboard" element={<Dashboard />} />
                                <Route path="/orders" element={<OrderManagement />} />
                                <Route path="/products" element={<ProductManagement />} />
                                <Route path="/promotions" element={<PromotionManagement />} />
                                <Route path="/customers" element={<CustomerManagement />} />
                            </Routes>
                        </AdminLayout>
                    </ProtectedRoute>
                } />
            </Routes>
        </div>
    );
}

export default App;
