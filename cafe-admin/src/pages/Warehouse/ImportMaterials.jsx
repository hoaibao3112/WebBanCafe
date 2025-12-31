import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, message, Space, InputNumber, Select, DatePicker } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import warehouseService from '../../services/warehouseService';
import materialService from '../../services/materialService';
import { useAuth } from '../../contexts/AuthContext';

const ImportMaterials = () => {
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const { user } = useAuth();

    useEffect(() => {
        fetchMaterials();
    }, []);

    const fetchMaterials = async () => {
        try {
            const response = await materialService.getAllMaterials();
            if (response.success) setMaterials(response.data);
        } catch (error) {
            console.error('Failed to fetch materials');
        }
    };

    const handleSubmit = async (values) => {
        try {
            setLoading(true);
            const data = {
                staffId: user.staffId,
                receivedDate: values.receivedDate?.format('YYYY-MM-DD') || new Date().toISOString().split('T')[0],
                shipments: values.shipments.map(s => ({
                    ...s,
                    mfg: s.mfg?.format('YYYY-MM-DD'),
                    exp: s.exp?.format('YYYY-MM-DD')
                }))
            };

            const response = await warehouseService.importMaterials(data);
            if (response.success) {
                message.success('Nhập kho thành công!');
                setIsModalVisible(false);
                form.resetFields();
            }
        } catch (error) {
            message.error(error.response?.data?.message || 'Nhập kho thất bại');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
                <h1>Nhập kho</h1>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
                    Nhập nguyên liệu
                </Button>
            </div>

            <Modal
                title="Nhập nguyên liệu"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onOk={() => form.submit()}
                width={900}
                confirmLoading={loading}
            >
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Form.Item name="receivedDate" label="Ngày nhập">
                        <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                    </Form.Item>

                    <Form.List name="shipments">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <div key={key} style={{ display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
                                        <Form.Item {...restField} name={[name, 'materialId']} rules={[{ required: true }]} style={{ flex: 1, minWidth: 200 }}>
                                            <Select placeholder="Nguyên liệu">
                                                {materials.map(m => <Select.Option key={m.id} value={m.id}>{m.name}</Select.Option>)}
                                            </Select>
                                        </Form.Item>
                                        <Form.Item {...restField} name={[name, 'quantity']} rules={[{ required: true }]} style={{ width: 100 }}>
                                            <InputNumber placeholder="Số lượng" style={{ width: '100%' }} />
                                        </Form.Item>
                                        <Form.Item {...restField} name={[name, 'unitPrice']} rules={[{ required: true }]} style={{ width: 120 }}>
                                            <InputNumber placeholder="Đơn giá" style={{ width: '100%' }} />
                                        </Form.Item>
                                        <Form.Item {...restField} name={[name, 'mfg']} style={{ width: 150 }}>
                                            <DatePicker placeholder="Ngày SX" style={{ width: '100%' }} />
                                        </Form.Item>
                                        <Form.Item {...restField} name={[name, 'exp']} style={{ width: 150 }}>
                                            <DatePicker placeholder="Hạn SD" style={{ width: '100%' }} />
                                        </Form.Item>
                                        <MinusCircleOutlined onClick={() => remove(name)} style={{ marginTop: 8 }} />
                                    </div>
                                ))}
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>Thêm nguyên liệu</Button>
                            </>
                        )}
                    </Form.List>
                </Form>
            </Modal>
        </div>
    );
};

export default ImportMaterials;
