import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';

import ClientTable from '../Components/Table/ClientTable';
import AddClientModal from '../Components/Modal/AddClientModal';
import EditClientModal from '../Components/Modal/EditClientModal';

axios.defaults.baseURL = 'http://localhost:5029';

const Clients = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [addShow, setAddShow] = useState(false);
    const [editShow, setEditShow] = useState(false);
    const [editClient, setEditClient] = useState(null);

    const fetchClients = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await axios.get('/api/clients');
            setClients(data);
        } catch (err) {
            console.error(err);
            setError(err.response ? `Serwer zwrócił ${err.response.status}` : err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchClients(); }, []);

    const handleAdd = async (payload) => {
        try {
            const { data } = await axios.post('/api/clients', payload);
            setClients(prev => [...prev, data]);
            setAddShow(false);
        } catch (err) {
            console.error(err);
            setError('Błąd podczas dodawania klienta');
        }
    };

    const handleEditClick = (client) => {
        setEditClient(client);
        setEditShow(true);
    };

    const handleEditSave = async (payload) => {
        try {
            await axios.put(`/api/clients/${payload.id}`, payload);
            setClients(prev =>
                prev.map(c => (c.id === payload.id ? payload : c))
            );
            setEditShow(false);
        } catch (err) {
            console.error(err);
            setError('Błąd podczas zapisywania zmian');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Na pewno chcesz usunąć tego klienta?')) return;
        try {
            await axios.delete(`/api/clients/${id}`);
            setClients(prev => prev.filter(c => c.id !== id));
        } catch (err) {
            console.error(err);
            setError('Błąd podczas usuwania klienta');
        }
    };

    return (
        <Container fluid className="p-4">
            <Row className="mb-3">
                <Col>
                    <Button onClick={() => setAddShow(true)} className="me-2">
                        Add Client
                    </Button>
                    <Button variant="outline-secondary" onClick={fetchClients}>
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
                <ClientTable
                    clients={clients}
                    onEdit={handleEditClick}
                    onDelete={handleDelete}
                />
            )}

            <AddClientModal
                show={addShow}
                onHide={() => setAddShow(false)}
                onSave={handleAdd}
            />

            <EditClientModal
                show={editShow}
                onHide={() => setEditShow(false)}
                client={editClient}
                onSave={handleEditSave}
            />
        </Container>
    );
};

export default Clients;
