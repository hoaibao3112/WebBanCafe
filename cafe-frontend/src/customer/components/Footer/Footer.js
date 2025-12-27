import React from 'react';
import { Link } from 'react-router-dom';
import { InstagramOutlined, FacebookOutlined, TwitterOutlined } from '@ant-design/icons';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-brand">
                    <div className="footer-logo">
                        <span className="logo-icon">🧋</span>
                        <span className="logo-text">Boba Joy</span>
                    </div>
                    <p className="footer-tagline">
                        Niềm vui mỗi ngày, ngọt ngào trong từng ngụm trà.
                    </p>
                </div>

                <div className="footer-links">
                    <div className="footer-column">
                        <h4>Khám Phá</h4>
                        <ul>
                            <li><Link to="/menu">Thực đơn</Link></li>
                            <li><Link to="/promotions">Khuyến mãi</Link></li>
                            <li><Link to="/stores">Cửa hàng</Link></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h4>Theo Dõi</h4>
                        <ul>
                            <li>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                    <InstagramOutlined /> Instagram
                                </a>
                            </li>
                            <li>
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                    <FacebookOutlined /> Facebook
                                </a>
                            </li>
                            <li>
                                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                                    <TwitterOutlined /> Tiktok
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h4>Pháp Lý</h4>
                        <ul>
                            <li><Link to="/privacy">Chính sách bảo mật</Link></li>
                            <li><Link to="/terms">Điều khoản dịch vụ</Link></li>
                            <li><Link to="/faq">FAQ</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© 2024 Boba Joy™. Đã đăng ký bản quyền.</p>
            </div>
        </footer>
    );
};

export default Footer;
