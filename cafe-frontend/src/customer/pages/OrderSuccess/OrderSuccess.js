import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CopyOutlined, CheckCircleFilled } from '@ant-design/icons';
import { message } from 'antd';
import './OrderSuccess.css';

const OrderSuccess = () => {
    const location = useLocation();
    const orderData = location.state?.order || {
        id: 'DH12345678',
        items: [
            {
                id: 1,
                name: 'Trà Sữa Truyền Thống',
                options: '70% đường, 50% đá',
                quantity: 1,
                price: 45000,
                image: 'https://images.unsplash.com/photo-1558857563-b371033873b8?w=100'
            },
            {
                id: 2,
                name: 'Matcha Latte',
                options: '100% đường, 70% đá, Thêm trân châu',
                quantity: 1,
                price: 55000,
                image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=100'
            }
        ],
        subtotal: 100000,
        shippingFee: 15000,
        total: 115000,
        delivery: {
            name: 'Nguyễn Văn A',
            phone: '0901234567',
            address: '123 Đường ABC, Phường X, Quận Y, TP. Hồ Chí Minh'
        },
        paymentMethod: 'Thanh toán khi nhận hàng (COD)',
        estimatedTime: '25-35 phút'
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
    };

    const copyOrderId = () => {
        navigator.clipboard.writeText(orderData.id);
        message.success('Đã sao chép mã đơn hàng!');
    };

    return (
        <div className="order-success-page">
            {/* Hero illustration */}
            <div className="success-hero">
                <div className="hero-bg"></div>
                <div className="hero-image">
                    <img 
                        src="https://images.unsplash.com/photo-1558857563-b371033873b8?w=300" 
                        alt="Boba Tea" 
                    />
                </div>
            </div>

            <div className="success-container">
                <div className="success-card">
                    {/* Success Header */}
                    <div className="success-header">
                        <CheckCircleFilled className="success-icon" />
                        <h1>Đặt hàng thành công!</h1>
                        <p>Cảm ơn bạn đã đặt hàng! Đơn hàng của bạn đang được chuẩn bị.</p>
                    </div>

                    {/* Order ID */}
                    <div className="order-id-section">
                        <span className="label">Mã đơn hàng:</span>
                        <span className="order-id">#{orderData.id}</span>
                        <button className="copy-btn" onClick={copyOrderId}>
                            <CopyOutlined /> Sao chép
                        </button>
                    </div>

                    {/* Order Details */}
                    <div className="order-details">
                        <h3>Chi tiết đơn hàng</h3>
                        
                        <div className="order-items">
                            {orderData.items.map(item => (
                                <div key={item.id} className="order-item">
                                    <div className="item-image">
                                        <img src={item.image} alt={item.name} />
                                    </div>
                                    <div className="item-info">
                                        <h4>{item.name}</h4>
                                        <p className="item-options">{item.options}</p>
                                        <p className="item-qty">Số lượng: {item.quantity}</p>
                                    </div>
                                    <div className="item-price">
                                        {formatPrice(item.price * item.quantity)}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Totals */}
                        <div className="order-totals">
                            <div className="total-row">
                                <span>Tạm tính</span>
                                <span>{formatPrice(orderData.subtotal)}</span>
                            </div>
                            <div className="total-row">
                                <span>Phí giao hàng</span>
                                <span>{formatPrice(orderData.shippingFee)}</span>
                            </div>
                            <div className="total-row final">
                                <span>Tổng cộng</span>
                                <span className="final-price">{formatPrice(orderData.total)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Info Cards */}
                    <div className="info-cards">
                        <div className="info-card">
                            <h4>Địa chỉ giao hàng</h4>
                            <p className="highlight">{orderData.delivery.name}</p>
                            <p>{orderData.delivery.phone}</p>
                            <p>{orderData.delivery.address}</p>
                        </div>
                        <div className="info-card">
                            <h4>Phương thức thanh toán</h4>
                            <p className="highlight">{orderData.paymentMethod}</p>
                        </div>
                        <div className="info-card">
                            <h4>Thời gian giao hàng dự kiến</h4>
                            <p className="highlight">Dự kiến giao trong {orderData.estimatedTime}</p>
                        </div>
                    </div>

                    {/* Contact Note */}
                    <p className="contact-note">
                        Vui lòng giữ điện thoại để tài xế liên hệ bạn nhé.
                    </p>

                    {/* Action Buttons */}
                    <div className="action-buttons">
                        <Link to="/menu" className="btn btn-primary">
                            Tiếp tục mua sắm
                        </Link>
                        <Link to="/account" className="btn btn-secondary">
                            Xem lịch sử đơn hàng
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
