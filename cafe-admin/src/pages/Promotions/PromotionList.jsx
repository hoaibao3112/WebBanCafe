import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, message, Popconfirm, Space, DatePicker, Select, InputNumber, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, MinusCircleOutlined } from '@ant-design/icons';
import promotionService from '../../services/promotionService';
import productService from '../../services/productService';

const PromotionList = () => {
    const [promotions, setPromotions] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingPromotion, setEditingPromotion] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchPromotions();
        fetchProducts();
    }, []);

    const fetchPromotions = async () => {
        try {
            setLoading(true);
            const response = await promotionService.getAllPromotions();
            if (response.success) setPromotions(response.data);
        } catch (error) {
            message.error('Không thể tải danh sách khuyến mãi');
        } finally {
            setLoading(false);
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await productService.getAllProducts();
            if (response.success) setProducts(response.data);
        } catch (error) {
            console.error('Failed to fetch products');
        }
    };

    const handleCreate = () => {
        setEditingPromotion(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleSubmit = async (values) => {
        try {
            const data = {
                startDate: values.startDate?.format('YYYY-MM-DD'),
                endDate: values.endDate?.format('YYYY-MM-DD'),
                status: true,
                products: values.products || []
            };

            if (editingPromotion) {
                const response = await promotionService.updatePromotion(editingPromotion.id, data);
                if (response.success) message.success('Cập nhật thành công');
            } else {
                const response = await promotionService.createPromotion(data);
                if (response.success) message.success('Tạo khuyến mãi thành công');
            }
            setIsModalVisible(false);
            fetchPromotions();
        } catch (error) {
            message.error(error.response?.data?.message || 'Có lỗi xảy ra');
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await promotionService.deletePromotion(id);
            if (response.success) {
                message.success('Xóa khuyến mãi thành công');
                fetchPromotions();
            }
        } catch (error) {
            message.error('Không thể xóa khuyến mãi');
        }
    };

    const toggleStatus = async (id, currentStatus) => {
        try {
            await promotionService.updateStatus(id, !currentStatus);
            message.success('Cập nhật trạng thái thành công');
            fetchPromotions();
        } catch (error) {
            message.error('Không thể cập nhật trạng thái');
        }
    };

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id', width: 60 },
        { title: 'Ngày bắt đầu', dataIndex: 'startDate', key: 'startDate' },
        { title: 'Ngày kết thúc', dataIndex: 'endDate', key: 'endDate' },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status, record) => (
                <Tag color={status ? 'green' : 'red'} style={{ cursor: 'pointer' }}
                    onClick={() => toggleStatus(record.id, status)}
                >
                    {status ? 'Đang áp dụng' : 'Tạm ngưng'}
                </Tag>
            )
        },
        {
            title: 'Số sản phẩm',
            dataIndex: 'details',
            key: 'details',
            render: (details) => details?.length || 0
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Space>
                    <Popconfirm title="Bạn có chắc muốn xóa?" onConfirm={() => handleDelete(record.id)}>
                        <Button type="link" danger icon={<DeleteOutlined />}>Xóa</Button>
                    </Popconfirm>
                </Space>
            )
        }
    ];

    return (
        <div>
            <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
                <h1>Quản lý khuyến mãi</h1>
                <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
                    Tạo khuyến mãi
                </Button>
            </div>

            <Table columns={columns} dataSource={promotions} loading={loading} rowKey="id" />

            <Modal
                title="Tạo khuyến mãi mới"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onOk={() => form.submit()}
                width={700}
            >
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Form.Item name="startDate" label="Ngày bắt đầu" rules={[{ required: true }]}>
                        <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                    </Form.Item>
                    <Form.Item name="endDate" label="Ngày kết thúc" rules={[{ required: true }]}>
                        <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                    </Form.Item>

                    <Form.List name="products">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                        <Form.Item {...restField} name={[name, 'productId']} rules={[{ required: true }]}>
                                            <Select placeholder="Chọn sản phẩm" style={{ width: 300 }}>
                                                {products.map(p => <Select.Option key={p.id} value={p.id}>{p.name}</Select.Option>)}
                                            </Select>
                                        </Form.Item>
                                        <Form.Item {...restField} name={[name, 'percent']} rules={[{ required: true }]}>
                                            <InputNumber placeholder="% Giảm" min={0} max={100} suffix="%" />
                                        </Form.Item>
                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                    </Space>
                                ))}
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>Thêm sản phẩm</Button>
                            </>
                        )}
                    </Form.List>
                </Form>
            </Modal>
        </div>
    );
};

export default PromotionList;
