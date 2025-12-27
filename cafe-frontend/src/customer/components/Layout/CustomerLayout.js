import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './CustomerLayout.css';

const CustomerLayout = ({ children }) => {
    return (
        <div className="customer-layout">
            <Header />
            <main className="main-content">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default CustomerLayout;
