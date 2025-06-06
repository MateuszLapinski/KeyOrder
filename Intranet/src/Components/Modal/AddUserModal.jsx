import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const AddUserModal = ({ show, onHide, onSave, roles }) => {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        roleID: '',
        isActive: true,
        isLocked: false,
        twoFactorEnabled: false,
        language: '',
        profileImageURL: '',
        notes: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setForm(f => ({ ...f, [name]: checked }));
        } else {
            setForm(f => ({ ...f, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            ...form,
            roleID: Number(form.roleID)
        };
        onSave(payload);
        setForm({
            username: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            roleID: '',
            isActive: true,
            isLocked: false,
            twoFactorEnabled: false,
            language: '',
            profileImageURL: '',
            notes: ''
        });
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add New User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Col>
                            <Form.Group controlId="formUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    name="username"
                                    value={form.username}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
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
                    </Row>

                    <Row className="mb-3">
                        <Col>
                            <Form.Group controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formRole">
                                <Form.Label>Role</Form.Label>
                                <Form.Select
                                    name="roleID"
                                    value={form.roleID}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select role...</option>
                                    {roles.map(r => (
                                        <option key={r.id} value={r.id}>
                                            {r.name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col>
                            <Form.Group controlId="formFirstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    name="firstName"
                                    value={form.firstName}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formLastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    name="lastName"
                                    value={form.lastName}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3" controlId="formPhoneNumber">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                            name="phoneNumber"
                            value={form.phoneNumber}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formLanguage">
                        <Form.Label>Language</Form.Label>
                        <Form.Control
                            name="language"
                            value={form.language}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formProfileImageURL">
                        <Form.Label>Profile Image URL</Form.Label>
                        <Form.Control
                            name="profileImageURL"
                            value={form.profileImageURL}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formNotes">
                        <Form.Label>Notes</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="notes"
                            value={form.notes}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Row className="mb-3">
                        <Col>
                            <Form.Check
                                type="checkbox"
                                label="Is Active"
                                name="isActive"
                                checked={form.isActive}
                                onChange={handleChange}
                            />
                        </Col>
                        <Col>
                            <Form.Check
                                type="checkbox"
                                label="Is Locked"
                                name="isLocked"
                                checked={form.isLocked}
                                onChange={handleChange}
                            />
                        </Col>
                        <Col>
                            <Form.Check
                                type="checkbox"
                                label="Two-Factor Enabled"
                                name="twoFactorEnabled"
                                checked={form.twoFactorEnabled}
                                onChange={handleChange}
                            />
                        </Col>
                    </Row>

                    <div className="text-end">
                        <Button variant="secondary" onClick={onHide} className="me-2">
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit">
                            Save User
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddUserModal;
