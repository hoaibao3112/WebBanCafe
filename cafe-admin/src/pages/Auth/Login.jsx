import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const result = await login(values.username, values.password);
            if (result.success) {
                message.success('Đăng nhập thành công!');
                navigate('/');
            } else {
                message.error(result.message || 'Đăng nhập thất bại');
            }
        } catch (error) {
            message.error(error.response?.data?.message || 'Đăng nhập thất bại');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            }}
        >
            <Card
                style={{
                    width: 400,
                    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                    borderRadius: '12px'
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <h1 style={{ fontSize: '48px', margin: 0 }}>☕</h1>
                    <h2 style={{ margin: '10px 0 5px 0' }}>Cafe Management</h2>
                    <p style={{ color: '#888' }}>Đăng nhập vào hệ thống Admin</p>
                </div>

                <Form
                    name="login"
                    onFinish={onFinish}
                    autoComplete="off"
                    size="large"
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Tên đăng nhập"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Mật khẩu"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            block
                            style={{ height: '45px', fontSize: '16px', fontWeight: 'bold' }}
                        >
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>

                <div style={{ textAlign: 'center', marginTop: '20px', color: '#888', fontSize: '12px' }}>
                    <p>Demo: admin / admin123</p>
                </div>
            </Card>
        </div>
    );
};

export default Login;
