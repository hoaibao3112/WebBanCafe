import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../../../store/slices/cartSlice';
import './Checkout.css';

const Checkout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart?.items || []);
    
    const [expandedSections, setExpandedSections] = useState({
        delivery: true,
        shipping: false,
        payment: false,
    });

    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        address: '',
        shippingMethod: 'standard',
        paymentMethod: 'cod',
        promoCode: '',
    });

    const [promoApplied, setPromoApplied] = useState(false);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
    };

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingFee = formData.shippingMethod === 'express' ? 25000 : 15000;
    const discount = promoApplied ? subtotal * 0.1 : 0;
    const total = subtotal + shippingFee - discount;

    const handleApplyPromo = () => {
        if (formData.promoCode.toLowerCase() === 'giam10') {
            setPromoApplied(true);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Create order data
        const orderData = {
            id: 'DH' + Date.now().toString().slice(-8),
            items: cartItems.map(item => ({
                id: item.id,
                name: item.name,
                options: item.options ? `${item.options.sugar} đường, ${item.options.ice} đá` : '',
                quantity: item.quantity,
                price: item.price,
                image: item.image
            })),
            subtotal,
            shippingFee,
            total,
            delivery: {
                name: formData.fullName,
                phone: formData.phone,
                address: formData.address
            },
            paymentMethod: formData.paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng (COD)' : 
                          formData.paymentMethod === 'momo' ? 'Ví MoMo' : 'Chuyển khoản ngân hàng',
            estimatedTime: formData.shippingMethod === 'express' ? '15-20 phút' : '25-35 phút'
        };

        dispatch(clearCart());
        navigate('/order-success', { state: { order: orderData } });
    };

    if (cartItems.length === 0) {
        return (
            <div className="checkout-page">
                <div className="checkout-container">
                    <div className="empty-cart">
                        <h2>Giỏ hàng trống</h2>
                        <p>Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán.</p>
                        <Link to="/menu" className="btn-shop">Xem thực đơn</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-page">
            <div className="checkout-container">
                {/* Breadcrumb */}
                <div className="breadcrumb">
                    <Link to="/cart">Giỏ hàng</Link>
                    <span>/</span>
                    <span className="current">Thanh toán</span>
                    <span>/</span>
                    <span>Hoàn tất</span>
                </div>

                <h1 className="page-title">Thanh toán</h1>
                <p className="page-subtitle">Vui lòng kiểm tra thông tin trước khi hoàn tất đơn hàng.</p>

                <form onSubmit={handleSubmit}>
                    <div className="checkout-layout">
                        {/* Left Column - Form */}
                        <div className="checkout-form">
                            {/* Delivery Address Section */}
                            <div className="form-section">
                                <button 
                                    type="button"
                                    className="section-header"
                                    onClick={() => toggleSection('delivery')}
                                >
                                    <span>1. Địa chỉ giao hàng</span>
                                    {expandedSections.delivery ? <UpOutlined /> : <DownOutlined />}
                                </button>
                                {expandedSections.delivery && (
                                    <div className="section-content">
                                        <p className="section-note">Vui lòng nhập thông tin giao hàng của bạn vào các trường bên dưới.</p>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Họ và tên</label>
                                                <input
                                                    type="text"
                                                    name="fullName"
                                                    value={formData.fullName}
                                                    onChange={handleInputChange}
                                                    placeholder="Nguyễn Văn A"
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Số điện thoại</label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    placeholder="09xxxxxxxx"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Địa chỉ</label>
                                            <input
                                                type="text"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố"
                                                required
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Shipping Method Section */}
                            <div className="form-section">
                                <button 
                                    type="button"
                                    className="section-header"
                                    onClick={() => toggleSection('shipping')}
                                >
                                    <span>2. Phương thức vận chuyển</span>
                                    {expandedSections.shipping ? <UpOutlined /> : <DownOutlined />}
                                </button>
                                {expandedSections.shipping && (
                                    <div className="section-content">
                                        <div className="radio-options">
                                            <label className={`radio-option ${formData.shippingMethod === 'standard' ? 'active' : ''}`}>
                                                <input
                                                    type="radio"
                                                    name="shippingMethod"
                                                    value="standard"
                                                    checked={formData.shippingMethod === 'standard'}
                                                    onChange={handleInputChange}
                                                />
                                                <div className="option-content">
                                                    <span className="option-title">Giao hàng tiêu chuẩn</span>
                                                    <span className="option-desc">30-45 phút</span>
                                                </div>
                                                <span className="option-price">15.000đ</span>
                                            </label>
                                            <label className={`radio-option ${formData.shippingMethod === 'express' ? 'active' : ''}`}>
                                                <input
                                                    type="radio"
                                                    name="shippingMethod"
                                                    value="express"
                                                    checked={formData.shippingMethod === 'express'}
                                                    onChange={handleInputChange}
                                                />
                                                <div className="option-content">
                                                    <span className="option-title">Giao hàng nhanh</span>
                                                    <span className="option-desc">15-20 phút</span>
                                                </div>
                                                <span className="option-price">25.000đ</span>
                                            </label>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Payment Method Section */}
                            <div className="form-section">
                                <button 
                                    type="button"
                                    className="section-header"
                                    onClick={() => toggleSection('payment')}
                                >
                                    <span>3. Phương thức thanh toán</span>
                                    {expandedSections.payment ? <UpOutlined /> : <DownOutlined />}
                                </button>
                                {expandedSections.payment && (
                                    <div className="section-content">
                                        <div className="radio-options">
                                            <label className={`radio-option ${formData.paymentMethod === 'cod' ? 'active' : ''}`}>
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value="cod"
                                                    checked={formData.paymentMethod === 'cod'}
                                                    onChange={handleInputChange}
                                                />
                                                <div className="option-content">
                                                    <span className="option-title">💵 Thanh toán khi nhận hàng</span>
                                                    <span className="option-desc">COD - Trả tiền mặt khi nhận hàng</span>
                                                </div>
                                            </label>
                                            <label className={`radio-option ${formData.paymentMethod === 'momo' ? 'active' : ''}`}>
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value="momo"
                                                    checked={formData.paymentMethod === 'momo'}
                                                    onChange={handleInputChange}
                                                />
                                                <div className="option-content">
                                                    <span className="option-title">📱 Ví MoMo</span>
                                                    <span className="option-desc">Thanh toán qua ví điện tử MoMo</span>
                                                </div>
                                            </label>
                                            <label className={`radio-option ${formData.paymentMethod === 'bank' ? 'active' : ''}`}>
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value="bank"
                                                    checked={formData.paymentMethod === 'bank'}
                                                    onChange={handleInputChange}
                                                />
                                                <div className="option-content">
                                                    <span className="option-title">🏦 Chuyển khoản ngân hàng</span>
                                                    <span className="option-desc">Thanh toán qua chuyển khoản</span>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column - Order Summary */}
                        <div className="order-summary">
                            <h3>Tóm tắt đơn hàng</h3>
                            
                            <div className="order-items">
                                {cartItems.map(item => (
                                    <div key={item.id} className="order-item">
                                        <div className="item-image">
                                            <img src={item.image} alt={item.name} />
                                            <span className="item-quantity">{item.quantity}</span>
                                        </div>
                                        <div className="item-details">
                                            <h4>{item.name}</h4>
                                            {item.options && (
                                                <p className="item-options">
                                                    {item.options.sugar} Đường, {item.options.ice} Đá
                                                </p>
                                            )}
                                        </div>
                                        <span className="item-price">{formatPrice(item.price * item.quantity)}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="promo-code">
                                <input
                                    type="text"
                                    name="promoCode"
                                    value={formData.promoCode}
                                    onChange={handleInputChange}
                                    placeholder="Mã giảm giá"
                                />
                                <button type="button" onClick={handleApplyPromo}>Áp dụng</button>
                            </div>

                            <div className="order-totals">
                                <div className="total-row">
                                    <span>Tạm tính</span>
                                    <span>{formatPrice(subtotal)}</span>
                                </div>
                                <div className="total-row">
                                    <span>Phí vận chuyển</span>
                                    <span>{formatPrice(shippingFee)}</span>
                                </div>
                                {promoApplied && (
                                    <div className="total-row discount">
                                        <span>Giảm giá (10%)</span>
                                        <span>-{formatPrice(discount)}</span>
                                    </div>
                                )}
                                <div className="total-row final">
                                    <span>Tổng cộng</span>
                                    <span className="final-price">{formatPrice(total)}</span>
                                </div>
                            </div>

                            <button type="submit" className="checkout-btn">
                                Hoàn tất đặt hàng
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
