import React, { useState } from 'react';
import {
    Table, Card, Button, Input, Select, Tag, Space, DatePicker,
    Modal, Descriptions, Badge, Dropdown, message, Tooltip, Avatar
} from 'antd';
import {
    SearchOutlined, FilterOutlined, EyeOutlined, EditOutlined,
    DeleteOutlined, MoreOutlined, PrinterOutlined, ExportOutlined,
    CheckCircleOutlined, CloseCircleOutlined, SyncOutlined, ClockCircleOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import './OrderManagement.css';

const { RangePicker } = DatePicker;
const { Option } = Select;

const OrderManagement = () => {
    const [loading, setLoading] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    // Mock order data
    const orders = [
        {
            key: '1',
            orderId: 'DH001',
            customer: {
                name: 'Nguyễn Văn A',
                phone: '0901234567',
                avatar: null,
            },
            products: [
                { name: 'Trà sữa trân châu', qty: 2, price: 35000 },
                { name: 'Matcha Latte', qty: 1, price: 40000 },
            ],
            total: 110000,
            status: 'delivered',
            paymentMethod: 'Tiền mặt',
            orderDate: '2024-01-15 10:30',
            deliveryAddress: '123 Nguyễn Huệ, Q.1, TP.HCM',
        },
        {
            key: '2',
            orderId: 'DH002',
            customer: {
                name: 'Trần Thị B',
                phone: '0912345678',
                avatar: null,
            },
            products: [
                { name: 'Hồng trà sữa', qty: 1, price: 32000 },
                { name: 'Bánh flan', qty: 2, price: 18000 },
            ],
            total: 68000,
            status: 'shipping',
            paymentMethod: 'Momo',
            orderDate: '2024-01-15 10:25',
            deliveryAddress: '456 Lê Lợi, Q.1, TP.HCM',
        },
        {
            key: '3',
            orderId: 'DH003',
            customer: {
                name: 'Lê Văn C',
                phone: '0923456789',
                avatar: null,
            },
            products: [
                { name: 'Trà đào cam sả', qty: 2, price: 35000 },
            ],
            total: 70000,
            status: 'pending',
            paymentMethod: 'ZaloPay',
            orderDate: '2024-01-15 10:20',
            deliveryAddress: '789 Hai Bà Trưng, Q.3, TP.HCM',
        },
        {
            key: '4',
            orderId: 'DH004',
            customer: {
                name: 'Phạm Thị D',
                phone: '0934567890',
                avatar: null,
            },
            products: [
                { name: 'Sữa tươi trân châu đường đen', qty: 1, price: 38000 },
            ],
            total: 38000,
            status: 'delivered',
            paymentMethod: 'Thẻ ngân hàng',
            orderDate: '2024-01-15 10:15',
            deliveryAddress: '321 Võ Văn Tần, Q.3, TP.HCM',
        },
        {
            key: '5',
            orderId: 'DH005',
            customer: {
                name: 'Hoàng Văn E',
                phone: '0945678901',
                avatar: null,
            },
            products: [
                { name: 'Combo trà sữa đôi', qty: 1, price: 60000 },
                { name: 'Topping trân châu', qty: 2, price: 10000 },
            ],
            total: 80000,
            status: 'cancelled',
            paymentMethod: 'Tiền mặt',
            orderDate: '2024-01-15 10:10',
            deliveryAddress: '654 Cách Mạng Tháng 8, Q.10, TP.HCM',
        },
    ];

    const statusConfig = {
        delivered: { color: 'success', text: 'Đã giao', icon: <CheckCircleOutlined /> },
        shipping: { color: 'processing', text: 'Đang giao', icon: <SyncOutlined spin /> },
        pending: { color: 'warning', text: 'Chờ xử lý', icon: <ClockCircleOutlined /> },
        cancelled: { color: 'error', text: 'Đã hủy', icon: <CloseCircleOutlined /> },
    };

    const handleViewOrder = (order) => {
        setSelectedOrder(order);
        setIsModalVisible(true);
    };

    const handleUpdateStatus = (orderId, newStatus) => {
        message.success(`Đã cập nhật trạng thái đơn hàng ${orderId}`);
    };

    const handleDeleteOrder = (orderId) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: `Bạn có chắc chắn muốn xóa đơn hàng ${orderId}?`,
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk() {
                message.success(`Đã xóa đơn hàng ${orderId}`);
            },
        });
    };

    const getActionMenu = (record) => ({
        items: [
            {
                key: 'view',
                icon: <EyeOutlined />,
                label: 'Xem chi tiết',
                onClick: () => handleViewOrder(record),
            },
            {
                key: 'print',
                icon: <PrinterOutlined />,
                label: 'In hóa đơn',
            },
            { type: 'divider' },
            {
                key: 'pending',
                icon: <ClockCircleOutlined />,
                label: 'Chờ xử lý',
                onClick: () => handleUpdateStatus(record.orderId, 'pending'),
            },
            {
                key: 'shipping',
                icon: <SyncOutlined />,
                label: 'Đang giao',
                onClick: () => handleUpdateStatus(record.orderId, 'shipping'),
            },
            {
                key: 'delivered',
                icon: <CheckCircleOutlined />,
                label: 'Đã giao',
                onClick: () => handleUpdateStatus(record.orderId, 'delivered'),
            },
            { type: 'divider' },
            {
                key: 'delete',
                icon: <DeleteOutlined />,
                label: 'Xóa đơn hàng',
                danger: true,
                onClick: () => handleDeleteOrder(record.orderId),
            },
        ],
    });

    const columns = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'orderId',
            key: 'orderId',
            width: 120,
            render: (text) => <span className="order-id">{text}</span>,
        },
        {
            title: 'Khách hàng',
            dataIndex: 'customer',
            key: 'customer',
            width: 200,
            render: (customer) => (
                <div className="customer-cell">
                    <Avatar size={36} style={{ backgroundColor: '#ff6b6b' }}>
                        {customer.name.charAt(0)}
                    </Avatar>
                    <div className="customer-info">
                        <span className="customer-name">{customer.name}</span>
                        <span className="customer-phone">{customer.phone}</span>
                    </div>
                </div>
            ),
        },
        {
            title: 'Ngày đặt',
            dataIndex: 'orderDate',
            key: 'orderDate',
            width: 150,
            render: (date) => dayjs(date).format('DD/MM/YYYY HH:mm'),
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'total',
            key: 'total',
            width: 130,
            render: (val) => (
                <span className="order-total">{val.toLocaleString('vi-VN')}đ</span>
            ),
        },
        {
            title: 'Thanh toán',
            dataIndex: 'paymentMethod',
            key: 'paymentMethod',
            width: 120,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: 130,
            render: (status) => {
                const config = statusConfig[status];
                return (
                    <Tag icon={config.icon} color={config.color}>
                        {config.text}
                    </Tag>
                );
            },
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
                            onClick={() => handleViewOrder(record)}
                        />
                    </Tooltip>
                    <Dropdown menu={getActionMenu(record)} trigger={['click']}>
                        <Button type="text" icon={<MoreOutlined />} />
                    </Dropdown>
                </Space>
            ),
        },
    ];

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.orderId.toLowerCase().includes(searchText.toLowerCase()) ||
            order.customer.name.toLowerCase().includes(searchText.toLowerCase());
        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="order-management">
            <div className="page-header">
                <div className="header-left">
                    <h1>Quản lý đơn hàng</h1>
                    <p>Quản lý tất cả đơn hàng của cửa hàng</p>
                </div>
                <div className="header-right">
                    <Button icon={<ExportOutlined />}>Xuất Excel</Button>
                </div>
            </div>

            <Card className="filter-card" bordered={false}>
                <div className="filter-row">
                    <Input
                        placeholder="Tìm theo mã đơn, tên khách hàng..."
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
                        <Option value="all">Tất cả trạng thái</Option>
                        <Option value="pending">Chờ xử lý</Option>
                        <Option value="shipping">Đang giao</Option>
                        <Option value="delivered">Đã giao</Option>
                        <Option value="cancelled">Đã hủy</Option>
                    </Select>
                    <RangePicker 
                        placeholder={['Từ ngày', 'Đến ngày']}
                        style={{ width: 280 }}
                    />
                    <Button icon={<FilterOutlined />}>Lọc</Button>
                </div>

                <div className="status-tabs">
                    <Badge count={orders.length} className="status-badge">
                        <Tag 
                            className={`status-tab ${statusFilter === 'all' ? 'active' : ''}`}
                            onClick={() => setStatusFilter('all')}
                        >
                            Tất cả
                        </Tag>
                    </Badge>
                    <Badge count={orders.filter(o => o.status === 'pending').length} className="status-badge">
                        <Tag 
                            className={`status-tab ${statusFilter === 'pending' ? 'active' : ''}`}
                            onClick={() => setStatusFilter('pending')}
                        >
                            Chờ xử lý
                        </Tag>
                    </Badge>
                    <Badge count={orders.filter(o => o.status === 'shipping').length} className="status-badge">
                        <Tag 
                            className={`status-tab ${statusFilter === 'shipping' ? 'active' : ''}`}
                            onClick={() => setStatusFilter('shipping')}
                        >
                            Đang giao
                        </Tag>
                    </Badge>
                    <Badge count={orders.filter(o => o.status === 'delivered').length} className="status-badge">
                        <Tag 
                            className={`status-tab ${statusFilter === 'delivered' ? 'active' : ''}`}
                            onClick={() => setStatusFilter('delivered')}
                        >
                            Đã giao
                        </Tag>
                    </Badge>
                    <Badge count={orders.filter(o => o.status === 'cancelled').length} className="status-badge">
                        <Tag 
                            className={`status-tab ${statusFilter === 'cancelled' ? 'active' : ''}`}
                            onClick={() => setStatusFilter('cancelled')}
                        >
                            Đã hủy
                        </Tag>
                    </Badge>
                </div>
            </Card>

            <Card bordered={false} className="table-card">
                <Table
                    columns={columns}
                    dataSource={filteredOrders}
                    loading={loading}
                    pagination={{
                        total: filteredOrders.length,
                        pageSize: 10,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total) => `Tổng ${total} đơn hàng`,
                    }}
                    scroll={{ x: 1000 }}
                />
            </Card>

            {/* Order Detail Modal */}
            <Modal
                title={`Chi tiết đơn hàng ${selectedOrder?.orderId}`}
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={[
                    <Button key="print" icon={<PrinterOutlined />}>
                        In hóa đơn
                    </Button>,
                    <Button key="close" onClick={() => setIsModalVisible(false)}>
                        Đóng
                    </Button>,
                ]}
                width={700}
            >
                {selectedOrder && (
                    <>
                        <Descriptions bordered column={2} size="small">
                            <Descriptions.Item label="Mã đơn hàng">
                                {selectedOrder.orderId}
                            </Descriptions.Item>
                            <Descriptions.Item label="Trạng thái">
                                <Tag color={statusConfig[selectedOrder.status].color}>
                                    {statusConfig[selectedOrder.status].text}
                                </Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label="Khách hàng">
                                {selectedOrder.customer.name}
                            </Descriptions.Item>
                            <Descriptions.Item label="Số điện thoại">
                                {selectedOrder.customer.phone}
                            </Descriptions.Item>
                            <Descriptions.Item label="Ngày đặt">
                                {dayjs(selectedOrder.orderDate).format('DD/MM/YYYY HH:mm')}
                            </Descriptions.Item>
                            <Descriptions.Item label="Thanh toán">
                                {selectedOrder.paymentMethod}
                            </Descriptions.Item>
                            <Descriptions.Item label="Địa chỉ giao hàng" span={2}>
                                {selectedOrder.deliveryAddress}
                            </Descriptions.Item>
                        </Descriptions>

                        <h4 style={{ marginTop: 20, marginBottom: 12 }}>Sản phẩm</h4>
                        <Table
                            dataSource={selectedOrder.products.map((p, i) => ({ ...p, key: i }))}
                            columns={[
                                { title: 'Sản phẩm', dataIndex: 'name', key: 'name' },
                                { title: 'Số lượng', dataIndex: 'qty', key: 'qty', width: 100 },
                                { 
                                    title: 'Đơn giá', 
                                    dataIndex: 'price', 
                                    key: 'price', 
                                    width: 120,
                                    render: (val) => `${val.toLocaleString('vi-VN')}đ`
                                },
                                { 
                                    title: 'Thành tiền', 
                                    key: 'subtotal', 
                                    width: 120,
                                    render: (_, record) => `${(record.qty * record.price).toLocaleString('vi-VN')}đ`
                                },
                            ]}
                            pagination={false}
                            size="small"
                            summary={() => (
                                <Table.Summary>
                                    <Table.Summary.Row>
                                        <Table.Summary.Cell index={0} colSpan={3}>
                                            <strong>Tổng cộng</strong>
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={1}>
                                            <strong style={{ color: '#ff6b6b' }}>
                                                {selectedOrder.total.toLocaleString('vi-VN')}đ
                                            </strong>
                                        </Table.Summary.Cell>
                                    </Table.Summary.Row>
                                </Table.Summary>
                            )}
                        />
                    </>
                )}
            </Modal>
        </div>
    );
};

export default OrderManagement;
