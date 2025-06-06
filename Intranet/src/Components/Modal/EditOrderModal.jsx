
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const EditOrderModal = ({ show, onHide, order, clients = [], onSave }) => {
    const [form, setForm] = useState({
        id: null,
        clientId: '',
        placedAt: '',
        status: 'New',
        value: '',
        shippingAddress: '',
        paymentMethod: '',
        notes: ''
    });

    useEffect(() => {
        if (order) {
            setForm({
                id: order.id,
                clientId: order.clientId ?? order.client?.id ?? '',
                placedAt: order.placedAt
                    ? new Date(order.placedAt).toISOString().slice(0, 16)
                    : '',
                status: order.status ?? 'New',
                value: order.value?.toString() ?? '',
                shippingAddress: order.shippingAddress ?? '',
                paymentMethod: order.paymentMethod ?? '',
                notes: order.notes ?? ''
            });
        }
    }, [order]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updated = {
            id: form.id,
            clientId: parseInt(form.clientId, 10),
            placedAt: form.placedAt,
            status: form.status,
            value: parseFloat(form.value),
            shippingAddress: form.shippingAddress.trim(),
            paymentMethod: form.paymentMethod.trim(),
            notes: form.notes.trim() || null
        };
        onSave(updated);
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Order #{form.id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="editOrderClient" className="mb-3">
                        <Form.Label>Client</Form.Label>
                        <Form.Select
                            name="clientId"
                            value={form.clientId}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>
                                Select a client...
                            </option>
                            {clients.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Row className="mb-3">
                        <Col>
                            <Form.Group controlId="editOrderDate">
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
                            <Form.Group controlId="editOrderStatus">
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

                    <Form.Group controlId="editOrderValue" className="mb-3">
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

                    <Form.Group controlId="editOrderShipping" className="mb-3">
                        <Form.Label>Shipping Address</Form.Label>
                        <Form.Control
                            name="shippingAddress"
                            value={form.shippingAddress}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="editOrderPayment" className="mb-3">
                        <Form.Label>Payment Method</Form.Label>
                        <Form.Control
                            name="paymentMethod"
                            value={form.paymentMethod}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="editOrderNotes" className="mb-3">
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
                            Save Changes
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditOrderModal;
