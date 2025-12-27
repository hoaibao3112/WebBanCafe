import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../store/slices/authSlice';
import './Login.css';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinish = async (values) => {
        setLoading(true);
        dispatch(loginStart());
        
        try {
            // Simulate login - replace with actual API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Mock successful login
            if (values.email === 'admin@boba.com' && values.password === '123456') {
                const mockData = {
                    user: { id: 1, name: 'Admin', email: 'admin@boba.com' },
                    token: 'mock-jwt-token-12345'
                };
                dispatch(loginSuccess(mockData));
                message.success('Đăng nhập thành công!');
                navigate('/dashboard');
            } else {
                throw new Error('Email hoặc mật khẩu không đúng');
            }
        } catch (error) {
            dispatch(loginFailure(error.message));
            message.error(error.message || 'Đăng nhập thất bại');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-left">
                    <div className="login-brand">
                        <span className="brand-icon">🧋</span>
                        <h1>Boba Admin</h1>
                        <p>Hệ thống quản lý cửa hàng trà sữa</p>
                    </div>
                    <div className="login-illustration">
                        <div className="bubble bubble-1"></div>
                        <div className="bubble bubble-2"></div>
                        <div className="bubble bubble-3"></div>
                    </div>
                </div>
                
                <div className="login-right">
                    <div className="login-form-container">
                        <h2>Đăng nhập</h2>
                        <p className="login-subtitle">Chào mừng trở lại! Vui lòng đăng nhập.</p>
                        
                        <Form
                            name="login"
                            onFinish={onFinish}
                            layout="vertical"
                            size="large"
                        >
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập email!' },
                                    { type: 'email', message: 'Email không hợp lệ!' }
                                ]}
                            >
                                <Input 
                                    prefix={<UserOutlined />} 
                                    placeholder="admin@boba.com"
                                />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                label="Mật khẩu"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập mật khẩu!' }
                                ]}
                            >
                                <Input.Password 
                                    prefix={<LockOutlined />}
                                    placeholder="••••••"
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button 
                                    type="primary" 
                                    htmlType="submit" 
                                    loading={loading}
                                    block
                                    className="login-button"
                                >
                                    Đăng nhập
                                </Button>
                            </Form.Item>
                        </Form>
                        
                        <div className="login-hint">
                            <p>Demo: admin@boba.com / 123456</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
