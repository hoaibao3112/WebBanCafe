import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
    UserOutlined, 
    EnvironmentOutlined, 
    HistoryOutlined, 
    CreditCardOutlined,
    LogoutOutlined,
    SaveOutlined
} from '@ant-design/icons';
import { message } from 'antd';
import './Account.css';

const Account = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('profile');
    
    const [formData, setFormData] = useState({
        fullName: 'Nguyễn Văn A',
        email: 'nguyenvana@email.com',
        phone: '0901234567',
        birthday: '1995-08-15',
        gender: 'male',
    });

    const [addresses, setAddresses] = useState([
        {
            id: 1,
            name: 'Nhà riêng',
            address: '123 Đường ABC, Phường X, Quận Y, TP. Hồ Chí Minh',
            phone: '0901234567',
            isDefault: true,
        },
        {
            id: 2,
            name: 'Văn phòng',
            address: '456 Đường XYZ, Phường A, Quận B, TP. Hồ Chí Minh',
            phone: '0901234567',
            isDefault: false,
        },
    ]);

    const [orders] = useState([
        {
            id: 'DH12345678',
            date: '05/12/2024',
            status: 'completed',
            total: 115000,
            items: 2,
        },
        {
            id: 'DH12345677',
            date: '03/12/2024',
            status: 'delivering',
            total: 89000,
            items: 1,
        },
        {
            id: 'DH12345676',
            date: '01/12/2024',
            status: 'completed',
            total: 156000,
            items: 3,
        },
    ]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveProfile = () => {
        message.success('Đã lưu thông tin thành công!');
    };

    const handleLogout = () => {
        // Clear auth data
        localStorage.removeItem('token');
        message.success('Đăng xuất thành công!');
        navigate('/');
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'pending': return 'Chờ xác nhận';
            case 'confirmed': return 'Đã xác nhận';
            case 'delivering': return 'Đang giao';
            case 'completed': return 'Hoàn thành';
            case 'cancelled': return 'Đã hủy';
            default: return status;
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'completed': return 'status-completed';
            case 'delivering': return 'status-delivering';
            case 'cancelled': return 'status-cancelled';
            default: return 'status-pending';
        }
    };

    const menuItems = [
        { key: 'profile', icon: <UserOutlined />, label: 'Thông tin cá nhân' },
        { key: 'addresses', icon: <EnvironmentOutlined />, label: 'Sổ địa chỉ' },
        { key: 'orders', icon: <HistoryOutlined />, label: 'Lịch sử đơn hàng' },
        { key: 'payment', icon: <CreditCardOutlined />, label: 'Phương thức thanh toán' },
    ];

    return (
        <div className="account-page">
            <div className="account-container">
                <div className="account-layout">
                    {/* Sidebar */}
                    <aside className="account-sidebar">
                        <div className="user-info">
                            <div className="user-avatar">
                                <UserOutlined />
                            </div>
                            <div className="user-details">
                                <h3>{formData.fullName}</h3>
                                <span className="member-badge">Thành viên Vàng</span>
                            </div>
                        </div>

                        <nav className="account-menu">
                            {menuItems.map(item => (
                                <button
                                    key={item.key}
                                    className={`menu-item ${activeTab === item.key ? 'active' : ''}`}
                                    onClick={() => setActiveTab(item.key)}
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </button>
                            ))}
                            <button className="menu-item logout" onClick={handleLogout}>
                                <LogoutOutlined />
                                <span>Đăng xuất</span>
                            </button>
                        </nav>
                    </aside>

                    {/* Main Content */}
                    <main className="account-content">
                        {/* Profile Tab */}
                        {activeTab === 'profile' && (
                            <div className="content-section">
                                <div className="section-header">
                                    <h2>Thông tin cá nhân</h2>
                                    <button className="save-btn" onClick={handleSaveProfile}>
                                        <SaveOutlined /> Lưu thay đổi
                                    </button>
                                </div>

                                <div className="profile-form">
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Họ và Tên</label>
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="readonly"
                                                readOnly
                                            />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Số điện thoại</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Ngày sinh</label>
                                            <input
                                                type="date"
                                                name="birthday"
                                                value={formData.birthday}
                                                onChange={handleInputChange}
                                                className="readonly"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Giới tính</label>
                                        <div className="radio-group">
                                            <label className="radio-label">
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    value="male"
                                                    checked={formData.gender === 'male'}
                                                    onChange={handleInputChange}
                                                />
                                                <span>Nam</span>
                                            </label>
                                            <label className="radio-label">
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    value="female"
                                                    checked={formData.gender === 'female'}
                                                    onChange={handleInputChange}
                                                />
                                                <span>Nữ</span>
                                            </label>
                                            <label className="radio-label">
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    value="other"
                                                    checked={formData.gender === 'other'}
                                                    onChange={handleInputChange}
                                                />
                                                <span>Khác</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Addresses Tab */}
                        {activeTab === 'addresses' && (
                            <div className="content-section">
                                <div className="section-header">
                                    <h2>Sổ địa chỉ</h2>
                                    <button className="add-btn">+ Thêm địa chỉ</button>
                                </div>

                                <div className="addresses-list">
                                    {addresses.map(addr => (
                                        <div key={addr.id} className={`address-card ${addr.isDefault ? 'default' : ''}`}>
                                            <div className="address-header">
                                                <h4>{addr.name}</h4>
                                                {addr.isDefault && <span className="default-badge">Mặc định</span>}
                                            </div>
                                            <p className="address-text">{addr.address}</p>
                                            <p className="address-phone">{addr.phone}</p>
                                            <div className="address-actions">
                                                <button className="edit-btn">Sửa</button>
                                                {!addr.isDefault && <button className="delete-btn">Xóa</button>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Orders Tab */}
                        {activeTab === 'orders' && (
                            <div className="content-section">
                                <div className="section-header">
                                    <h2>Lịch sử đơn hàng</h2>
                                </div>

                                <div className="orders-list">
                                    {orders.map(order => (
                                        <div key={order.id} className="order-card">
                                            <div className="order-header">
                                                <div className="order-id">
                                                    <span className="label">Mã đơn hàng:</span>
                                                    <span className="value">#{order.id}</span>
                                                </div>
                                                <span className={`order-status ${getStatusClass(order.status)}`}>
                                                    {getStatusText(order.status)}
                                                </span>
                                            </div>
                                            <div className="order-body">
                                                <div className="order-info">
                                                    <span>Ngày đặt: {order.date}</span>
                                                    <span>{order.items} sản phẩm</span>
                                                </div>
                                                <div className="order-total">
                                                    <span>Tổng tiền:</span>
                                                    <span className="total-value">{formatPrice(order.total)}</span>
                                                </div>
                                            </div>
                                            <div className="order-actions">
                                                <Link to={`/order/${order.id}`} className="view-btn">
                                                    Xem chi tiết
                                                </Link>
                                                {order.status === 'completed' && (
                                                    <button className="reorder-btn">Đặt lại</button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Payment Tab */}
                        {activeTab === 'payment' && (
                            <div className="content-section">
                                <div className="section-header">
                                    <h2>Phương thức thanh toán</h2>
                                    <button className="add-btn">+ Thêm thẻ</button>
                                </div>

                                <div className="payment-methods">
                                    <div className="payment-card">
                                        <div className="card-icon">💵</div>
                                        <div className="card-info">
                                            <h4>Thanh toán khi nhận hàng (COD)</h4>
                                            <p>Phương thức mặc định</p>
                                        </div>
                                        <span className="default-badge">Mặc định</span>
                                    </div>
                                    <div className="payment-card">
                                        <div className="card-icon">📱</div>
                                        <div className="card-info">
                                            <h4>Ví MoMo</h4>
                                            <p>Liên kết: 090****567</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Account;
