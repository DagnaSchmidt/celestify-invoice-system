import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Descriptions, Button, Spin, Alert, Card, Table } from 'antd';
import { useParams } from 'react-router-dom';
import { InvoiceWithLineItems } from '../../api/db/schema';

const ViewInvoice: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [invoice, setInvoice] = useState<InvoiceWithLineItems | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const columns = [
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount: string | number) => `$${Number(amount).toFixed(2)}`,
        },
    ];

    useEffect(() => {
        async function fetchInvoice() {
            try {
                const response = await axios.get(`/api/invoice/${id}`);
                setInvoice(response.data);
            } catch (err) {
                console.error('Error fetching invoice:', err);
                setError('Error fetching the invoice');
            } finally {
                setLoading(false);
            }
        }

        fetchInvoice();
    }, [id]);

    return (
        <div>
            <Card
                title={`Invoice #${id}`}
                extra={[
                    <Button key="1" type="primary">
                        Print Invoice
                    </Button>,
                ]}
                style={{ marginBottom: '20px' }}
            />
            {loading ? (
                <Spin size="large" />
            ) : error ? (
                <Alert message={error} type="error" />
            ) : (
                <Descriptions title="Invoice Details" bordered>
                    <Descriptions.Item label="Invoice ID">{invoice?.id}</Descriptions.Item>
                    <Descriptions.Item label="Customer Details">{invoice?.customerDetails}</Descriptions.Item>
                    <Descriptions.Item label="Date">
                        {invoice?.date ? new Date(invoice.date).toLocaleDateString() : 'N/A'}
                    </Descriptions.Item>
                    <Descriptions.Item label="Total Amount">${Number(invoice?.totalAmount).toFixed(2)}</Descriptions.Item>
                </Descriptions>
            )}

            <div style={{ marginTop: '20px' }}>
            <Table
                            dataSource={invoice?.lineItems}
                            columns={columns}
                            pagination={false}
                            rowKey="id"
                            summary={() => (
                                <Table.Summary.Row>
                                    <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
                                    <Table.Summary.Cell index={0} />
                                    <Table.Summary.Cell index={0}>
                                        ${Number(invoice?.totalAmount).toFixed(2)}
                                    </Table.Summary.Cell>
                                </Table.Summary.Row>
                            )}
                        />
            </div>
        </div>
    );
};

export default ViewInvoice;
