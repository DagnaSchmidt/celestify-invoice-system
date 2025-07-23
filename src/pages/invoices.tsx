import { useState, useEffect } from 'react';
import { Table, Container, Button } from 'reactstrap';
import axios from 'axios';
import { Invoice } from '../../api/db/schema';
import { useNavigate } from 'react-router-dom';

function Invoices() {
    const [invoices, setInvoices] = useState<Invoice[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchInvoices() {
            try {
                const response = await axios.get('api/invoice');
                setInvoices(response.data);
            } catch (error) {
                console.error('Error fetching the invoices', error);
            }
        }

        fetchInvoices();
    }, []);

    return (
        <Container>
            <h2>Invoices</h2>
            <Table striped>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Customer Details</th>
                        <th>Date</th>
                        <th>Total Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((invoice: Invoice) => (
                        <tr key={invoice.id}>
                            <td>{invoice.id}</td>
                            <td>{invoice.customerDetails}</td>
                            <td>{new Date(invoice.date).toLocaleDateString()}</td>
                            <td>${Number(invoice.totalAmount).toFixed(2)}</td>
                            <td>
                                <Button color="primary" onClick={() => navigate(`/invoice/${invoice.id}`)}>View</Button>
                                {/* TODO:Add Edit, Delete buttons */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export { Invoices };
