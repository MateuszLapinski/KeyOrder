// src/Pages/Orders.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';

import OrdersTable from '../Components/Table/OrdersTable';
import AddOrderModal from '../Components/Modal/AddOrderModal';
import EditOrderModal from '../Components/Modal/EditOrderModal';

axios.defaults.baseURL = 'http://localhost:5029';

const Orders = () => {
   
    const [orders, setOrders] = useState([]);
    const [clients, setClients] = useState([]);

  
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

  
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [editOrder, setEditOrder] = useState(null);

  
    const fetchOrders = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await axios.get('/api/orders');
            setOrders(data);
        } catch (err) {
            setError(err.response ? `Server ${err.response.status}` : err.message);
        } finally {
            setLoading(false);
        }
    };

   
    const fetchClients = async () => {
        try {
            const { data } = await axios.get('/api/clients');
            setClients(data);
        } catch (err) {
            console.error('Failed to load clients', err);
        }
    };

    
    useEffect(() => {
        fetchOrders();
        fetchClients();
    }, []);

 
    const handleAdd = async (payload) => {
        try {
            const { data } = await axios.post('/api/orders', payload);
            setOrders(prev => [...prev, data]);
            setShowAdd(false);
        } catch {
            setError('Failed to add order');
        }
    };

   
    const handleEditClick = (order) => {
        setEditOrder(order);
        setShowEdit(true);
    };

    
    const handleEditSave = async (payload) => {
        try {
            await axios.put(`/api/orders/${payload.id}`, payload);
            setOrders(prev => prev.map(o => o.id === payload.id ? payload : o));
            setShowEdit(false);
            setEditOrder(null);
        } catch {
            setError('Failed to update order');
        }
    };

    
    const handleDelete = async (id) => {
        if (!window.confirm('Delete this order?')) return;
        try {
            await axios.delete(`/api/orders/${id}`);
            setOrders(prev => prev.filter(o => o.id !== id));
        } catch {
            setError('Failed to delete order');
        }
    };

    return (
        <Container fluid className="p-4">
            <Row className="mb-3">
                <Col>
                    <Button onClick={() => setShowAdd(true)} className="me-2">
                        Add Order
                    </Button>
                    <Button variant="outline-secondary" onClick={fetchOrders}>
                        Refresh
                    </Button>
                </Col>
            </Row>

            {error && <Alert variant="danger">{error}</Alert>}

            {loading
                ? <div className="text-center"><Spinner animation="border" /></div>
                : (
                    <OrdersTable
                        orders={orders}
                        onEditOrder={handleEditClick}
                        onDeleteOrder={handleDelete}
                    />
                )
            }

          
            <AddOrderModal
                show={showAdd}
                onHide={() => setShowAdd(false)}
                onSave={handleAdd}
                clients={clients}
            />

            {showEdit && editOrder && (
                <EditOrderModal
                    show={true}
                    order={editOrder}
                    onHide={() => {
                        setShowEdit(false);
                        setEditOrder(null);
                    }}
                    onSave={handleEditSave}
                    clients={clients}
                />
            )}
        </Container>
    );
};

export default Orders;
