import React, { useState, useEffect, useMemo } from 'react';
import { Row, Col, Spinner, Alert, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronUp,
    faChevronDown,
    faSortUp,
    faSortDown,
    faEdit,
    faTrashAlt
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const OrdersTable = ({ onEditOrder, onDeleteOrder }) => {
    const [orders, setOrders] = useState([]);
    const [openRowId, setOpenRowId] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
    const [searchQuery, setSearchQuery] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchOrders = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await axios.get('/api/orders');
            setOrders(data);
        } catch {
            setError('Failed to load orders');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const toggleRow = (id) => {
        setOpenRowId(openRowId === id ? null : id);
    };

    const sortedOrders = useMemo(() => {
        let list = [...orders];

        if (searchQuery) {
            list = list.filter(o =>
                o.client.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (startDate) {
            list = list.filter(o =>
                new Date(o.placedAt) >= new Date(startDate)
            );
        }

        if (endDate) {
            list = list.filter(o =>
                new Date(o.placedAt) <= new Date(endDate)
            );
        }

        if (sortConfig.key) {
            list.sort((a, b) => {
                let aKey, bKey;

                if (sortConfig.key === 'client') {
                    aKey = a.client.name.toLowerCase();
                    bKey = b.client.name.toLowerCase();
                } else {
                    aKey = a[sortConfig.key];
                    bKey = b[sortConfig.key];
                }

                if (typeof aKey === 'string') {
                    if (aKey < bKey) return sortConfig.direction === 'ascending' ? -1 : 1;
                    if (aKey > bKey) return sortConfig.direction === 'ascending' ? 1 : -1;
                    return 0;
                }

                return (aKey - bKey) * (sortConfig.direction === 'ascending' ? 1 : -1);
            });
        }

        return list;
    }, [orders, sortConfig, searchQuery, startDate, endDate]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const clearFilters = () => {
        setSearchQuery('');
        setStartDate('');
        setEndDate('');
    };

    const sortIcon = (key) =>
        sortConfig.key === key ? (
            <FontAwesomeIcon icon={sortConfig.direction === 'ascending' ? faSortUp : faSortDown} className="ms-1" />
        ) : null;

    if (loading) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" />
            </div>
        );
    }
    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    return (
        <div className="table-responsive">
            {/* Filters */}
            <Row className="mb-3">
                <Col lg={6}>
                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Search by client"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </Col>
                <Col lg={2}>
                    <input
                        type="date"
                        className="form-control mb-2"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </Col>
                <Col lg={2}>
                    <input
                        type="date"
                        className="form-control mb-2"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </Col>
                <Col lg={2}>
                    <button className="btn btn-outline-secondary w-100 mb-2" onClick={clearFilters}>
                        Clear Filters
                    </button>
                </Col>
            </Row>

            {/* Table */}
            <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                    <tr>
                        <th onClick={() => requestSort('id')} className="cursor-pointer">
                            # {sortIcon('id')}
                        </th>
                        <th onClick={() => requestSort('client')} className="cursor-pointer">
                            Client {sortIcon('client')}
                        </th>
                        <th onClick={() => requestSort('value')} className="cursor-pointer text-end">
                            Value {sortIcon('value')}
                        </th>
                        <th onClick={() => requestSort('placedAt')} className="cursor-pointer">
                            Date {sortIcon('placedAt')}
                        </th>
                        <th onClick={() => requestSort('status')} className="cursor-pointer">
                            Status {sortIcon('status')}
                        </th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedOrders.map(order => (
                        <React.Fragment key={order.id}>
                            <tr onClick={() => toggleRow(order.id)} className="cursor-pointer">
                                <th scope="row">{order.id}</th>
                                <td>{order.client.name}</td>
                                <td className="text-end">{order.value.toFixed(2)}</td>
                                <td>{new Date(order.placedAt).toLocaleDateString()}</td>
                                <td>
                                    <span className={`badge bg-${order.statusColor}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="text-end">
                                    <FontAwesomeIcon icon={openRowId === order.id ? faChevronUp : faChevronDown} />
                                </td>
                            </tr>

                            {openRowId === order.id && (
                                <tr>
                                    <td colSpan="6">
                                        <div className="p-3 bg-light">
                                            <Row>
                                                <Col md={6}>
                                                    <ul className="mb-2">
                                                        <li>
                                                            <strong>Shipping address:</strong> {order.shippingAddress}
                                                        </li>
                                                        <li>
                                                            <strong>Payment method:</strong> {order.paymentMethod}
                                                        </li>
                                                        <li>
                                                            <strong>Notes:</strong> {order.notes ?? '-'}
                                                        </li>
                                                    </ul>
                                                </Col>
                                                <Col md={6} className="text-end">
                                                    <Button
                                                        size="sm"
                                                        variant="outline-primary"
                                                        className="me-2"
                                                        onClick={() => onEditOrder(order)}
                                                    >
                                                        <FontAwesomeIcon icon={faEdit} /> Edit
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline-danger"
                                                        onClick={() => onDeleteOrder(order.id)}
                                                    >
                                                        <FontAwesomeIcon icon={faTrashAlt} /> Delete
                                                    </Button>
                                                </Col>
                                            </Row>
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

export default OrdersTable;
