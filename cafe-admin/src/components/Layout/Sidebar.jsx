import React from 'react';
import { Layout, Menu } from 'antd';
import {
    DashboardOutlined,
    UserOutlined,
    LockOutlined,
    CoffeeOutlined,
    InboxOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
    GiftOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const { Sider } = Layout;

const Sidebar = ({ collapsed }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        {
            key: '/',
            icon: <DashboardOutlined />,
            label: 'Dashboard',
            onClick: () => navigate('/')
        },
        {
            key: '/staff',
            icon: <UserOutlined />,
            label: 'Nhân viên',
            onClick: () => navigate('/staff')
        },
        {
            key: '/accounts',
            icon: <LockOutlined />,
            label: 'Tài khoản',
            onClick: () => navigate('/accounts')
        },
        {
            key: '/products',
            icon: <CoffeeOutlined />,
            label: 'Sản phẩm',
            onClick: () => navigate('/products')
        },
        {
            key: '/materials',
            icon: <InboxOutlined />,
            label: 'Nguyên liệu',
            onClick: () => navigate('/materials')
        },
        {
            key: '/warehouse',
            icon: <HomeOutlined />,
            label: 'Quản lý kho',
            children: [
                {
                    key: '/warehouse/import',
                    label: 'Nhập kho',
                    onClick: () => navigate('/warehouse/import')
                },
                {
                    key: '/warehouse/export',
                    label: 'Xuất kho',
                    onClick: () => navigate('/warehouse/export')
                },
                {
                    key: '/warehouse/inventory',
                    label: 'Tồn kho',
                    onClick: () => navigate('/warehouse/inventory')
                }
            ]
        },
        {
            key: '/receipts',
            icon: <ShoppingCartOutlined />,
            label: 'Đơn hàng',
            onClick: () => navigate('/receipts')
        },
        {
            key: '/promotions',
            icon: <GiftOutlined />,
            label: 'Khuyến mãi',
            onClick: () => navigate('/promotions')
        }
    ];

    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            style={{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
                top: 0,
                bottom: 0
            }}
        >
            <div
                style={{
                    height: '64px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: '24px',
                    fontWeight: 'bold'
                }}
            >
                {collapsed ? '☕' : '☕ ADMIN'}
            </div>
            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={[location.pathname]}
                items={menuItems}
            />
        </Sider>
    );
};

export default Sidebar;
