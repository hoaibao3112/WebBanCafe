import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import MainLayout from './components/Layout/MainLayout';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import CustomerApp from './customer/CustomerApp';
import './App.css';

function App() {
    return (
        <div className="App">
            <Routes>
                {/* Customer-facing routes */}
                <Route path="/*" element={<CustomerApp />} />

                {/* Admin login */}
                <Route path="/admin/login" element={<Login />} />

                {/* Admin protected routes */}
                <Route
                    path="/admin/*"
                    element={
                        <ProtectedRoute>
                            <MainLayout>
                                <Routes>
                                    <Route path="/dashboard" element={<Dashboard />} />
                                    <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />

                                    {/* Product routes - to be implemented */}
                                    {/* <Route path="/products" element={<Products />} /> */}
                                    {/* <Route path="/materials" element={<Materials />} /> */}

                                    {/* Warehouse routes - to be implemented */}
                                    {/* <Route path="/warehouse/import" element={<Import />} /> */}
                                    {/* <Route path="/warehouse/export" element={<Export />} /> */}

                                    {/* POS routes - to be implemented */}
                                    {/* <Route path="/pos" element={<POS />} /> */}

                                    {/* User management - to be implemented */}
                                    {/* <Route path="/users" element={<Users />} /> */}
                                    {/* <Route path="/roles" element={<Roles />} /> */}
                                </Routes>
                            </MainLayout>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
