import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DeleteOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../../../store/slices/cartSlice';
import './Cart.css';

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart?.items || []);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
    };

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (cartItems.length === 0) {
        return (
            <div className="cart-page">
                <div className="cart-container">
                    <div className="empty-cart">
                        <div className="empty-icon">🛒</div>
                        <h2>Giỏ hàng trống</h2>
                        <p>Bạn chưa thêm sản phẩm nào vào giỏ hàng.</p>
                        <Link to="/menu" className="btn-shop">Khám phá thực đơn</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="cart-container">
                <div className="cart-header">
                    <h1>Giỏ hàng của bạn</h1>
                    <button className="clear-cart-btn" onClick={() => dispatch(clearCart())}>
                        Xóa tất cả
                    </button>
                </div>

                <div className="cart-layout">
                    <div className="cart-items">
                        {cartItems.map(item => (
                            <div key={`${item.id}-${JSON.stringify(item.options)}`} className="cart-item">
                                <div className="item-image">
                                    <img src={item.image} alt={item.name} />
                                </div>
                                <div className="item-details">
                                    <Link to={`/product/${item.id}`} className="item-name">{item.name}</Link>
                                    {item.options && (
                                        <p className="item-options">
                                            Size {item.options.size} • {item.options.sugar} Đường • {item.options.ice} Đá
                                            {item.options.toppings?.length > 0 && (
                                                <span> • {item.options.toppings.join(', ')}</span>
                                            )}
                                        </p>
                                    )}
                                    <p className="item-price">{formatPrice(item.price)}</p>
                                </div>
                                <div className="item-actions">
                                    <div className="quantity-selector">
                                        <button 
                                            onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                                            disabled={item.quantity <= 1}
                                        >
                                            <MinusOutlined />
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}>
                                            <PlusOutlined />
                                        </button>
                                    </div>
                                    <button 
                                        className="delete-btn"
                                        onClick={() => dispatch(removeFromCart(item.id))}
                                    >
                                        <DeleteOutlined />
                                    </button>
                                </div>
                                <div className="item-total">
                                    {formatPrice(item.price * item.quantity)}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <h3>Tóm tắt đơn hàng</h3>
                        <div className="summary-row">
                            <span>Tạm tính ({cartItems.reduce((sum, i) => sum + i.quantity, 0)} sản phẩm)</span>
                            <span>{formatPrice(subtotal)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Phí vận chuyển</span>
                            <span className="shipping-note">Tính khi thanh toán</span>
                        </div>
                        <div className="summary-total">
                            <span>Tổng cộng</span>
                            <span className="total-price">{formatPrice(subtotal)}</span>
                        </div>
                        <button className="checkout-btn" onClick={() => navigate('/checkout')}>
                            Tiến hành thanh toán
                        </button>
                        <Link to="/menu" className="continue-shopping">
                            ← Tiếp tục mua sắm
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
