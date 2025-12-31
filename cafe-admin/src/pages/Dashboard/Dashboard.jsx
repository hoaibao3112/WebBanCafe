import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Statistic, Table, Spin, message } from 'antd';
import {
    DollarOutlined,
    ShoppingCartOutlined,
    RiseOutlined,
    WarningOutlined
} from '@ant-design/icons';
import dashboardService from '../../services/dashboardService';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [summary, setSummary] = useState(null);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const response = await dashboardService.getSummary();
            if (response.success) {
                setSummary(response.data);
            }
        } catch (error) {
            message.error('Không thể tải dữ liệu dashboard');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '50px' }}><Spin size="large" /></div>;
    }

    const topProductColumns = [
        {
            title: 'Sản phẩm',
            dataIndex: ['product', 'name'],
            key: 'name'
        },
        {
            title: 'Danh mục',
            dataIndex: ['product', 'category'],
            key: 'category'
        },
        {
            title: 'Số lượng bán',
            dataIndex: 'totalQuantity',
            key: 'quantity',
            render: (val) => val?.toFixed(0) || 0
        },
        {
            title: 'Doanh thu',
            dataIndex: 'totalRevenue',
            key: 'revenue',
            render: (val) => `${val?.toLocaleString() || 0} ₫`
        }
    ];

    const lowStockColumns = [
        {
            title: 'Nguyên liệu',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Tồn kho',
            dataIndex: 'remain',
            key: 'remain',
            render: (val, record) => `${val} ${record.unit}`
        },
        {
            title: 'Trạng thái',
            key: 'status',
            render: () => <span style={{ color: 'red' }}>⚠️ Sắp hết</span>
        }
    ];

    return (
        <div>
            <h1 style={{ marginBottom: '24px' }}>Dashboard</h1>

            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Tổng doanh thu"
                            value={summary?.totalRevenue || 0}
                            precision={0}
                            prefix={<DollarOutlined />}
                            suffix="₫"
                            valueStyle={{ color: '#3f8600' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Doanh thu hôm nay"
                            value={summary?.todayRevenue || 0}
                            precision={0}
                            prefix={<RiseOutlined />}
                            suffix="₫"
                            valueStyle={{ color: '#1890ff' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Tổng đơn hàng"
                            value={summary?.orderCount || 0}
                            prefix={<ShoppingCartOutlined />}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Nguyên liệu sắp hết"
                            value={summary?.lowStockCount || 0}
                            prefix={<WarningOutlined />}
                            valueStyle={{ color: '#cf1322' }}
                        />
                    </Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
                <Col xs={24} lg={12}>
                    <Card title="Top sản phẩm bán chạy" style={{ height: '100%' }}>
                        <Table
                            dataSource={summary?.topProducts || []}
                            columns={topProductColumns}
                            pagination={false}
                            rowKey={(record) => record.product?.id}
                            size="small"
                        />
                    </Card>
                </Col>
                <Col xs={24} lg={12}>
                    <Card title="Nguyên liệu sắp hết" style={{ height: '100%' }}>
                        <Table
                            dataSource={summary?.lowStockItems || []}
                            columns={lowStockColumns}
                            pagination={false}
                            rowKey="id"
                            size="small"
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;
