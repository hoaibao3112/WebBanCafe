import React from 'react';
import { Layout, Menu, Avatar, Dropdown, Space } from 'antd';
import {
    UserOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined
} from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const { Header: AntHeader } = Layout;

const Header = ({ collapsed, setCollapsed }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const userMenuItems = [
        {
            key: 'profile',
            icon: <UserOutlined />,
            label: user?.staffName || user?.username
        },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Đăng xuất',
            onClick: handleLogout
        }
    ];

    return (
        <AntHeader
            style={{
                padding: '0 24px',
                background: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: () => setCollapsed(!collapsed),
                    style: { fontSize: '18px', cursor: 'pointer' }
                })}
                <h2 style={{ margin: '0 0 0 24px', fontSize: '20px', fontWeight: 'bold' }}>
                    ☕ Cafe Management
                </h2>
            </div>

            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                <Space style={{ cursor: 'pointer' }}>
                    <Avatar icon={<UserOutlined />} />
                    <span>{user?.staffName || user?.username}</span>
                    <span style={{ fontSize: '12px', color: '#888' }}>
                        ({user?.roleName})
                    </span>
                </Space>
            </Dropdown>
        </AntHeader>
    );
};

export default Header;
