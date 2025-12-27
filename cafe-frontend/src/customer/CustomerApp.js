import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CustomerLayout from './components/Layout/CustomerLayout';
import Home from './pages/Home/Home';
import Menu from './pages/Menu/Menu';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import Account from './pages/Account/Account';
import OrderSuccess from './pages/OrderSuccess/OrderSuccess';
import './customer.css';

const CustomerApp = () => {
    return (
        <CustomerLayout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/account" element={<Account />} />
                <Route path="/order-success" element={<OrderSuccess />} />
            </Routes>
        </CustomerLayout>
    );
};

export default CustomerApp;
