import { useState, useEffect } from 'react';
import { message, Spin } from 'antd';
import axios from 'axios';
import { Invoice } from '../../api/db/schema';
import { useNavigate } from 'react-router-dom';
import { InvoiceTable } from '@/components/InvoiceTable';

function Invoices() {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    async function fetchInvoices() {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('/api/invoice');
            setInvoices(response.data);
        } catch (err) {
            setError('Failed to load invoices.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInvoices();
    }, []);

    async function handleDelete(id: number) {
        setLoading(true);
        try {
            await axios.delete(`/api/invoice/${id}`);
            message.success('Invoice deleted successfully');
            fetchInvoices();
        } catch (err) {
            message.error('Failed to delete invoice');
            console.error(err);
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="text-center p-5">
                <Spin tip="Loading invoices..." />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-600 p-5 text-center">
                {error}
            </div>
        );
    }

    return (
        <div className="max-w-[900px] mx-auto p-4" >
            <h2>Invoices</h2>
            <InvoiceTable
                invoices={invoices}
                onDelete={handleDelete}
                onView={(id) => navigate(`/invoice/${id}`)}
                onEdit={(id) => navigate(`/invoice/edit/${id}`)}
            />
        </div>
    );
}

export { Invoices };
