import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const AddOrderModal = ({ show, onHide, onSave, clients = [] }) => {
    const [form, setForm] = useState({
        clientId: '',
        placedAt: '',
        status: 'New',
        value: '',
        shippingAddress: '',
        paymentMethod: '',
        notes: ''
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setForm(f => ({ ...f, [name]: value }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        const order = {
            clientId: parseInt(form.clientId, 10),
            placedAt: form.placedAt,
            status: form.status,
            value: parseFloat(form.value),
            shippingAddress: form.shippingAddress,
            paymentMethod: form.paymentMethod,
            notes: form.notes || null
        };
        onSave(order);
       
        setForm({
            clientId: '',
            placedAt: '',
            status: 'New',
            value: '',
            shippingAddress: '',
            paymentMethod: '',
            notes: ''
        });
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add New Order</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="orderClient" className="mb-3">
                        <Form.Label>Client</Form.Label>
                        <Form.Select
                            name="clientId"
                            value={form.clientId}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Select a client...</option>
                            {clients.map(c => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Row className="mb-3">
                        <Col>
                            <Form.Group controlId="orderDate">
                                <Form.Label>Placed At</Form.Label>
                                <Form.Control
                                    type="datetime-local"
                                    name="placedAt"
                                    value={form.placedAt}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="orderStatus">
                                <Form.Label>Status</Form.Label>
                                <Form.Select
                                    name="status"
                                    value={form.status}
                                    onChange={handleChange}
                                    required
                                >
                                    <option>New</option>
                                    <option>Shipped</option>
                                    <option>Cancelled</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group controlId="orderValue" className="mb-3">
                        <Form.Label>Order Value</Form.Label>
                        <Form.Control
                            type="number"
                            name="value"
                            value={form.value}
                            onChange={handleChange}
                            step="0.01"
                            min="0"
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="orderShipping" className="mb-3">
                        <Form.Label>Shipping Address</Form.Label>
                        <Form.Control
                            name="shippingAddress"
                            value={form.shippingAddress}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="orderPayment" className="mb-3">
                        <Form.Label>Payment Method</Form.Label>
                        <Form.Control
                            name="paymentMethod"
                            value={form.paymentMethod}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="orderNotes" className="mb-3">
                        <Form.Label>Notes</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="notes"
                            value={form.notes}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <div className="text-end">
                        <Button variant="secondary" onClick={onHide} className="me-2">
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit">
                            Save Order
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddOrderModal;
