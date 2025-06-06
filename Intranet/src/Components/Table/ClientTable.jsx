import React, { useState, useMemo } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronUp,
    faChevronDown,
    faSortUp,
    faSortDown,
    faEdit,
    faTrashAlt
} from '@fortawesome/free-solid-svg-icons';

const ClientTable = ({ clients, onEdit, onDelete }) => {
    const [openRowId, setOpenRowId] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
    const [searchQuery, setSearchQuery] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const toggleRow = (id) => setOpenRowId(openRowId === id ? null : id);

    const sortedClients = useMemo(() => {
        let filtered = [...clients];

        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            filtered = filtered.filter(c =>
                c.name.toLowerCase().includes(q)
            );
        }

        if (startDate) {
            filtered = filtered.filter(c =>
                new Date(c.registrationDate) >= new Date(startDate)
            );
        }
        if (endDate) {
            filtered = filtered.filter(c =>
                new Date(c.registrationDate) <= new Date(endDate)
            );
        }

        if (sortConfig.key) {
            filtered.sort((a, b) => {
                let aVal = a[sortConfig.key];
                let bVal = b[sortConfig.key];

                if (sortConfig.key === 'registrationDate') {
                    aVal = new Date(aVal); bVal = new Date(bVal);
                } else {
                    aVal = aVal?.toString().toLowerCase() ?? '';
                    bVal = bVal?.toString().toLowerCase() ?? '';
                }

                if (aVal < bVal) return sortConfig.direction === 'ascending' ? -1 : 1;
                if (aVal > bVal) return sortConfig.direction === 'ascending' ? 1 : -1;
                return 0;
            });
        }

        return filtered;
    }, [clients, sortConfig, searchQuery, startDate, endDate]);

    const requestSort = (key) => {
        setSortConfig(prev => ({
            key,
            direction:
                prev.key === key && prev.direction === 'ascending'
                    ? 'descending'
                    : 'ascending'
        }));
    };

    const clearFilters = () => {
        setSearchQuery('');
        setStartDate('');
        setEndDate('');
    };

    const getSortIcon = (key) =>
        sortConfig.key === key
            ? sortConfig.direction === 'ascending'
                ? faSortUp
                : faSortDown
            : null;

    return (
        <div className="table-responsive">
            <Row className="mb-3">
                <Col lg={4}>
                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Search by Name"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                </Col>
                <Col lg={3}>
                    <input
                        type="date"
                        className="form-control mb-2"
                        value={startDate}
                        onChange={e => setStartDate(e.target.value)}
                    />
                </Col>
                <Col lg={3}>
                    <input
                        type="date"
                        className="form-control mb-2"
                        value={endDate}
                        onChange={e => setEndDate(e.target.value)}
                    />
                </Col>
                <Col lg={2}>
                    <button
                        className="btn btn-outline-secondary w-100 mb-2"
                        onClick={clearFilters}
                    >
                        Clear Filters
                    </button>
                </Col>
            </Row>

            <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                    <tr>
                        <th onClick={() => requestSort('id')} className="cursor-pointer">
                            # <FontAwesomeIcon icon={getSortIcon('id')} className="ms-1" />
                        </th>
                        <th onClick={() => requestSort('name')} className="cursor-pointer">
                            Name <FontAwesomeIcon icon={getSortIcon('name')} className="ms-1" />
                        </th>
                        <th onClick={() => requestSort('email')} className="cursor-pointer">
                            Email <FontAwesomeIcon icon={getSortIcon('email')} className="ms-1" />
                        </th>
                        <th onClick={() => requestSort('phone')} className="cursor-pointer">
                            Phone <FontAwesomeIcon icon={getSortIcon('phone')} className="ms-1" />
                        </th>
                        <th onClick={() => requestSort('status')} className="cursor-pointer">
                            Status <FontAwesomeIcon icon={getSortIcon('status')} className="ms-1" />
                        </th>
                        <th onClick={() => requestSort('registrationDate')} className="cursor-pointer">
                            Registered <FontAwesomeIcon icon={getSortIcon('registrationDate')} className="ms-1" />
                        </th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedClients.map(client => (
                        <React.Fragment key={client.id}>
                            <tr
                                onClick={() => toggleRow(client.id)}
                                className="cursor-pointer"
                            >
                                <td>{client.id}</td>
                                <td>{client.name}</td>
                                <td>{client.email}</td>
                                <td>{client.phone}</td>
                                <td>
                                    <span className={`badge bg-${client.status === 'Active' ? 'success' : 'secondary'}`}>
                                        {client.status}
                                    </span>
                                </td>
                                <td>{client.registrationDate}</td>
                                <td>
                                    <FontAwesomeIcon
                                        icon={openRowId === client.id ? faChevronUp : faChevronDown}
                                    />
                                </td>
                            </tr>
                            {openRowId === client.id && (
                                <tr>
                                    <td colSpan="7">
                                        <div className="p-3 bg-light">
                                            <strong>Details:</strong>
                                            <ul className="mb-0">
                                                <li><strong>Address:</strong> {client.address}</li>
                                                <li><strong>Country:</strong> {client.country}</li>
                                                <li><strong>Loyalty Points:</strong> {client.loyaltyPoints}</li>
                                            </ul>
                                            <div className="mt-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline-primary"
                                                    className="me-2"
                                                    onClick={() => onEdit(client)}
                                                >
                                                    <FontAwesomeIcon icon={faEdit} /> Edit
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline-danger"
                                                    onClick={() => onDelete(client.id)}
                                                >
                                                    <FontAwesomeIcon icon={faTrashAlt} /> Delete
                                                </Button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ClientTable;
