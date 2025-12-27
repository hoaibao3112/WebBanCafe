import React, { useState } from 'react';
import {
    Table, Card, Button, Input, Select, Tag, Space, Modal, Form,
    InputNumber, DatePicker, Switch, message, Tooltip, Popconfirm, Progress
} from 'antd';
import {
    SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined,
    ExportOutlined, FilterOutlined, GiftOutlined, PercentageOutlined,
    CopyOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import './PromotionManagement.css';

const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const PromotionManagement = () => {
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingPromotion, setEditingPromotion] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [form] = Form.useForm();

    // Mock promotion data
    const [promotions, setPromotions] = useState([
        {
            key: '1',
            id: 'KM001',
            name: 'Giảm 20% cho khách mới',
            code: 'NEWBIE20',
            type: 'percent',
            value: 20,
            minOrder: 50000,
            maxDiscount: 30000,
            startDate: '2024-01-01',
            endDate: '2024-01-31',
            usageLimit: 1000,
            usedCount: 456,
            status: 'active',
            description: 'Áp dụng cho khách hàng đăng ký mới',
        },
        {
            key: '2',
            id: 'KM002',
            name: 'Miễn phí vận chuyển',
            code: 'FREESHIP',
            type: 'fixed',
            value: 15000,
            minOrder: 100000,
            maxDiscount: null,
            startDate: '2024-01-15',
            endDate: '2024-02-15',
            usageLimit: 500,
            usedCount: 234,
            status: 'active',
            description: 'Miễn phí ship cho đơn từ 100k',
        },
        {
            key: '3',
            id: 'KM003',
            name: 'Flash Sale Cuối Tuần',
            code: 'WEEKEND30',
            type: 'percent',
            value: 30,
            minOrder: 80000,
            maxDiscount: 50000,
            startDate: '2024-01-20',
            endDate: '2024-01-21',
            usageLimit: 200,
            usedCount: 200,
            status: 'expired',
            description: 'Giảm 30% cuối tuần',
        },
        {
            key: '4',
            id: 'KM004',
            name: 'Tặng topping trân châu',
            code: 'FREETOPPING',
            type: 'gift',
            value: null,
            minOrder: 60000,
            maxDiscount: null,
            startDate: '2024-02-01',
            endDate: '2024-02-28',
            usageLimit: 300,
            usedCount: 0,
            status: 'scheduled',
            description: 'Tặng 1 topping trân châu',
        },
        {
            key: '5',
            id: 'KM005',
            name: 'Giảm 50k đơn 200k',
            code: 'SUPER50K',
            type: 'fixed',
            value: 50000,
            minOrder: 200000,
            maxDiscount: null,
            startDate: '2024-01-10',
            endDate: '2024-01-25',
            usageLimit: 100,
            usedCount: 78,
            status: 'inactive',
            description: 'Giảm thẳng 50k cho đơn từ 200k',
        },
    ]);

    const typeConfig = {
        percent: { color: 'purple', text: 'Giảm %', icon: <PercentageOutlined /> },
        fixed: { color: 'blue', text: 'Giảm tiền', icon: <GiftOutlined /> },
        gift: { color: 'green', text: 'Tặng quà', icon: <GiftOutlined /> },
    };

    const statusConfig = {
        active: { color: 'success', text: 'Đang hoạt động' },
        inactive: { color: 'default', text: 'Tạm dừng' },
        expired: { color: 'error', text: 'Đã hết hạn' },
        scheduled: { color: 'processing', text: 'Chờ kích hoạt' },
    };

    const handleAdd = () => {
        setEditingPromotion(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleEdit = (record) => {
        setEditingPromotion(record);
        form.setFieldsValue({
            ...record,
            dateRange: [dayjs(record.startDate), dayjs(record.endDate)],
        });
        setIsModalVisible(true);
    };

    const handleDelete = (id) => {
        setPromotions(promotions.filter(p => p.id !== id));
        message.success('Đã xóa khuyến mãi');
    };

    const handleCopyCode = (code) => {
        navigator.clipboard.writeText(code);
        message.success('Đã sao chép mã khuyến mãi');
    };

    const handleToggleStatus = (record) => {
        const newStatus = record.status === 'active' ? 'inactive' : 'active';
        setPromotions(promotions.map(p => 
            p.id === record.id ? { ...p, status: newStatus } : p
        ));
        message.success(`Đã ${newStatus === 'active' ? 'kích hoạt' : 'tạm dừng'} khuyến mãi`);
    };

    const handleSubmit = async (values) => {
        setLoading(true);
        
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const [startDate, endDate] = values.dateRange;
            const promotionData = {
                ...values,
                startDate: startDate.format('YYYY-MM-DD'),
                endDate: endDate.format('YYYY-MM-DD'),
            };
            delete promotionData.dateRange;
            
            if (editingPromotion) {
                setPromotions(promotions.map(p => 
                    p.id === editingPromotion.id ? { ...p, ...promotionData } : p
                ));
                message.success('Đã cập nhật khuyến mãi');
            } else {
                const newPromotion = {
                    ...promotionData,
                    key: Date.now().toString(),
                    id: `KM${(promotions.length + 1).toString().padStart(3, '0')}`,
                    usedCount: 0,
                };
                setPromotions([...promotions, newPromotion]);
                message.success('Đã thêm khuyến mãi mới');
            }
            
            setIsModalVisible(false);
            form.resetFields();
        } catch (error) {
            message.error('Có lỗi xảy ra');
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            title: 'Tên khuyến mãi',
            key: 'name',
            width: 220,
            render: (_, record) => (
                <div className="promo-name-cell">
                    <span className="promo-name">{record.name}</span>
                    <div className="promo-code">
                        <Tag color="orange">{record.code}</Tag>
                        <Tooltip title="Sao chép">
                            <CopyOutlined 
                                className="copy-icon"
                                onClick={() => handleCopyCode(record.code)}
                            />
                        </Tooltip>
                    </div>
                </div>
            ),
        },
        {
            title: 'Loại',
            dataIndex: 'type',
            key: 'type',
            width: 100,
            render: (type) => {
                const config = typeConfig[type];
                return <Tag icon={config.icon} color={config.color}>{config.text}</Tag>;
            },
        },
        {
            title: 'Giá trị',
            key: 'value',
            width: 120,
            render: (_, record) => {
                if (record.type === 'percent') {
                    return <span className="promo-value">{record.value}%</span>;
                } else if (record.type === 'fixed') {
                    return <span className="promo-value">{record.value?.toLocaleString('vi-VN')}đ</span>;
                }
                return <span className="promo-value">Quà tặng</span>;
            },
        },
        {
            title: 'Thời gian',
            key: 'period',
            width: 180,
            render: (_, record) => (
                <div className="promo-period">
                    <span>{dayjs(record.startDate).format('DD/MM/YYYY')}</span>
                    <span className="period-separator">→</span>
                    <span>{dayjs(record.endDate).format('DD/MM/YYYY')}</span>
                </div>
            ),
        },
        {
            title: 'Sử dụng',
            key: 'usage',
            width: 150,
            render: (_, record) => {
                const percent = Math.round((record.usedCount / record.usageLimit) * 100);
                return (
                    <div className="usage-cell">
                        <span className="usage-text">{record.usedCount}/{record.usageLimit}</span>
                        <Progress 
                            percent={percent} 
                            size="small" 
                            showInfo={false}
                            strokeColor={percent >= 100 ? '#ff4d4f' : '#ff6b6b'}
                        />
                    </div>
                );
            },
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: 130,
            render: (status) => {
                const config = statusConfig[status];
                return <Tag color={config.color}>{config.text}</Tag>;
            },
        },
        {
            title: 'Thao tác',
            key: 'actions',
            width: 150,
            fixed: 'right',
            render: (_, record) => (
                <Space>
                    <Tooltip title={record.status === 'active' ? 'Tạm dừng' : 'Kích hoạt'}>
                        <Switch
                            size="small"
                            checked={record.status === 'active'}
                            onChange={() => handleToggleStatus(record)}
                            disabled={record.status === 'expired'}
                        />
                    </Tooltip>
                    <Tooltip title="Sửa">
                        <Button
                            type="text"
                            icon={<EditOutlined />}
                            onClick={() => handleEdit(record)}
                        />
                    </Tooltip>
                    <Popconfirm
                        title="Xóa khuyến mãi?"
                        description="Bạn có chắc chắn muốn xóa khuyến mãi này?"
                        onConfirm={() => handleDelete(record.id)}
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

    const filteredPromotions = promotions.filter(promo => {
        const matchesSearch = promo.name.toLowerCase().includes(searchText.toLowerCase()) ||
            promo.code.toLowerCase().includes(searchText.toLowerCase());
        const matchesStatus = statusFilter === 'all' || promo.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="promotion-management">
            <div className="page-header">
                <div className="header-left">
                    <h1>Quản lý khuyến mãi</h1>
                    <p>Quản lý mã giảm giá và chương trình khuyến mãi</p>
                </div>
                <div className="header-right">
                    <Button icon={<ExportOutlined />}>Xuất Excel</Button>
                    <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
                        Thêm khuyến mãi
                    </Button>
                </div>
            </div>

            <Card className="filter-card" bordered={false}>
                <div className="filter-row">
                    <Input
                        placeholder="Tìm theo tên, mã khuyến mãi..."
                        prefix={<SearchOutlined />}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{ width: 300 }}
                        allowClear
                    />
                    <Select
                        value={statusFilter}
                        onChange={setStatusFilter}
                        style={{ width: 180 }}
                    >
                        <Option value="all">Tất cả trạng thái</Option>
                        <Option value="active">Đang hoạt động</Option>
                        <Option value="inactive">Tạm dừng</Option>
                        <Option value="scheduled">Chờ kích hoạt</Option>
                        <Option value="expired">Đã hết hạn</Option>
                    </Select>
                    <Select
                        placeholder="Loại khuyến mãi"
                        style={{ width: 150 }}
                        allowClear
                    >
                        <Option value="percent">Giảm %</Option>
                        <Option value="fixed">Giảm tiền</Option>
                        <Option value="gift">Tặng quà</Option>
                    </Select>
                    <Button icon={<FilterOutlined />}>Lọc</Button>
                </div>
            </Card>

            <Card bordered={false} className="table-card">
                <Table
                    columns={columns}
                    dataSource={filteredPromotions}
                    loading={loading}
                    pagination={{
                        total: filteredPromotions.length,
                        pageSize: 10,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total) => `Tổng ${total} khuyến mãi`,
                    }}
                    scroll={{ x: 1100 }}
                />
            </Card>

            {/* Add/Edit Promotion Modal */}
            <Modal
                title={editingPromotion ? 'Sửa khuyến mãi' : 'Thêm khuyến mãi mới'}
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                width={600}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    initialValues={{ type: 'percent', status: 'active', usageLimit: 100 }}
                >
                    <Form.Item
                        name="name"
                        label="Tên khuyến mãi"
                        rules={[{ required: true, message: 'Vui lòng nhập tên khuyến mãi' }]}
                    >
                        <Input placeholder="Nhập tên khuyến mãi" />
                    </Form.Item>

                    <div style={{ display: 'flex', gap: 16 }}>
                        <Form.Item
                            name="code"
                            label="Mã khuyến mãi"
                            rules={[{ required: true, message: 'Vui lòng nhập mã' }]}
                            style={{ flex: 1 }}
                        >
                            <Input placeholder="VD: SALE20" style={{ textTransform: 'uppercase' }} />
                        </Form.Item>

                        <Form.Item
                            name="type"
                            label="Loại khuyến mãi"
                            rules={[{ required: true }]}
                            style={{ flex: 1 }}
                        >
                            <Select>
                                <Option value="percent">Giảm theo %</Option>
                                <Option value="fixed">Giảm tiền cố định</Option>
                                <Option value="gift">Tặng quà</Option>
                            </Select>
                        </Form.Item>
                    </div>

                    <div style={{ display: 'flex', gap: 16 }}>
                        <Form.Item
                            name="value"
                            label="Giá trị giảm"
                            style={{ flex: 1 }}
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                min={0}
                                placeholder="0"
                            />
                        </Form.Item>

                        <Form.Item
                            name="maxDiscount"
                            label="Giảm tối đa (đ)"
                            style={{ flex: 1 }}
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                min={0}
                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                placeholder="0"
                            />
                        </Form.Item>
                    </div>

                    <div style={{ display: 'flex', gap: 16 }}>
                        <Form.Item
                            name="minOrder"
                            label="Đơn tối thiểu (đ)"
                            style={{ flex: 1 }}
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                min={0}
                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                placeholder="0"
                            />
                        </Form.Item>

                        <Form.Item
                            name="usageLimit"
                            label="Giới hạn sử dụng"
                            rules={[{ required: true }]}
                            style={{ flex: 1 }}
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                min={1}
                                placeholder="100"
                            />
                        </Form.Item>
                    </div>

                    <Form.Item
                        name="dateRange"
                        label="Thời gian áp dụng"
                        rules={[{ required: true, message: 'Vui lòng chọn thời gian' }]}
                    >
                        <RangePicker 
                            style={{ width: '100%' }}
                            format="DD/MM/YYYY"
                            placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}
                        />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Mô tả"
                    >
                        <TextArea rows={2} placeholder="Nhập mô tả khuyến mãi" />
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
                        <Space>
                            <Button onClick={() => setIsModalVisible(false)}>Hủy</Button>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                {editingPromotion ? 'Cập nhật' : 'Thêm mới'}
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default PromotionManagement;
