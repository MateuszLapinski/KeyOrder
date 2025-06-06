import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const EditClientModal = ({ show, onHide, client, onSave }) => {
    const [form, setForm] = useState({
        id: null, name: '', email: '', phone: '',
        address: '', country: '',
        status: 'Active', loyaltyPoints: 0,
        registrationDate: ''
    });

    useEffect(() => {
        if (client) {
            setForm({
                id: client.id,
                name: client.name || '',
                email: client.email || '',
                phone: client.phone || '',
                address: client.address || '',
                country: client.country || '',
                status: client.status || 'Active',
                loyaltyPoints: client.loyaltyPoints || 0,
                registrationDate: client.registrationDate || ''
            });
        }
    }, [client]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(f => ({ ...f, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            id: form.id,
            name: form.name.trim(),
            email: form.email.trim(),
            phone: form.phone.trim(),
            address: form.address.trim(),
            country: form.country.trim(),
            status: form.status,
            loyaltyPoints: Number(form.loyaltyPoints),
            registrationDate: form.registrationDate
        });
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton><Modal.Title>Edit Client</Modal.Title></Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>

                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Row className="mb-3">
                        <Col>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formPhone">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3" controlId="formAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Row className="mb-3">
                        <Col>
                            <Form.Group controlId="formCountry">
                                <Form.Label>Country</Form.Label>
                                <Form.Control
                                    name="country"
                                    value={form.country}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formStatus">
                                <Form.Label>Status</Form.Label>
                                <Form.Select
                                    name="status"
                                    value={form.status}
                                    onChange={handleChange}
                                >
                                    <option>Active</option>
                                    <option>Inactive</option>
                                    <option>Pending</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3" controlId="formLoyalty">
                        <Form.Label>Loyalty Points</Form.Label>
                        <Form.Control
                            type="number"
                            name="loyaltyPoints"
                            value={form.loyaltyPoints}
                            onChange={handleChange}
                            min={0}
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

export default EditClientModal;
