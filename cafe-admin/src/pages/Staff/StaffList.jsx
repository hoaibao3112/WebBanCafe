import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Space, Modal, Form, message, Popconfirm, DatePicker } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import staffService from '../../services/staffService';
import moment from 'moment';

const StaffList = () => {
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingStaff, setEditingStaff] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchStaff();
    }, [searchText]);

    const fetchStaff = async () => {
        try {
            setLoading(true);
            const response = await staffService.getAllStaff(searchText);
            if (response.success) {
                setStaff(response.data);
            }
        } catch (error) {
            message.error('Không thể tải danh sách nhân viên');
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setEditingStaff(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleEdit = (record) => {
        setEditingStaff(record);
        form.setFieldsValue({
            ...record,
            birthdate: record.birthdate ? moment(record.birthdate) : null
        });
        setIsModalVisible(true);
    };

    const handleDelete = async (id) => {
        try {
            const response = await staffService.deleteStaff(id);
            if (response.success) {
                message.success('Xóa nhân viên thành công');
                fetchStaff();
            }
        } catch (error) {
            message.error('Không thể xóa nhân viên');
        }
    };

    const handleSubmit = async (values) => {
        try {
            const data = {
                ...values,
                birthdate: values.birthdate ? values.birthdate.format('YYYY-MM-DD') : null,
                gender: values.gender === 'male'
            };

            if (editingStaff) {
                const response = await staffService.updateStaff(editingStaff.id, data);
                if (response.success) {
                    message.success('Cập nhật nhân viên thành công');
                }
            } else {
                const response = await staffService.createStaff(data);
                if (response.success) {
                    message.success('Tạo nhân viên thành công');
                }
            }
            setIsModalVisible(false);
            fetchStaff();
        } catch (error) {
            message.error(error.response?.data?.message || 'Có lỗi xảy ra');
        }
    };

    const columns = [
        {
            title: 'Mã NV',
            dataIndex: 'no',
            key: 'no',
            width: 100
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Giới tính',
            dataIndex: 'gender',
            key: 'gender',
            render: (gender) => gender ? 'Nam' : 'Nữ'
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Lương/giờ',
            dataIndex: 'hourlyWage',
            key: 'hourlyWage',
            render: (wage) => `${wage?.toLocaleString() || 0} ₫`
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
                        okText="Có"
                        cancelText="Không"
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
                <h1>Quản lý nhân viên</h1>
                <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
                    Thêm nhân viên
                </Button>
            </div>

            <Input
                placeholder="Tìm kiếm theo tên, mã, email..."
                prefix={<SearchOutlined />}
                style={{ marginBottom: '16px', width: '300px' }}
                onChange={(e) => setSearchText(e.target.value)}
                allowClear
            />

            <Table
                columns={columns}
                dataSource={staff}
                loading={loading}
                rowKey="id"
                pagination={{ pageSize: 10 }}
            />

            <Modal
                title={editingStaff ? 'Cập nhật nhân viên' : 'Thêm nhân viên mới'}
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onOk={() => form.submit()}
                width={700}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        name="no"
                        label="Mã nhân viên"
                        rules={[{ required: true, message: 'Vui lòng nhập mã nhân viên' }]}
                    >
                        <Input placeholder="ST001" />
                    </Form.Item>

                    <Form.Item
                        name="name"
                        label="Tên nhân viên"
                        rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item name="gender" label="Giới tính">
                        <Input placeholder="male/female" />
                    </Form.Item>

                    <Form.Item name="birthdate" label="Ngày sinh">
                        <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                    </Form.Item>

                    <Form.Item name="phone" label="Số điện thoại">
                        <Input />
                    </Form.Item>

                    <Form.Item name="email" label="Email">
                        <Input type="email" />
                    </Form.Item>

                    <Form.Item name="address" label="Địa chỉ">
                        <Input.TextArea rows={2} />
                    </Form.Item>

                    <Form.Item name="hourlyWage" label="Lương theo giờ">
                        <Input type="number" suffix="₫" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default StaffList;
