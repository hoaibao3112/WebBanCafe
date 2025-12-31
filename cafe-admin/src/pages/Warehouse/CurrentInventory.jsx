import React, { useState, useEffect } from 'react';
import { Table, message, Tag } from 'antd';
import warehouseService from '../../services/warehouseService';

const CurrentInventory = () => {
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchInventory();
    }, []);

    const fetchInventory = async () => {
        try {
            setLoading(true);
            const response = await warehouseService.getInventory();
            if (response.success) setInventory(response.data);
        } catch (error) {
            message.error('Không thể tải tồn kho');
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        { title: 'Nguyên liệu', dataIndex: 'name', key: 'name' },
        { title: 'Đơn vị', dataIndex: 'unit', key: 'unit' },
        {
            title: 'Số lượng',
            dataIndex: 'remain',
            key: 'remain',
            render: (val, record) => (
                <span style={{
                    color: val < 10 ? 'red' : 'inherit',
                    fontWeight: val < 10 ? 'bold' : 'normal'
                }}>
                    {val} {record.unit}
                </span>
            )
        },
        {
            title: 'Trạng thái',
            key: 'status',
            render: (_, record) => (
                record.remain < 10 ?
                    <Tag color="red">⚠️ Sắp hết</Tag> :
                    <Tag color="green">✓ Đủ</Tag>
            )
        }
    ];

    return (
        <div>
            <h1>Tồn kho hiện tại</h1>
            <Table columns={columns} dataSource={inventory} loading={loading} rowKey="id" />
        </div>
    );
};

export default CurrentInventory;
