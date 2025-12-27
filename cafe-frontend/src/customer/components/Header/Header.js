import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCartOutlined, UserOutlined, SearchOutlined, MenuOutlined, CloseOutlined, BellOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
import { useSelector } from 'react-redux';
import './Header.css';

const Header = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const cartItems = useSelector(state => state.cart?.items || []);
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/menu?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <header className="header">
            <div className="header-container">
                <Link to="/" className="logo">
                    <span className="logo-icon">🧋</span>
                    <span className="logo-text">Boba Time</span>
                </Link>

                <nav className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
                    <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                        Trang Chủ
                    </Link>
                    <Link to="/menu" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                        Thực Đơn
                    </Link>
                    <Link to="/promotions" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                        Khuyến Mãi
                    </Link>
                    <Link to="/about" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                        Về Chúng Tôi
                    </Link>
                </nav>

                <div className="header-actions">
                    <form className="search-box" onSubmit={handleSearch}>
                        <SearchOutlined className="search-icon" />
                        <input
                            type="text"
                            placeholder="Tìm món..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </form>

                    <Link to="/cart" className="action-btn cart-btn">
                        <Badge count={cartCount} size="small" offset={[-2, 2]}>
                            <ShoppingCartOutlined />
                        </Badge>
                    </Link>

                    <button className="action-btn notification-btn">
                        <BellOutlined />
                    </button>

                    <Link to="/account" className="action-btn user-btn">
                        <UserOutlined />
                    </Link>

                    <button 
                        className="mobile-menu-btn"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
