import React, { useState } from 'react';
import {
    Table, Card, Button, Input, Select, Tag, Space, Modal, Form,
    Upload, InputNumber, Switch, message, Tooltip, Image, Popconfirm
} from 'antd';
import {
    SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined,
    UploadOutlined, ExportOutlined, FilterOutlined
} from '@ant-design/icons';
import './ProductManagement.css';

const { Option } = Select;
const { TextArea } = Input;

const ProductManagement = () => {
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [form] = Form.useForm();

    // Mock product data
    const [products, setProducts] = useState([
        {
            key: '1',
            id: 'SP001',
            name: 'Trà sữa trân châu',
            image: 'https://images.unsplash.com/photo-1558857563-c42a7c0f19f0?w=100',
            category: 'Trà sữa',
            price: 35000,
            originalPrice: 40000,
            description: 'Trà sữa thơm ngon với trân châu dai giòn',
            status: 'active',
            stock: 100,
            sold: 1250,
        },
        {
            key: '2',
            id: 'SP002',
            name: 'Matcha Latte',
            image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=100',
            category: 'Trà sữa',
            price: 40000,
            originalPrice: null,
            description: 'Matcha Nhật Bản kết hợp sữa tươi',
            status: 'active',
            stock: 80,
            sold: 890,
        },
        {
            key: '3',
            id: 'SP003',
            name: 'Hồng trà sữa',
            image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=100',
            category: 'Trà sữa',
            price: 32000,
            originalPrice: null,
            description: 'Hồng trà Ceylon đậm đà',
            status: 'active',
            stock: 120,
            sold: 756,
        },
        {
            key: '4',
            id: 'SP004',
            name: 'Trà đào cam sả',
            image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=100',
            category: 'Trà trái cây',
            price: 35000,
            originalPrice: null,
            description: 'Trà thanh mát với đào, cam và sả',
            status: 'active',
            stock: 90,
            sold: 623,
        },
        {
            key: '5',
            id: 'SP005',
            name: 'Sữa tươi trân châu đường đen',
            image: 'https://images.unsplash.com/photo-1541696490-8744a5dc0228?w=100',
            category: 'Sữa tươi',
            price: 38000,
            originalPrice: 42000,
            description: 'Sữa tươi với đường đen Okinawa',
            status: 'inactive',
            stock: 0,
            sold: 445,
        },
    ]);

    const categories = ['Trà sữa', 'Trà trái cây', 'Sữa tươi', 'Cà phê', 'Sinh tố', 'Topping'];

    const handleAdd = () => {
        setEditingProduct(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleEdit = (record) => {
        setEditingProduct(record);
        form.setFieldsValue(record);
        setIsModalVisible(true);
    };

    const handleDelete = (id) => {
        setProducts(products.filter(p => p.id !== id));
        message.success('Đã xóa sản phẩm');
    };

    const handleSubmit = async (values) => {
        setLoading(true);
        
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            
            if (editingProduct) {
                setProducts(products.map(p => 
                    p.id === editingProduct.id ? { ...p, ...values } : p
                ));
                message.success('Đã cập nhật sản phẩm');
            } else {
                const newProduct = {
                    ...values,
                    key: Date.now().toString(),
                    id: `SP${(products.length + 1).toString().padStart(3, '0')}`,
                    sold: 0,
                };
                setProducts([...products, newProduct]);
                message.success('Đã thêm sản phẩm mới');
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
            title: 'Sản phẩm',
            key: 'product',
            width: 300,
            render: (_, record) => (
                <div className="product-cell">
                    <Image
                        src={record.image}
                        alt={record.name}
                        width={60}
                        height={60}
                        style={{ borderRadius: 8, objectFit: 'cover' }}
                        fallback="https://via.placeholder.com/60"
                    />
                    <div className="product-info">
                        <span className="product-name">{record.name}</span>
                        <span className="product-id">{record.id}</span>
                    </div>
                </div>
            ),
        },
        {
            title: 'Danh mục',
            dataIndex: 'category',
            key: 'category',
            width: 120,
            render: (category) => <Tag color="blue">{category}</Tag>,
        },
        {
            title: 'Giá bán',
            key: 'price',
            width: 150,
            render: (_, record) => (
                <div className="price-cell">
                    <span className="current-price">{record.price.toLocaleString('vi-VN')}đ</span>
                    {record.originalPrice && (
                        <span className="original-price">{record.originalPrice.toLocaleString('vi-VN')}đ</span>
                    )}
                </div>
            ),
        },
        {
            title: 'Tồn kho',
            dataIndex: 'stock',
            key: 'stock',
            width: 100,
            render: (stock) => (
                <span className={`stock ${stock === 0 ? 'out-of-stock' : stock < 20 ? 'low-stock' : ''}`}>
                    {stock}
                </span>
            ),
        },
        {
            title: 'Đã bán',
            dataIndex: 'sold',
            key: 'sold',
            width: 100,
            render: (sold) => <span>{sold.toLocaleString()}</span>,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: 120,
            render: (status) => (
                <Tag color={status === 'active' ? 'success' : 'default'}>
                    {status === 'active' ? 'Còn hàng' : 'Hết hàng'}
                </Tag>
            ),
        },
        {
            title: 'Thao tác',
            key: 'actions',
            width: 120,
            fixed: 'right',
            render: (_, record) => (
                <Space>
                    <Tooltip title="Sửa">
                        <Button
                            type="text"
                            icon={<EditOutlined />}
                            onClick={() => handleEdit(record)}
                        />
                    </Tooltip>
                    <Popconfirm
                        title="Xóa sản phẩm?"
                        description="Bạn có chắc chắn muốn xóa sản phẩm này?"
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

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchText.toLowerCase()) ||
            product.id.toLowerCase().includes(searchText.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="product-management">
            <div className="page-header">
                <div className="header-left">
                    <h1>Quản lý sản phẩm</h1>
                    <p>Quản lý danh sách sản phẩm của cửa hàng</p>
                </div>
                <div className="header-right">
                    <Button icon={<ExportOutlined />}>Xuất Excel</Button>
                    <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
                        Thêm sản phẩm
                    </Button>
                </div>
            </div>

            <Card className="filter-card" bordered={false}>
                <div className="filter-row">
                    <Input
                        placeholder="Tìm theo tên, mã sản phẩm..."
                        prefix={<SearchOutlined />}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{ width: 300 }}
                        allowClear
                    />
                    <Select
                        value={categoryFilter}
                        onChange={setCategoryFilter}
                        style={{ width: 150 }}
                    >
                        <Option value="all">Tất cả danh mục</Option>
                        {categories.map(cat => (
                            <Option key={cat} value={cat}>{cat}</Option>
                        ))}
                    </Select>
                    <Select
                        placeholder="Trạng thái"
                        style={{ width: 150 }}
                        allowClear
                    >
                        <Option value="active">Còn hàng</Option>
                        <Option value="inactive">Hết hàng</Option>
                    </Select>
                    <Button icon={<FilterOutlined />}>Lọc</Button>
                </div>
            </Card>

            <Card bordered={false} className="table-card">
                <Table
                    columns={columns}
                    dataSource={filteredProducts}
                    loading={loading}
                    pagination={{
                        total: filteredProducts.length,
                        pageSize: 10,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total) => `Tổng ${total} sản phẩm`,
                    }}
                    scroll={{ x: 1000 }}
                />
            </Card>

            {/* Add/Edit Product Modal */}
            <Modal
                title={editingProduct ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                width={600}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    initialValues={{ status: 'active', stock: 100 }}
                >
                    <Form.Item
                        name="name"
                        label="Tên sản phẩm"
                        rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
                    >
                        <Input placeholder="Nhập tên sản phẩm" />
                    </Form.Item>

                    <Form.Item
                        name="category"
                        label="Danh mục"
                        rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
                    >
                        <Select placeholder="Chọn danh mục">
                            {categories.map(cat => (
                                <Option key={cat} value={cat}>{cat}</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <div style={{ display: 'flex', gap: 16 }}>
                        <Form.Item
                            name="price"
                            label="Giá bán"
                            rules={[{ required: true, message: 'Vui lòng nhập giá' }]}
                            style={{ flex: 1 }}
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                placeholder="0"
                                min={0}
                                addonAfter="đ"
                            />
                        </Form.Item>

                        <Form.Item
                            name="originalPrice"
                            label="Giá gốc (nếu giảm giá)"
                            style={{ flex: 1 }}
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                placeholder="0"
                                min={0}
                                addonAfter="đ"
                            />
                        </Form.Item>
                    </div>

                    <Form.Item
                        name="stock"
                        label="Số lượng tồn kho"
                        rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}
                    >
                        <InputNumber style={{ width: '100%' }} min={0} placeholder="0" />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Mô tả sản phẩm"
                    >
                        <TextArea rows={3} placeholder="Nhập mô tả sản phẩm" />
                    </Form.Item>

                    <Form.Item
                        name="image"
                        label="Hình ảnh"
                    >
                        <Input placeholder="URL hình ảnh" />
                    </Form.Item>

                    <Form.Item
                        name="status"
                        label="Trạng thái"
                        valuePropName="checked"
                    >
                        <Switch 
                            checkedChildren="Còn hàng" 
                            unCheckedChildren="Hết hàng"
                            defaultChecked
                        />
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
                        <Space>
                            <Button onClick={() => setIsModalVisible(false)}>Hủy</Button>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                {editingProduct ? 'Cập nhật' : 'Thêm mới'}
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ProductManagement;
