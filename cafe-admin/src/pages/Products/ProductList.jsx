import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Modal, Form, message, Popconfirm, Space, Select, InputNumber, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, MinusCircleOutlined } from '@ant-design/icons';
import productService from '../../services/productService';
import materialService from '../../services/materialService';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchProducts();
        fetchMaterials();
    }, [searchText]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await productService.getAllProducts('', searchText);
            if (response.success) {
                setProducts(response.data);
            }
        } catch (error) {
            message.error('Không thể tải danh sách sản phẩm');
        } finally {
            setLoading(false);
        }
    };

    const fetchMaterials = async () => {
        try {
            const response = await materialService.getAllMaterials();
            if (response.success) {
                setMaterials(response.data);
            }
        } catch (error) {
            console.error('Failed to fetch materials');
        }
    };

    const handleCreate = () => {
        setEditingProduct(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleEdit = (record) => {
        setEditingProduct(record);
        form.setFieldsValue({
            ...record,
            recipes: record.recipes?.map(r => ({
                materialId: r.materialId,
                quantity: r.quantity
            }))
        });
        setIsModalVisible(true);
    };

    const handleDelete = async (id) => {
        try {
            const response = await productService.deleteProduct(id);
            if (response.success) {
                message.success('Xóa sản phẩm thành công');
                fetchProducts();
            }
        } catch (error) {
            message.error('Không thể xóa sản phẩm');
        }
    };

    const handleSubmit = async (values) => {
        try {
            const data = {
                name: values.name,
                category: values.category,
                price: values.price,
                unit: values.unit,
                image: values.image,
                recipes: values.recipes || []
            };

            if (editingProduct) {
                const response = await productService.updateProduct(editingProduct.id, data);
                if (response.success) {
                    message.success('Cập nhật sản phẩm thành công');
                }
            } else {
                const response = await productService.createProduct(data);
                if (response.success) {
                    message.success('Tạo sản phẩm thành công');
                }
            }
            setIsModalVisible(false);
            fetchProducts();
        } catch (error) {
            message.error(error.response?.data?.message || 'Có lỗi xảy ra');
        }
    };

    const columns = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Danh mục',
            dataIndex: 'category',
            key: 'category'
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (price) => `${price?.toLocaleString()} ₫`
        },
        {
            title: 'Đơn vị',
            dataIndex: 'unit',
            key: 'unit'
        },
        {
            title: 'Trạng thái',
            dataIndex: 'deleted',
            key: 'deleted',
            render: (deleted) => (
                <Tag color={deleted ? 'red' : 'green'}>
                    {deleted ? 'Ngưng bán' : 'Đang bán'}
                </Tag>
            )
        },
        {
            title: 'Công thức',
            dataIndex: 'recipes',
            key: 'recipes',
            render: (recipes) => `${recipes?.length || 0} nguyên liệu`
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Space>
                    <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                    >
                        Sửa
                    </Button>
                    <Popconfirm
                        title="Bạn có chắc muốn xóa?"
                        onConfirm={() => handleDelete(record.id)}
                    >
                        <Button type="link" danger icon={<DeleteOutlined />}>
                            Xóa
                        </Button>
                    </Popconfirm>
                </Space>
            )
        }
    ];

    return (
        <div>
            <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
                <h1>Quản lý sản phẩm</h1>
                <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
                    Thêm sản phẩm
                </Button>
            </div>

            <Input
                placeholder="Tìm kiếm sản phẩm..."
                prefix={<SearchOutlined />}
                style={{ marginBottom: '16px', width: '300px' }}
                onChange={(e) => setSearchText(e.target.value)}
                allowClear
            />

            <Table
                columns={columns}
                dataSource={products}
                loading={loading}
                rowKey="id"
                pagination={{ pageSize: 10 }}
            />

            <Modal
                title={editingProduct ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm mới'}
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onOk={() => form.submit()}
                width={800}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        name="name"
                        label="Tên sản phẩm"
                        rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item name="category" label="Danh mục">
                        <Input placeholder="Coffee, Tea, Smoothie..." />
                    </Form.Item>

                    <Form.Item
                        name="price"
                        label="Giá bán"
                        rules={[{ required: true, message: 'Vui lòng nhập giá' }]}
                    >
                        <InputNumber style={{ width: '100%' }} suffix="₫" />
                    </Form.Item>

                    <Form.Item name="unit" label="Đơn vị">
                        <Input placeholder="cup, glass, piece..." />
                    </Form.Item>

                    <Form.Item name="image" label="Hình ảnh">
                        <Input placeholder="image.jpg" />
                    </Form.Item>

                    <Form.Item label="Công thức (Nguyên liệu)">
                        <Form.List name="recipes">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(({ key, name, ...restField }) => (
                                        <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'materialId']}
                                                rules={[{ required: true, message: 'Chọn nguyên liệu' }]}
                                            >
                                                <Select placeholder="Chọn nguyên liệu" style={{ width: 300 }}>
                                                    {materials.map(m => (
                                                        <Select.Option key={m.id} value={m.id}>
                                                            {m.name} ({m.unit})
                                                        </Select.Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'quantity']}
                                                rules={[{ required: true, message: 'Nhập số lượng' }]}
                                            >
                                                <InputNumber placeholder="Số lượng" style={{ width: 150 }} />
                                            </Form.Item>
                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                        </Space>
                                    ))}
                                    <Form.Item>
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                            Thêm nguyên liệu
                                        </Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ProductList;
