import React, { useState } from 'react';
import { Layout, Menu, Avatar, Dropdown, Badge } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
    DashboardOutlined,
    ShoppingCartOutlined,
    CoffeeOutlined,
    TagOutlined,
    UserOutlined,
    BellOutlined,
    LogoutOutlined,
    SettingOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { logout } from '../../store/slices/authSlice';
import './AdminLayout.css';

const { Header, Sider, Content } = Layout;

const menuItems = [
    {
        key: '/dashboard',
        icon: <DashboardOutlined />,
        label: 'Dashboard',
    },
    {
        key: '/orders',
        icon: <ShoppingCartOutlined />,
        label: 'Quản lý đơn hàng',
    },
    {
        key: '/products',
        icon: <CoffeeOutlined />,
        label: 'Quản lý sản phẩm',
    },
    {
        key: '/promotions',
        icon: <TagOutlined />,
        label: 'Quản lý khuyến mãi',
    },
    {
        key: '/customers',
        icon: <UserOutlined />,
        label: 'Quản lý khách hàng',
    },
];

const AdminLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const handleMenuClick = (e) => {
        navigate(e.key);
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const userMenuItems = [
        {
            key: 'profile',
            icon: <UserOutlined />,
            label: 'Thông tin cá nhân',
        },
        {
            key: 'settings',
            icon: <SettingOutlined />,
            label: 'Cài đặt',
        },
        {
            type: 'divider',
        },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Đăng xuất',
            onClick: handleLogout,
        },
    ];

    return (
        <Layout className="admin-layout">
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                className="admin-sider"
                width={260}
            >
                <div className="admin-logo">
                    {collapsed ? (
                        <span className="logo-icon">🧋</span>
                    ) : (
                        <>
                            <span className="logo-icon">🧋</span>
                            <span className="logo-text">Boba Admin</span>
                        </>
                    )}
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    items={menuItems}
                    onClick={handleMenuClick}
                    className="admin-menu"
                />
            </Sider>
            
            <Layout className="admin-main">
                <Header className="admin-header">
                    <div className="header-left">
                        <span 
                            className="trigger" 
                            onClick={() => setCollapsed(!collapsed)}
                        >
                            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        </span>
                    </div>
                    
                    <div className="header-right">
                        <Badge count={5} className="notification-badge">
                            <BellOutlined className="header-icon" />
                        </Badge>
                        
                        <Dropdown
                            menu={{ items: userMenuItems }}
                            placement="bottomRight"
                            trigger={['click']}
                        >
                            <div className="user-info">
                                <Avatar 
                                    size={36} 
                                    icon={<UserOutlined />}
                                    className="user-avatar"
                                />
                                <span className="user-name">Admin</span>
                            </div>
                        </Dropdown>
                    </div>
                </Header>
                
                <Content className="admin-content">
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;
