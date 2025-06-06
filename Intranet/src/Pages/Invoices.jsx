import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';

import InvoicesTable from '../Components/Table/InvoicesTable';
import AddInvoiceModal from '../Components/Modal/AddInvoiceModal';
import EditInvoiceModal from '../Components/Modal/EditInvoiceModal';

axios.defaults.baseURL = 'http://localhost:5029';

const Invoices = () => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [editInv, setEditInv] = useState(null);

  
    const fetchInvoices = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await axios.get('/api/invoices');
            setInvoices(data);
        } catch (err) {
            console.error(err);
            setError(err.response ? `Server returned ${err.response.status}` : err.message);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => { fetchInvoices(); }, []);

   
    const handleAdd = async (payload) => {
       
        console.debug('[AddInvoice] payload →', payload);

        try {
            const { data } = await axios.post('/api/invoices', payload);

            
            console.debug('[AddInvoice] response data →', data);

            setInvoices((prev) => [...prev, data]);
            setShowAdd(false);
        } catch (err) {
            
            console.error('[AddInvoice] error →', err);
            if (err.response) {
                console.error('status:', err.response.status);
                console.error('data  :', err.response.data);
            }
            setError('Failed to add invoice');
        }
    };
   
    const handleEditClick = (inv) => {
        setEditInv(inv);
        setShowEdit(true);
    };

    const handleEditSave = async (payload) => {
        payload.id = Number(payload.id); 
        try {
            await axios.put(`/api/invoices/${payload.id}`, payload);
            setInvoices((prev) =>
                prev.map((i) => (i.id === payload.id ? { ...i, ...payload } : i))
            );
            setShowEdit(false);
            setEditInv(null);
        } catch {
            setError('Failed to update invoice');
        }
    };

  
    const handleDelete = async (id) => {
        if (!window.confirm('Delete this invoice?')) return;
        try {
            await axios.delete(`/api/invoices/${id}`);
            setInvoices((prev) => prev.filter((i) => i.id !== id));
        } catch {
            setError('Failed to delete invoice');
        }
    };

    
    return (
        <Container fluid className="p-4">
          
            <Row className="mb-3">
                <Col>
                    <Button onClick={() => setShowAdd(true)} className="me-2">
                        Add Invoice
                    </Button>
                    <Button variant="outline-secondary" onClick={fetchInvoices}>
                        Refresh
                    </Button>
                </Col>
            </Row>

          
            {error && <Alert variant="danger">{error}</Alert>}

      
            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" />
                </div>
            ) : (
                <InvoicesTable
                    invoices={invoices}
                    onEdit={handleEditClick}
                    onDelete={handleDelete}
                />
            )}

           
            <AddInvoiceModal
                show={showAdd}
                onHide={() => setShowAdd(false)}
                onSave={handleAdd}
            />

           
            {showEdit && editInv && (
                <EditInvoiceModal
                    show
                    invoice={editInv}
                    onHide={() => {
                        setShowEdit(false);
                        setEditInv(null);
                    }}
                    onSave={handleEditSave}
                />
            )}
        </Container>
    );
};

export default Invoices;
