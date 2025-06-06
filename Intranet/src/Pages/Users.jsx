import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import UsersTable from '../Components/Table/UserTable';
import AddUserModal from '../Components/Modal/AddUserModal';
import EditUserModal from '../Components/Modal/EditUserModal';

axios.defaults.baseURL = 'http://localhost:5029';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [addShow, setAddShow] = useState(false);
    const [editShow, setEditShow] = useState(false);
    const [editUser, setEditUser] = useState(null);

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await axios.get('/api/users');
            setUsers(data);
        } catch (err) {
            console.error('[FetchUsers]', err);
            setError(err.response ? `Server ${err.response.status}` : err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchRoles = async () => {
        try {
            const { data } = await axios.get('/api/roles');
            setRoles(data);
        } catch (err) {
            console.error('[FetchRoles]', err);
        }
    };

    useEffect(() => {
        fetchUsers();
        fetchRoles();
    }, []);

    const handleAdd = async (payload) => {
        try {
            const { data } = await axios.post('/api/users', payload);
            setUsers((prev) => [...prev, data]);
            setAddShow(false);
        } catch (err) {
            console.error('[AddUser]', err);
            setError('Nie uda³o siê dodaæ u¿ytkownika');
        }
    };

    const handleEditClick = (user) => {
        setEditUser(user);
        setEditShow(true);
    };

    const handleEditSave = async (payload) => {
        try {
            const { data } = await axios.put(`/api/users/${payload.id}`, payload);
            setUsers((prev) => prev.map((u) => (u.id === payload.id ? data : u)));
            setEditShow(false);
            setEditUser(null);
        } catch (err) {
            console.error('[EditUser]', err);
            setError('Nie uda³o siê zaktualizowaæ u¿ytkownika');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Usun¹æ tego u¿ytkownika?')) return;
        try {
            await axios.delete(`/api/users/${id}`);
            setUsers((prev) => prev.filter((u) => u.id !== id));
        } catch (err) {
            console.error('[DeleteUser]', err);
            setError('Nie uda³o siê usun¹æ u¿ytkownika');
        }
    };

    return (
        <Container fluid className="p-4">
            <Row className="mb-3">
                <Col>
                    <Button onClick={() => setAddShow(true)} className="me-2">
                        Add User
                    </Button>
                    <Button variant="outline-secondary" onClick={fetchUsers}>
                        Refresh
                    </Button>
                </Col>
            </Row>

            {error && <Alert variant="danger">{error}</Alert>}

            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" />
                </div>
            ) : (
                <UsersTable
                    users={users}
                    onEdit={handleEditClick}
                    onDelete={handleDelete}
                />
            )}

            <AddUserModal
                show={addShow}
                onHide={() => setAddShow(false)}
                onSave={handleAdd}
                roles={roles}
            />

            {editShow && editUser && (
                <EditUserModal
                    show={true}
                    user={editUser}
                    onHide={() => {
                        setEditShow(false);
                        setEditUser(null);
                    }}
                    onSave={handleEditSave}
                    roles={roles}
                />
            )}
        </Container>
    );
};

export default Users;
