import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const AddProductModal = ({ show, onHide, onSave, categories = [] }) => {
    const [form, setForm] = useState({
        shortcut: '',
        name: '',
        unitPrice: '',
        description: '',
        stockQuantity: 0,
        reorderLevel: 0,
        categoryId: '',
        isActive: true
    });

    const handleChange = e => {
        const { name, value, type, checked } = e.target;
        setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        const now = new Date().toISOString();
        const payload = {
            shortcut: form.shortcut.trim(),
            name: form.name.trim(),
            unitPrice: parseFloat(form.unitPrice),
            description: form.description.trim() || null,
            stockQuantity: parseInt(form.stockQuantity, 10),
            reorderLevel: parseInt(form.reorderLevel, 10),
          
            isActive: form.isActive,
            createdAt: now,
            updatedAt: now
        };
        onSave(payload);
        setForm({
            shortcut: '',
            name: '',
            unitPrice: '',
            description: '',
            stockQuantity: 0,
            reorderLevel: 0,
         
            isActive: true
        });
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add New Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formShortcut">
                        <Form.Label>Shortcut</Form.Label>
                        <Form.Control name="shortcut" value={form.shortcut} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control name="name" value={form.name} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formUnitPrice">
                        <Form.Label>Unit Price</Form.Label>
                        <Form.Control
                            type="number"
                            name="unitPrice"
                            value={form.unitPrice}
                            onChange={handleChange}
                            step="0.01"
                            min="0"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} name="description" value={form.description} onChange={handleChange} />
                    </Form.Group>
                    <Row className="mb-3">
                        <Col>
                            <Form.Group controlId="formStockQuantity">
                                <Form.Label>Stock Quantity</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="stockQuantity"
                                    value={form.stockQuantity}
                                    onChange={handleChange}
                                    min="0"
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formReorderLevel">
                                <Form.Label>Reorder Level</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="reorderLevel"
                                    value={form.reorderLevel}
                                    onChange={handleChange}
                                    min="0"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                   
                    <Form.Group className="mb-3" controlId="formIsActive">
                        <Form.Check
                            type="checkbox"
                            label="Active"
                            name="isActive"
                            checked={form.isActive}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <div className="text-end">
                        <Button variant="secondary" onClick={onHide} className="me-2">
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit">
                            Save Product
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddProductModal;
