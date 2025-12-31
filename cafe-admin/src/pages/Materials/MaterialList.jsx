import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message, Popconfirm, Space, InputNumber, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import materialService from '../../services/materialService';

const MaterialList = () => {
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingMaterial, setEditingMaterial] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchMaterials();
    }, [searchText]);

    const fetchMaterials = async () => {
        try {
            setLoading(true);
            const response = await materialService.getAllMaterials(searchText);
            if (response.success) setMaterials(response.data);
        } catch (error) {
            message.error('Không thể tải danh sách nguyên liệu');
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setEditingMaterial(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleEdit = (record) => {
        setEditingMaterial(record);
        form.setFieldsValue(record);
        setIsModalVisible(true);
    };

    const handleDelete = async (id) => {
        try {
            const response = await materialService.deleteMaterial(id);
            if (response.success) {
                message.success('Xóa nguyên liệu thành công');
                fetchMaterials();
            }
        } catch (error) {
            message.error('Không thể xóa nguyên liệu');
        }
    };

    const handleSubmit = async (values) => {
        try {
            if (editingMaterial) {
                const response = await materialService.updateMaterial(editingMaterial.id, values);
                if (response.success) message.success('Cập nhật nguyên liệu thành công');
            } else {
                const response = await materialService.createMaterial(values);
                if (response.success) message.success('Tạo nguyên liệu thành công');
            }
            setIsModalVisible(false);
            fetchMaterials();
        } catch (error) {
            message.error(error.response?.data?.message || 'Có lỗi xảy ra');
        }
    };

    const columns = [
        { title: 'Tên nguyên liệu', dataIndex: 'name', key: 'name' },
        { title: 'Đơn vị', dataIndex: 'unit', key: 'unit' },
        {
            title: 'Tồn kho',
            dataIndex: 'remain',
            key: 'remain',
            render: (val, record) => (
                <span style={{ color: val < 10 ? 'red' : 'inherit' }}>
                    {val} {record.unit}
                </span>
            )
        },
        { title: 'Nhà cung cấp', dataIndex: ['supplier', 'name'], key: 'supplier' },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Space>
                    <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)}>Sửa</Button>
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
                <h1>Quản lý nguyên liệu</h1>
                <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
                    Thêm nguyên liệu
                </Button>
            </div>

            <Input
                placeholder="Tìm kiếm nguyên liệu..."
                prefix={<SearchOutlined />}
                style={{ marginBottom: '16px', width: '300px' }}
                onChange={(e) => setSearchText(e.target.value)}
                allowClear
            />

            <Table columns={columns} dataSource={materials} loading={loading} rowKey="id" />

            <Modal
                title={editingMaterial ? 'Cập nhật nguyên liệu' : 'Thêm nguyên liệu mới'}
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onOk={() => form.submit()}
            >
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Form.Item name="name" label="Tên nguyên liệu" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="unit" label="Đơn vị" rules={[{ required: true }]}>
                        <Input placeholder="kg, lít, hộp..." />
                    </Form.Item>
                    <Form.Item name="supplierId" label="Nhà cung cấp ID">
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default MaterialList;
