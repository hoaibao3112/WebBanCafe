import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import {
    DollarOutlined,
    ShoppingCartOutlined,
    UserOutlined,
    InboxOutlined,
} from '@ant-design/icons';
import './Dashboard.css';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Doanh thu hôm nay"
                            value={5280000}
                            precision={0}
                            valueStyle={{ color: '#3f8600' }}
                            prefix={<DollarOutlined />}
                            suffix="₫"
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Đơn hàng hôm nay"
                            value={45}
                            prefix={<ShoppingCartOutlined />}
                            valueStyle={{ color: '#1890ff' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Khách hàng"
                            value={328}
                            prefix={<UserOutlined />}
                            valueStyle={{ color: '#cf1322' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Sản phẩm"
                            value={56}
                            prefix={<InboxOutlined />}
                            valueStyle={{ color: '#faad14' }}
                        />
                    </Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
                <Col xs={24} lg={16}>
                    <Card title="Doanh thu theo ngày" bordered={false}>
                        <p>Biểu đồ sẽ được thêm vào ở Phase 3</p>
                    </Card>
                </Col>
                <Col xs={24} lg={8}>
                    <Card title="Sản phẩm bán chạy" bordered={false}>
                        <p>Danh sách sẽ được thêm vào ở Phase 3</p>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;
