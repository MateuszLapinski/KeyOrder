import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const EditUserModal = ({ show, onHide, user, onSave, roles = [] }) => {
    const [form, setForm] = useState({
        id: null,
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        roleID: '',
        isActive: false,
        isLocked: false,
        twoFactorEnabled: false,
        language: '',
        profileImageURL: '',
        notes: '',
        createdAt: '',
        updatedAt: ''
    });

    // Helper to read camelCase or PascalCase fields
    const get = (obj, camel, pascal) =>
        obj && (obj[camel] !== undefined ? obj[camel] : obj[pascal]);

    useEffect(() => {
        if (user) {
            const created = get(user, 'createdAt', 'CreatedAt') ?? new Date().toISOString();
            setForm({
                id: get(user, 'userID', 'UserID'),
                username: get(user, 'username', 'Username') ?? '',
                email: get(user, 'email', 'Email') ?? '',
                firstName: get(user, 'firstName', 'FirstName') ?? '',
                lastName: get(user, 'lastName', 'LastName') ?? '',
                phoneNumber: get(user, 'phoneNumber', 'PhoneNumber') ?? '',
                roleID: (get(user, 'roleID', 'RoleID') ?? '').toString(),
                isActive: get(user, 'isActive', 'IsActive') ?? false,
                isLocked: get(user, 'isLocked', 'IsLocked') ?? false,
                twoFactorEnabled: get(user, 'twoFactorEnabled', 'TwoFactorEnabled') ?? false,
                language: get(user, 'language', 'Language') ?? '',
                profileImageURL: get(user, 'profileImageURL', 'ProfileImageURL') ?? '',
                notes: get(user, 'notes', 'Notes') ?? '',
                createdAt: created,
                updatedAt: new Date().toISOString()
            });
        }
    }, [user]);

    const handleChange = e => {
        const { name, value, type, checked } = e.target;
        setForm(f => ({
            ...f,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = e => {
        e.preventDefault();

        const payload = {
            userID: form.id,
            username: form.username.trim(),
            email: form.email.trim() || null,
            firstName: form.firstName.trim() || null,
            lastName: form.lastName.trim() || null,
            phoneNumber: form.phoneNumber.trim() || null,
            roleID: form.roleID ? parseInt(form.roleID, 10) : null,
            isActive: form.isActive,
            isLocked: form.isLocked,
            twoFactorEnabled: form.twoFactorEnabled,
            language: form.language.trim() || null,
            profileImageURL: form.profileImageURL.trim() || null,
            notes: form.notes.trim() || null,
            createdAt: form.createdAt,
            updatedAt: new Date().toISOString()
        };

        onSave(payload);
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit User #{form.id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Col>
                            <Form.Group controlId="editFormUsername">
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
                            <Form.Group controlId="editFormEmail">
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
                            <Form.Group controlId="editFormFirstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    name="firstName"
                                    value={form.firstName}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="editFormLastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    name="lastName"
                                    value={form.lastName}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3" controlId="editFormPhoneNumber">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                            name="phoneNumber"
                            value={form.phoneNumber}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="editFormRole">
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

                    <Form.Group className="mb-3" controlId="editFormLanguage">
                        <Form.Label>Language</Form.Label>
                        <Form.Control
                            name="language"
                            value={form.language}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="editFormProfileImageURL">
                        <Form.Label>Profile Image URL</Form.Label>
                        <Form.Control
                            name="profileImageURL"
                            value={form.profileImageURL}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="editFormNotes">
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

export default EditUserModal;
