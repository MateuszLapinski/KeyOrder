import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';


const toIso = (d) => new Date(`${d}T00:00:00`).toISOString();

const AddInvoiceModal = ({ show, onHide, onSave }) => {
    const [form, setForm] = useState({
        clientId: '',
        amount: '',
        issuedAt: new Date().toISOString().split('T')[0], 
        dueDate: '',
        status: 'Pending',
        paymentMethod: '',
        invoiceType: '',
        notes: ''
    });

    const handleChange = ({ target: { name, value } }) =>
        setForm((f) => ({ ...f, [name]: value }));

    const handleSubmit = (e) => {
        e.preventDefault();

        onSave({
            clientId: Number(form.clientId),
            amount: Number(form.amount),
            issuedAt: toIso(form.issuedAt),
            dueDate: toIso(form.dueDate),
            status: form.status,
            paymentMethod: form.paymentMethod || null,
            invoiceType: form.invoiceType || null,
            notes: form.notes || null,
            
        });

        setForm({
            clientId: '', amount: '',
            issuedAt: new Date().toISOString().split('T')[0],
            dueDate: '', status: 'Pending',
            paymentMethod: '', invoiceType: '', notes: ''
        });
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton><Modal.Title>Add Invoice</Modal.Title></Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="addClientId">
                        <Form.Label>Client ID</Form.Label>
                        <Form.Control
                            type="number"
                            name="clientId"
                            value={form.clientId}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="addAmount">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                            type="number"
                            step="0.01"
                            name="amount"
                            value={form.amount}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Row className="mb-3">
                        <Col>
                            <Form.Group controlId="addIssuedAt">
                                <Form.Label>Issued At</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="issuedAt"
                                    value={form.issuedAt}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="addDueDate">
                                <Form.Label>Due Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="dueDate"
                                    value={form.dueDate}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3" controlId="addStatus">
                        <Form.Label>Status</Form.Label>
                        <Form.Select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                        >
                            <option>Pending</option>
                            <option>Paid</option>
                            <option>Overdue</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="addPaymentMethod">
                        <Form.Label>Payment Method</Form.Label>
                        <Form.Control
                            name="paymentMethod"
                            value={form.paymentMethod}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="addInvoiceType">
                        <Form.Label>Invoice Type</Form.Label>
                        <Form.Control
                            name="invoiceType"
                            value={form.invoiceType}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="addNotes">
                        <Form.Label>Notes</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="notes"
                            rows={3}
                            value={form.notes}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <div className="text-end">
                        <Button variant="secondary" onClick={onHide} className="me-2">
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit">
                            Save Invoice
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddInvoiceModal;
