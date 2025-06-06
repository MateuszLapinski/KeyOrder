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

const ProductsTable = ({ products, onEdit, onDelete }) => {
    const [openRowId, setOpenRowId] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
    const [searchQuery, setSearchQuery] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const toggleRow = id => setOpenRowId(openRowId === id ? null : id);

    const get = (obj, camel, pascal) =>
        obj[camel] !== undefined ? obj[camel] : obj[pascal];

    const sorted = useMemo(() => {
        let list = [...products];

        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            list = list.filter(p => {
                const name = (get(p, 'name', 'Name') || '').toString().toLowerCase();
                const sc = (get(p, 'shortcut', 'Shortcut') || '').toString().toLowerCase();
                return name.includes(q) || sc.includes(q);
            });
        }

        if (startDate) {
            list = list.filter(p => {
                const d = new Date(get(p, 'createdAt', 'CreatedAt'));
                return !isNaN(d) && d >= new Date(startDate);
            });
        }
        if (endDate) {
            list = list.filter(p => {
                const d = new Date(get(p, 'createdAt', 'CreatedAt'));
                return !isNaN(d) && d <= new Date(endDate);
            });
        }

        if (sortConfig.key) {
            list.sort((a, b) => {
                let aVal = get(a, sortConfig.key, sortConfig.key[0].toUpperCase() + sortConfig.key.slice(1));
                let bVal = get(b, sortConfig.key, sortConfig.key[0].toUpperCase() + sortConfig.key.slice(1));

                if (sortConfig.key === 'createdAt' || sortConfig.key === 'updatedAt') {
                    aVal = new Date(aVal);
                    bVal = new Date(bVal);
                } else if (typeof aVal === 'string') {
                    aVal = aVal.toLowerCase();
                    bVal = bVal.toLowerCase();
                }

                if (aVal < bVal) return sortConfig.direction === 'ascending' ? -1 : 1;
                if (aVal > bVal) return sortConfig.direction === 'ascending' ? 1 : -1;
                return 0;
            });
        }

        return list;
    }, [products, sortConfig, searchQuery, startDate, endDate]);

    const requestSort = key =>
        setSortConfig(prev => ({
            key,
            direction: prev.key === key && prev.direction === 'ascending' ? 'descending' : 'ascending'
        }));

    const sortIcon = key =>
        sortConfig.key === key ? <FontAwesomeIcon icon={sortConfig.direction === 'ascending' ? faSortUp : faSortDown} className="ms-1" /> : null;

    return (
        <div className="table-responsive">
            <Row className="mb-3">
                <Col lg={4}>
                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Search by name or shortcut"
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
                        onClick={() => { setSearchQuery(''); setStartDate(''); setEndDate(''); }}
                    >
                        Clear Filters
                    </button>
                </Col>
            </Row>
            <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                    <tr>
                        {[
                            ['id', '#'],
                            ['shortcut', 'Shortcut'],
                            ['name', 'Name'],
                            ['unitPrice', 'Price'],
                            ['stockQuantity', 'Stock'],
                            ['isActive', 'Active'],
                            ['createdAt', 'Created']
                        ].map(([key, label]) => (
                            <th key={key} onClick={() => requestSort(key)} className="cursor-pointer">
                                {label} {sortIcon(key)}
                            </th>
                        ))}
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {sorted.map(prod => {
                        const id = get(prod, 'id', 'Id');
                        const shortcut = get(prod, 'shortcut', 'Shortcut');
                        const name = get(prod, 'name', 'Name');
                        const price = get(prod, 'unitPrice', 'UnitPrice');
                        const stock = get(prod, 'stockQuantity', 'StockQuantity');
                        const active = get(prod, 'isActive', 'IsActive');
                        const created = new Date(get(prod, 'createdAt', 'CreatedAt'));
                        const updated = new Date(get(prod, 'updatedAt', 'UpdatedAt'));
                        return (
                            <React.Fragment key={id}>
                                <tr onClick={() => toggleRow(id)} className="cursor-pointer">
                                    <td>{id}</td>
                                    <td>{shortcut}</td>
                                    <td>{name}</td>
                                    <td className="text-end">{price.toFixed(2)}</td>
                                    <td className="text-end">{stock}</td>
                                    <td>
                                        <span className={`badge bg-${active ? 'success' : 'secondary'}`}>
                                            {active ? 'Yes' : 'No'}
                                        </span>
                                    </td>
                                    <td>{isNaN(created) ? '-' : created.toLocaleDateString()}</td>
                                    <td className="text-end">
                                        <FontAwesomeIcon icon={openRowId === id ? faChevronUp : faChevronDown} />
                                    </td>
                                </tr>
                                {openRowId === id && (
                                    <tr>
                                        <td colSpan="8">
                                            <div className="p-3 bg-light">
                                                <Row>
                                                    <Col md={8}>
                                                        <ul className="mb-2">
                                                            <li><strong>Description:</strong> {get(prod, 'description', 'Description') || '-'}</li>
                                                            <li><strong>Reorder Level:</strong> {get(prod, 'reorderLevel', 'ReorderLevel')}</li>
                                                            <li><strong>Last Updated:</strong> {isNaN(updated) ? '-' : updated.toLocaleDateString()}</li>
                                                        </ul>
                                                    </Col>
                                                    <Col md={4} className="text-end">
                                                        <Button size="sm" variant="outline-primary" className="me-2" onClick={() => onEdit(prod)}>
                                                            <FontAwesomeIcon icon={faEdit} /> Edit
                                                        </Button>
                                                        <Button size="sm" variant="outline-danger" onClick={() => onDelete(id)}>
                                                            <FontAwesomeIcon icon={faTrashAlt} /> Delete
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default ProductsTable;
