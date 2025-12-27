import React, { useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import {
    DashboardOutlined,
    ShoppingOutlined,
    InboxOutlined,
    DatabaseOutlined,
    UserOutlined,
    SettingOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import './MainLayout.css';

const { Header, Sider, Content } = Layout;

const MainLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const menuItems = [
        {
            key: '/dashboard',
            icon: <DashboardOutlined />,
            label: 'Dashboard',
        },
        {
            key: '/pos',
            icon: <ShoppingOutlined />,
            label: 'Bán hàng (POS)',
        },
        {
            key: '/products',
            icon: <InboxOutlined />,
            label: 'Sản phẩm',
            children: [
                { key: '/products', label: 'Danh sách sản phẩm' },
                { key: '/materials', label: 'Nguyên liệu' },
                { key: '/suppliers', label: 'Nhà cung cấp' },
            ],
        },
        {
            key: '/warehouse',
            icon: <DatabaseOutlined />,
            label: 'Kho hàng',
            children: [
                { key: '/warehouse/import', label: 'Nhập kho' },
                { key: '/warehouse/export', label: 'Xuất kho' },
                { key: '/warehouse/inventory', label: 'Tồn kho' },
            ],
        },
        {
            key: '/users',
            icon: <UserOutlined />,
            label: 'Quản lý',
            children: [
                { key: '/users', label: 'Tài khoản' },
                { key: '/roles', label: 'Phân quyền' },
            ],
        },
        {
            key: '/settings',
            icon: <SettingOutlined />,
            label: 'Cài đặt',
        },
    ];

    const handleMenuClick = (e) => {
        if (e.key === 'logout') {
            dispatch(logout());
            navigate('/login');
        } else {
            navigate(e.key);
        }
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed} theme="dark">
                <div className="logo">
                    <h2 style={{ color: 'white', textAlign: 'center', padding: '16px' }}>
                        {collapsed ? 'CM' : 'Cafe Manager'}
                    </h2>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['/dashboard']}
                    items={menuItems}
                    onClick={handleMenuClick}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 24px' }}>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: () => setCollapsed(!collapsed),
                        })}
                        <div>
                            <LogoutOutlined
                                style={{ fontSize: '18px', cursor: 'pointer' }}
                                onClick={() => {
                                    dispatch(logout());
                                    navigate('/login');
                                }}
                            />
                        </div>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: '8px',
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
