import React, { useState } from 'react';
import {
    Table, Card, Button, Input, Select, Tag, Space, Modal,
    Avatar, Tooltip, Popconfirm, message, Descriptions, Tabs
} from 'antd';
import {
    SearchOutlined, EyeOutlined, DeleteOutlined, ExportOutlined,
    FilterOutlined, UserOutlined, PhoneOutlined, MailOutlined,
    ShoppingOutlined, GiftOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import './CustomerManagement.css';

const { Option } = Select;

const CustomerManagement = () => {
    const [loading, setLoading] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    // Mock customer data
    const customers = [
        {
            key: '1',
            id: 'KH001',
            name: 'Nguyễn Văn A',
            email: 'nguyenvana@email.com',
            phone: '0901234567',
            avatar: null,
            totalOrders: 25,
            totalSpent: 2850000,
            membershipLevel: 'gold',
            points: 2850,
            joinDate: '2023-06-15',
            lastOrder: '2024-01-14',
            status: 'active',
            address: '123 Nguyễn Huệ, Q.1, TP.HCM',
        },
        {
            key: '2',
            id: 'KH002',
            name: 'Trần Thị B',
            email: 'tranthib@email.com',
            phone: '0912345678',
            avatar: null,
            totalOrders: 42,
            totalSpent: 4520000,
            membershipLevel: 'platinum',
            points: 4520,
            joinDate: '2023-03-22',
            lastOrder: '2024-01-15',
            status: 'active',
            address: '456 Lê Lợi, Q.1, TP.HCM',
        },
        {
            key: '3',
            id: 'KH003',
            name: 'Lê Văn C',
            email: 'levanc@email.com',
            phone: '0923456789',
            avatar: null,
            totalOrders: 8,
            totalSpent: 680000,
            membershipLevel: 'silver',
            points: 680,
            joinDate: '2023-11-10',
            lastOrder: '2024-01-10',
            status: 'active',
            address: '789 Hai Bà Trưng, Q.3, TP.HCM',
        },
        {
            key: '4',
            id: 'KH004',
            name: 'Phạm Thị D',
            email: 'phamthid@email.com',
            phone: '0934567890',
            avatar: null,
            totalOrders: 3,
            totalSpent: 185000,
            membershipLevel: 'bronze',
            points: 185,
            joinDate: '2024-01-05',
            lastOrder: '2024-01-12',
            status: 'active',
            address: '321 Võ Văn Tần, Q.3, TP.HCM',
        },
        {
            key: '5',
            id: 'KH005',
            name: 'Hoàng Văn E',
            email: 'hoangvane@email.com',
            phone: '0945678901',
            avatar: null,
            totalOrders: 15,
            totalSpent: 1250000,
            membershipLevel: 'silver',
            points: 1250,
            joinDate: '2023-08-20',
            lastOrder: '2023-12-25',
            status: 'inactive',
            address: '654 Cách Mạng Tháng 8, Q.10, TP.HCM',
        },
    ];

    const membershipConfig = {
        bronze: { color: '#cd7f32', text: 'Đồng' },
        silver: { color: '#c0c0c0', text: 'Bạc' },
        gold: { color: '#ffd700', text: 'Vàng' },
        platinum: { color: '#e5e4e2', text: 'Bạch Kim' },
    };

    const handleViewCustomer = (customer) => {
        setSelectedCustomer(customer);
        setIsModalVisible(true);
    };

    const handleDeleteCustomer = (id) => {
        message.success(`Đã xóa khách hàng ${id}`);
    };

    const columns = [
        {
            title: 'Khách hàng',
            key: 'customer',
            width: 250,
            render: (_, record) => (
                <div className="customer-cell">
                    <Avatar 
                        size={44} 
                        style={{ backgroundColor: '#ff6b6b' }}
                        icon={<UserOutlined />}
                    >
                        {record.name.charAt(0)}
                    </Avatar>
                    <div className="customer-info">
                        <span className="customer-name">{record.name}</span>
                        <span className="customer-id">{record.id}</span>
                    </div>
                </div>
            ),
        },
        {
            title: 'Liên hệ',
            key: 'contact',
            width: 200,
            render: (_, record) => (
                <div className="contact-cell">
                    <div className="contact-item">
                        <PhoneOutlined className="contact-icon" />
                        <span>{record.phone}</span>
                    </div>
                    <div className="contact-item">
                        <MailOutlined className="contact-icon" />
                        <span>{record.email}</span>
                    </div>
                </div>
            ),
        },
        {
            title: 'Đơn hàng',
            dataIndex: 'totalOrders',
            key: 'totalOrders',
            width: 100,
            sorter: (a, b) => a.totalOrders - b.totalOrders,
            render: (val) => (
                <span className="order-count">{val} đơn</span>
            ),
        },
        {
            title: 'Tổng chi tiêu',
            dataIndex: 'totalSpent',
            key: 'totalSpent',
            width: 140,
            sorter: (a, b) => a.totalSpent - b.totalSpent,
            render: (val) => (
                <span className="total-spent">{val.toLocaleString('vi-VN')}đ</span>
            ),
        },
        {
            title: 'Hạng thành viên',
            dataIndex: 'membershipLevel',
            key: 'membershipLevel',
            width: 130,
            render: (level) => {
                const config = membershipConfig[level];
                return (
                    <Tag 
                        style={{ 
                            background: config.color, 
                            color: level === 'gold' || level === 'platinum' ? '#333' : '#fff',
                            border: 'none'
                        }}
                    >
                        {config.text}
                    </Tag>
                );
            },
        },
        {
            title: 'Điểm tích lũy',
            dataIndex: 'points',
            key: 'points',
            width: 110,
            render: (val) => (
                <span className="points">{val.toLocaleString()} điểm</span>
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: 110,
            render: (status) => (
                <Tag color={status === 'active' ? 'success' : 'default'}>
                    {status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                </Tag>
            ),
        },
        {
            title: 'Thao tác',
            key: 'actions',
            width: 100,
            fixed: 'right',
            render: (_, record) => (
                <Space>
                    <Tooltip title="Xem chi tiết">
                        <Button
                            type="text"
                            icon={<EyeOutlined />}
                            onClick={() => handleViewCustomer(record)}
                        />
                    </Tooltip>
                    <Popconfirm
                        title="Xóa khách hàng?"
                        description="Bạn có chắc chắn muốn xóa khách hàng này?"
                        onConfirm={() => handleDeleteCustomer(record.id)}
                        okText="Xóa"
                        cancelText="Hủy"
                        okButtonProps={{ danger: true }}
                    >
                        <Tooltip title="Xóa">
                            <Button type="text" danger icon={<DeleteOutlined />} />
                        </Tooltip>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const filteredCustomers = customers.filter(customer => {
        const matchesSearch = customer.name.toLowerCase().includes(searchText.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchText.toLowerCase()) ||
            customer.phone.includes(searchText);
        const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="customer-management">
            <div className="page-header">
                <div className="header-left">
                    <h1>Quản lý khách hàng</h1>
                    <p>Quản lý thông tin khách hàng và thành viên</p>
                </div>
                <div className="header-right">
                    <Button icon={<ExportOutlined />}>Xuất Excel</Button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="summary-cards">
                <Card className="summary-card" bordered={false}>
                    <div className="summary-icon bronze">
                        <UserOutlined />
                    </div>
                    <div className="summary-content">
                        <span className="summary-value">{customers.filter(c => c.membershipLevel === 'bronze').length}</span>
                        <span className="summary-label">Hạng Đồng</span>
                    </div>
                </Card>
                <Card className="summary-card" bordered={false}>
                    <div className="summary-icon silver">
                        <UserOutlined />
                    </div>
                    <div className="summary-content">
                        <span className="summary-value">{customers.filter(c => c.membershipLevel === 'silver').length}</span>
                        <span className="summary-label">Hạng Bạc</span>
                    </div>
                </Card>
                <Card className="summary-card" bordered={false}>
                    <div className="summary-icon gold">
                        <UserOutlined />
                    </div>
                    <div className="summary-content">
                        <span className="summary-value">{customers.filter(c => c.membershipLevel === 'gold').length}</span>
                        <span className="summary-label">Hạng Vàng</span>
                    </div>
                </Card>
                <Card className="summary-card" bordered={false}>
                    <div className="summary-icon platinum">
                        <UserOutlined />
                    </div>
                    <div className="summary-content">
                        <span className="summary-value">{customers.filter(c => c.membershipLevel === 'platinum').length}</span>
                        <span className="summary-label">Bạch Kim</span>
                    </div>
                </Card>
            </div>

            <Card className="filter-card" bordered={false}>
                <div className="filter-row">
                    <Input
                        placeholder="Tìm theo tên, email, số điện thoại..."
                        prefix={<SearchOutlined />}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{ width: 300 }}
                        allowClear
                    />
                    <Select
                        value={statusFilter}
                        onChange={setStatusFilter}
                        style={{ width: 150 }}
                    >
                        <Option value="all">Tất cả</Option>
                        <Option value="active">Hoạt động</Option>
                        <Option value="inactive">Không hoạt động</Option>
                    </Select>
                    <Select
                        placeholder="Hạng thành viên"
                        style={{ width: 150 }}
                        allowClear
                    >
                        <Option value="bronze">Đồng</Option>
                        <Option value="silver">Bạc</Option>
                        <Option value="gold">Vàng</Option>
                        <Option value="platinum">Bạch Kim</Option>
                    </Select>
                    <Button icon={<FilterOutlined />}>Lọc</Button>
                </div>
            </Card>

            <Card bordered={false} className="table-card">
                <Table
                    columns={columns}
                    dataSource={filteredCustomers}
                    loading={loading}
                    pagination={{
                        total: filteredCustomers.length,
                        pageSize: 10,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total) => `Tổng ${total} khách hàng`,
                    }}
                    scroll={{ x: 1200 }}
                />
            </Card>

            {/* Customer Detail Modal */}
            <Modal
                title="Chi tiết khách hàng"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={[
                    <Button key="close" onClick={() => setIsModalVisible(false)}>
                        Đóng
                    </Button>,
                ]}
                width={700}
            >
                {selectedCustomer && (
                    <Tabs
                        items={[
                            {
                                key: '1',
                                label: 'Thông tin',
                                children: (
                                    <>
                                        <div className="customer-header">
                                            <Avatar 
                                                size={80} 
                                                style={{ backgroundColor: '#ff6b6b' }}
                                            >
                                                {selectedCustomer.name.charAt(0)}
                                            </Avatar>
                                            <div className="customer-header-info">
                                                <h3>{selectedCustomer.name}</h3>
                                                <Tag 
                                                    style={{ 
                                                        background: membershipConfig[selectedCustomer.membershipLevel].color,
                                                        color: selectedCustomer.membershipLevel === 'gold' ? '#333' : '#fff',
                                                        border: 'none'
                                                    }}
                                                >
                                                    {membershipConfig[selectedCustomer.membershipLevel].text}
                                                </Tag>
                                            </div>
                                        </div>
                                        
                                        <Descriptions bordered column={2} size="small" style={{ marginTop: 20 }}>
                                            <Descriptions.Item label="Mã khách hàng">
                                                {selectedCustomer.id}
                                            </Descriptions.Item>
                                            <Descriptions.Item label="Trạng thái">
                                                <Tag color={selectedCustomer.status === 'active' ? 'success' : 'default'}>
                                                    {selectedCustomer.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                                                </Tag>
                                            </Descriptions.Item>
                                            <Descriptions.Item label="Số điện thoại">
                                                {selectedCustomer.phone}
                                            </Descriptions.Item>
                                            <Descriptions.Item label="Email">
                                                {selectedCustomer.email}
                                            </Descriptions.Item>
                                            <Descriptions.Item label="Ngày tham gia">
                                                {dayjs(selectedCustomer.joinDate).format('DD/MM/YYYY')}
                                            </Descriptions.Item>
                                            <Descriptions.Item label="Đơn hàng gần nhất">
                                                {dayjs(selectedCustomer.lastOrder).format('DD/MM/YYYY')}
                                            </Descriptions.Item>
                                            <Descriptions.Item label="Địa chỉ" span={2}>
                                                {selectedCustomer.address}
                                            </Descriptions.Item>
                                        </Descriptions>

                                        <div className="customer-stats">
                                            <div className="stat-item">
                                                <ShoppingOutlined className="stat-icon" />
                                                <div className="stat-info">
                                                    <span className="stat-value">{selectedCustomer.totalOrders}</span>
                                                    <span className="stat-label">Đơn hàng</span>
                                                </div>
                                            </div>
                                            <div className="stat-item">
                                                <GiftOutlined className="stat-icon" />
                                                <div className="stat-info">
                                                    <span className="stat-value">{selectedCustomer.totalSpent.toLocaleString('vi-VN')}đ</span>
                                                    <span className="stat-label">Tổng chi tiêu</span>
                                                </div>
                                            </div>
                                            <div className="stat-item">
                                                <GiftOutlined className="stat-icon" />
                                                <div className="stat-info">
                                                    <span className="stat-value">{selectedCustomer.points.toLocaleString()}</span>
                                                    <span className="stat-label">Điểm tích lũy</span>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ),
                            },
                            {
                                key: '2',
                                label: 'Lịch sử đơn hàng',
                                children: (
                                    <p style={{ color: '#888', textAlign: 'center', padding: 40 }}>
                                        Chưa có lịch sử đơn hàng
                                    </p>
                                ),
                            },
                        ]}
                    />
                )}
            </Modal>
        </div>
    );
};

export default CustomerManagement;
