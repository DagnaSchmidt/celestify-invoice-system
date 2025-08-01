import { Table, Button, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { Invoice } from '../../api/db/schema';

const { confirm } = Modal;

interface InvoiceTableProps {
    invoices: Invoice[];
    onDelete: (id: number) => void;
    onView: (id: number) => void;
    onEdit: (id: number) => void;
}

export function InvoiceTable({ invoices, onDelete, onView, onEdit }: InvoiceTableProps) {
    function showDeleteConfirm(id: number) {
        confirm({
            title: 'Are you sure you want to delete this invoice?',
            content: 'This action cannot be undone.',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                onDelete(id);
            },
            onCancel() {

            },
        });
    }

    const columns: ColumnsType<Invoice> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            responsive: ['md'],
        },
        {
            title: 'Customer Details',
            dataIndex: 'customerDetails',
            key: 'customerDetails',
            responsive: ['sm'],
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (date: string) => new Date(date).toLocaleDateString(),
        },
        {
            title: 'Total Amount',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            render: (amount: number | string) => `$${Number(amount).toFixed(2)}`,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <div className="flex flex-col sm:flex-row sm:items-center">
                    <Button type="link" onClick={() => onView(record.id)} style={{ marginRight: 8 }}>
                        View
                    </Button>
                    <Button type="link" onClick={() => onEdit(record.id)} style={{ marginRight: 8 }}>
                        Edit
                    </Button>
                    <Button danger type="link" onClick={() => showDeleteConfirm(record.id)}>
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={invoices}
            rowKey="id"
            pagination={{ pageSize: 10 }}
            bordered
            scroll={{ x: 'max-content' }}
        />
    );
}
