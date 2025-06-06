import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';


const toIso = (d) => new Date(`${d}T00:00:00Z`).toISOString();
const safe = (v) => (v ?? '');
const isoStr = (dt) => (dt ? dt.split('T')[0] : '');           


const EditInvoiceModal = ({ show, onHide, invoice, onSave }) => {
  
    const [form, setForm] = useState(() => ({
        id: Number(invoice.id),
        clientId: String(invoice.clientId),
        amount: String(invoice.amount),
        issuedAt: isoStr(invoice.issuedAt),
        dueDate: isoStr(invoice.dueDate),
        status: safe(invoice.status),
        paymentMethod: safe(invoice.paymentMethod),
        invoiceType: safe(invoice.invoiceType),
        notes: safe(invoice.notes)
    }));


    useEffect(() => {
        setForm({
            id: Number(invoice.id),
            clientId: String(invoice.clientId),
            amount: String(invoice.amount),
            issuedAt: isoStr(invoice.issuedAt),
            dueDate: isoStr(invoice.dueDate),
            status: safe(invoice.status),
            paymentMethod: safe(invoice.paymentMethod),
            invoiceType: safe(invoice.invoiceType),
            notes: safe(invoice.notes)
        });
    }, [invoice]);

    
    const handleChange = ({ target: { name, value } }) =>
        setForm((prev) => ({ ...prev, [name]: value }));

    const handleSubmit = (e) => {
        e.preventDefault();

        onSave({
            id: form.id,
            clientId: Number(form.clientId),
            amount: Number(form.amount),
            issuedAt: toIso(form.issuedAt),
            dueDate: toIso(form.dueDate),
            status: form.status,
            paymentMethod: form.paymentMethod || null,
            invoiceType: form.invoiceType || null,
            notes: form.notes || null,
            items: []                         
        });

        onHide();
    };

  
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Invoice</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    
                    <Form.Group className="mb-3" controlId="editClientId">
                        <Form.Label>Client ID</Form.Label>
                        <Form.Control
                            type="number"
                            name="clientId"
                            value={form.clientId}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                   
                    <Form.Group className="mb-3" controlId="editAmount">
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
                            <Form.Group controlId="editIssuedAt">
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
                            <Form.Group controlId="editDueDate">
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

                   
                    <Form.Group className="mb-3" controlId="editStatus">
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

         

                    <Form.Group className="mb-3" controlId="editPaymentMethod">
                        <Form.Label>Payment Method</Form.Label>
                        <Form.Select
                            name="paymentMethod"
                            value={form.status}
                            onChange={handleChange}
                        >
                            <option>Gotówka</option>
                            <option>Przelew</option>
                            <option>Przedp³ata</option>
                        </Form.Select>
                    </Form.Group>

           
                    <Form.Group className="mb-3" controlId="editInvoiceType">
                        <Form.Label>Invoice Type</Form.Label>
                        <Form.Control
                            name="invoiceType"
                            value={form.invoiceType}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    
                    <Form.Group className="mb-3" controlId="editNotes">
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
                            Save Changes
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditInvoiceModal;
