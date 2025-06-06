import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const EditProductModal = ({ show, onHide, product, onSave, categories = [] }) => {
    const [form, setForm] = useState({
        id: null,
        shortcut: '',
        name: '',
        unitPrice: '',
        description: '',
        stockQuantity: 0,
        reorderLevel: 0,
        categoryId: '',
        isActive: true,
        createdAt: '',
        updatedAt: ''
    });

    useEffect(() => {
        if (product) {
            const ca = product.createdAt ?? product.CreatedAt ?? new Date().toISOString();
            setForm({
                id: product.id ?? product.Id,
                shortcut: product.shortcut ?? product.Shortcut ?? '',
                name: product.name ?? product.Name ?? '',
                unitPrice: (product.unitPrice ?? product.UnitPrice)?.toString() ?? '',
                description: product.description ?? product.Description ?? '',
                stockQuantity: product.stockQuantity ?? product.StockQuantity ?? 0,
                reorderLevel: product.reorderLevel ?? product.ReorderLevel ?? 0,
                categoryId: (product.categoryId ?? product.CategoryId)?.toString() ?? '',
                isActive: product.isActive ?? product.IsActive ?? false,
                createdAt: ca,
                updatedAt: new Date().toISOString()
            });
        }
    }, [product]);

    const handleChange = e => {
        const { name, value, type, checked } = e.target;
        setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        const payload = {
            id: form.id,
            shortcut: form.shortcut.trim(),
            name: form.name.trim(),
            unitPrice: parseFloat(form.unitPrice),
            description: form.description.trim() || null,
            stockQuantity: parseInt(form.stockQuantity, 10),
            reorderLevel: parseInt(form.reorderLevel, 10),
            categoryId: form.categoryId ? parseInt(form.categoryId, 10) : null,
            isActive: form.isActive,
            createdAt: form.createdAt,
            updatedAt: new Date().toISOString()
        };
        onSave(payload);
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Product #{form.id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="editFormShortcut">
                        <Form.Label>Shortcut</Form.Label>
                        <Form.Control name="shortcut" value={form.shortcut} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="editFormName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control name="name" value={form.name} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="editFormUnitPrice">
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
                    <Form.Group className="mb-3" controlId="editFormDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} name="description" value={form.description} onChange={handleChange} />
                    </Form.Group>
                    <Row className="mb-3">
                        <Col>
                            <Form.Group controlId="editFormStockQuantity">
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
                            <Form.Group controlId="editFormReorderLevel">
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
                   
                    <Form.Group className="mb-3" controlId="editFormIsActive">
                        <Form.Check
                            type="checkbox"
                            label="Active"
                            name="isActive"
                            checked={form.isActive}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <div className="text-end">
                        <Button variant="secondary" onClick={onHide} className="me-2">Cancel</Button>
                        <Button variant="primary" type="submit">Save Changes</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditProductModal;
