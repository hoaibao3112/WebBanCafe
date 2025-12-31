import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message, Popconfirm, Space, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import accountService from '../../services/accountService';
import staffService from '../../services/staffService';

const AccountList = () => {
    const [accounts, setAccounts] = useState([]);
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingAccount, setEditingAccount] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchAccounts();
        fetchStaff();
    }, []);

    const fetchAccounts = async () => {
        try {
            setLoading(true);
            const response = await accountService.getAllAccounts();
            if (response.success) setAccounts(response.data);
        } catch (error) {
            message.error('Không thể tải danh sách tài khoản');
        } finally {
            setLoading(false);
        }
    };

    const fetchStaff = async () => {
        try {
            const response = await staffService.getAllStaff();
            if (response.success) setStaff(response.data);
        } catch (error) {
            console.error('Failed to fetch staff');
        }
    };

    const handleCreate = () => {
        setEditingAccount(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleSubmit = async (values) => {
        try {
            if (editingAccount) {
                const response = await accountService.updateAccount(editingAccount.id, values);
                if (response.success) message.success('Cập nhật tài khoản thành công');
            } else {
                const response = await accountService.createAccount(values);
                if (response.success) message.success('Tạo tài khoản thành công');
            }
            setIsModalVisible(false);
            fetchAccounts();
        } catch (error) {
            message.error(error.response?.data?.message || 'Có lỗi xảy ra');
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await accountService.deleteAccount(id);
            if (response.success) {
                message.success('Xóa tài khoản thành công');
                fetchAccounts();
            }
        } catch (error) {
            message.error('Không thể xóa tài khoản');
        }
    };

    const columns = [
        { title: 'Tên đăng nhập', dataIndex: 'username', key: 'username' },
        { title: 'Nhân viên', dataIndex: ['staff', 'name'], key: 'staff' },
        { title: 'Vai trò', dataIndex: ['role', 'name'], key: 'role' },
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
                <h1>Quản lý tài khoản</h1>
                <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
                    Thêm tài khoản
                </Button>
            </div>

            <Table columns={columns} dataSource={accounts} loading={loading} rowKey="id" />

            <Modal
                title="Tạo tài khoản mới"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onOk={() => form.submit()}
            >
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Form.Item name="username" label="Tên đăng nhập" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="password" label="Mật khẩu" rules={[{ required: true }]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item name="staffId" label="Nhân viên" rules={[{ required: true }]}>
                        <Select>
                            {staff.map(s => <Select.Option key={s.id} value={s.id}>{s.name}</Select.Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item name="roleId" label="Vai trò" rules={[{ required: true }]}>
                        <Select>
                            <Select.Option value={1}>ADMIN</Select.Option>
                            <Select.Option value={2}>STAFF</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AccountList;
