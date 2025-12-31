import React, { useState, useEffect } from 'react';
import { Form, Button, message, Card, Space, Select, InputNumber, Table } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import receiptService from '../../services/receiptService';
import productService from '../../services/productService';
import { useAuth } from '../../contexts/AuthContext';

const CreateReceipt = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const { user } = useAuth();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await productService.getAllProducts();
            if (response.success) setProducts(response.data.filter(p => !p.deleted));
        } catch (error) {
            console.error('Failed to fetch products');
        }
    };

    const handleSubmit = async (values) => {
        try {
            setLoading(true);
            const data = {
                staffId: user.staffId,
                items: values.items,
                received: values.received
            };

            const response = await receiptService.createReceipt(data);
            if (response.success) {
                message.success('Tạo đơn hàng thành công!');
                form.resetFields();
            }
        } catch (error) {
            message.error(error.response?.data?.message || 'Tạo đơn hàng thất bại');
        } finally {
            setLoading(false);
        }
    };

    const calculateTotal = () => {
        const items = form.getFieldValue('items') || [];
        return items.reduce((sum, item) => sum + ((item?.quantity || 0) * (item?.price || 0)), 0);
    };

    return (
        <div>
            <h1>Tạo đơn hàng mới</h1>

            <Card>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    initialValues={{ items: [{}] }}
                >
                    <Form.List name="items">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                        <Form.Item {...restField} name={[name, 'productId']} rules={[{ required: true, message: 'Chọn sản phẩm' }]}>
                                            <Select placeholder="Chọn sản phẩm" style={{ width: 300 }}
                                                onChange={(value) => {
                                                    const product = products.find(p => p.id === value);
                                                    const items = form.getFieldValue('items');
                                                    items[name].price = product?.price || 0;
                                                    form.setFieldsValue({ items });
                                                }}
                                            >
                                                {products.map(p => (
                                                    <Select.Option key={p.id} value={p.id}>
                                                        {p.name} - {p.price?.toLocaleString()}₫
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                        <Form.Item {...restField} name={[name, 'quantity']} rules={[{ required: true }]}>
                                            <InputNumber placeholder="Số lượng" min={1} />
                                        </Form.Item>
                                        <Form.Item {...restField} name={[name, 'price']} rules={[{ required: true }]}>
                                            <InputNumber placeholder="Giá" suffix="₫" />
                                        </Form.Item>
                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                    </Space>
                                ))}
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>Thêm sản phẩm</Button>
                            </>
                        )}
                    </Form.List>

                    <div style={{ marginTop: '24px', padding: '16px', background: '#fafafa', borderRadius: '8px' }}>
                        <h3>Tổng tiền: {calculateTotal().toLocaleString()}₫</h3>
                        <Form.Item name="received" label="Tiền khách đưa" rules={[{ required: true }]}>
                            <InputNumber style={{ width: '100%' }} suffix="₫" min={calculateTotal()} />
                        </Form.Item>
                        <p>Tiền thừa: {((form.getFieldValue('received') || 0) - calculateTotal()).toLocaleString()}₫</p>
                    </div>

                    <Form.Item style={{ marginTop: '24px' }}>
                        <Button type="primary" htmlType="submit" loading={loading} size="large" block>
                            Tạo đơn hàng
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default CreateReceipt;
