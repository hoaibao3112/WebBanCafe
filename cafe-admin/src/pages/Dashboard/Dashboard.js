import React from 'react';
import { Row, Col, Card, Statistic, Table, Tag, Progress } from 'antd';
import {
    ShoppingCartOutlined,
    DollarOutlined,
    UserOutlined,
    CoffeeOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined,
} from '@ant-design/icons';
import './Dashboard.css';

const Dashboard = () => {
    // Mock data for statistics
    const stats = [
        {
            title: 'Đơn hàng hôm nay',
            value: 156,
            prefix: <ShoppingCartOutlined />,
            suffix: 'đơn',
            change: 12.5,
            color: '#ff6b6b',
        },
        {
            title: 'Doanh thu hôm nay',
            value: 8520000,
            prefix: <DollarOutlined />,
            formatter: (val) => `${(val / 1000000).toFixed(1)}M`,
            change: 8.2,
            color: '#52c41a',
        },
        {
            title: 'Khách hàng mới',
            value: 42,
            prefix: <UserOutlined />,
            suffix: 'người',
            change: -2.4,
            color: '#1890ff',
        },
        {
            title: 'Sản phẩm bán chạy',
            value: 328,
            prefix: <CoffeeOutlined />,
            suffix: 'ly',
            change: 15.3,
            color: '#722ed1',
        },
    ];

    // Mock data for recent orders
    const recentOrders = [
        {
            key: '1',
            orderId: 'DH001',
            customer: 'Nguyễn Văn A',
            products: 'Trà sữa trân châu, Matcha Latte',
            total: 85000,
            status: 'completed',
            time: '10:30',
        },
        {
            key: '2',
            orderId: 'DH002',
            customer: 'Trần Thị B',
            products: 'Hồng trà sữa, Bánh flan',
            total: 65000,
            status: 'processing',
            time: '10:25',
        },
        {
            key: '3',
            orderId: 'DH003',
            customer: 'Lê Văn C',
            products: 'Trà đào cam sả x2',
            total: 70000,
            status: 'pending',
            time: '10:20',
        },
        {
            key: '4',
            orderId: 'DH004',
            customer: 'Phạm Thị D',
            products: 'Sữa tươi trân châu đường đen',
            total: 45000,
            status: 'completed',
            time: '10:15',
        },
        {
            key: '5',
            orderId: 'DH005',
            customer: 'Hoàng Văn E',
            products: 'Combo trà sữa đôi',
            total: 120000,
            status: 'cancelled',
            time: '10:10',
        },
    ];

    // Mock data for top products
    const topProducts = [
        { name: 'Trà sữa trân châu', sales: 156, percent: 100 },
        { name: 'Matcha Latte', sales: 128, percent: 82 },
        { name: 'Hồng trà sữa', sales: 98, percent: 63 },
        { name: 'Trà đào cam sả', sales: 87, percent: 56 },
        { name: 'Sữa tươi trân châu đường đen', sales: 76, percent: 49 },
    ];

    const orderColumns = [
        {
            title: 'Mã đơn',
            dataIndex: 'orderId',
            key: 'orderId',
            render: (text) => <span style={{ fontWeight: 600 }}>{text}</span>,
        },
        {
            title: 'Khách hàng',
            dataIndex: 'customer',
            key: 'customer',
        },
        {
            title: 'Sản phẩm',
            dataIndex: 'products',
            key: 'products',
            ellipsis: true,
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'total',
            key: 'total',
            render: (val) => `${val.toLocaleString('vi-VN')}đ`,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                const statusConfig = {
                    completed: { color: 'green', text: 'Hoàn thành' },
                    processing: { color: 'blue', text: 'Đang xử lý' },
                    pending: { color: 'orange', text: 'Chờ xác nhận' },
                    cancelled: { color: 'red', text: 'Đã hủy' },
                };
                const config = statusConfig[status] || { color: 'default', text: status };
                return <Tag color={config.color}>{config.text}</Tag>;
            },
        },
        {
            title: 'Giờ',
            dataIndex: 'time',
            key: 'time',
        },
    ];

    return (
        <div className="dashboard-page">
            <div className="page-header">
                <h1>Dashboard</h1>
                <p>Tổng quan hoạt động kinh doanh</p>
            </div>

            {/* Statistics Cards */}
            <Row gutter={[24, 24]} className="stats-row">
                {stats.map((stat, index) => (
                    <Col xs={24} sm={12} lg={6} key={index}>
                        <Card className="stat-card" bordered={false}>
                            <div className="stat-icon" style={{ background: stat.color }}>
                                {stat.prefix}
                            </div>
                            <div className="stat-content">
                                <p className="stat-title">{stat.title}</p>
                                <div className="stat-value">
                                    <Statistic
                                        value={stat.value}
                                        formatter={stat.formatter}
                                        suffix={stat.suffix}
                                    />
                                </div>
                                <div className={`stat-change ${stat.change >= 0 ? 'positive' : 'negative'}`}>
                                    {stat.change >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                                    <span>{Math.abs(stat.change)}%</span>
                                    <span className="change-text">so với hôm qua</span>
                                </div>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Charts and Tables */}
            <Row gutter={[24, 24]}>
                {/* Recent Orders */}
                <Col xs={24} lg={16}>
                    <Card 
                        title="Đơn hàng gần đây" 
                        className="dashboard-card"
                        bordered={false}
                        extra={<a href="/orders">Xem tất cả</a>}
                    >
                        <Table
                            columns={orderColumns}
                            dataSource={recentOrders}
                            pagination={false}
                            size="small"
                        />
                    </Card>
                </Col>

                {/* Top Products */}
                <Col xs={24} lg={8}>
                    <Card 
                        title="Sản phẩm bán chạy" 
                        className="dashboard-card"
                        bordered={false}
                    >
                        <div className="top-products">
                            {topProducts.map((product, index) => (
                                <div key={index} className="product-item">
                                    <div className="product-info">
                                        <span className="product-rank">{index + 1}</span>
                                        <span className="product-name">{product.name}</span>
                                        <span className="product-sales">{product.sales} ly</span>
                                    </div>
                                    <Progress 
                                        percent={product.percent} 
                                        showInfo={false}
                                        strokeColor="#ff6b6b"
                                        size="small"
                                    />
                                </div>
                            ))}
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;
