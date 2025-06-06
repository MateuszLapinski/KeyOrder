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

const UsersTable = ({ users, onEdit, onDelete }) => {
    const [openRowId, setOpenRowId] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: 'userID', direction: 'ascending' });
    const [searchQuery, setSearchQuery] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const toggleRow = id => setOpenRowId(openRowId === id ? null : id);

    const get = (obj, camel, pascal) =>
        obj[camel] !== undefined ? obj[camel] : obj[pascal];

    const sorted = useMemo(() => {
        let list = [...users];

        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            list = list.filter(u => {
                const username = (get(u, 'username', 'Username') || '').toString().toLowerCase();
                const email = (get(u, 'email', 'Email') || '').toString().toLowerCase();
                return username.includes(q) || email.includes(q);
            });
        }

        if (startDate) {
            list = list.filter(u => {
                const d = new Date(get(u, 'createdAt', 'CreatedAt'));
                return !isNaN(d) && d >= new Date(startDate);
            });
        }
        if (endDate) {
            list = list.filter(u => {
                const d = new Date(get(u, 'createdAt', 'CreatedAt'));
                return !isNaN(d) && d <= new Date(endDate);
            });
        }

        if (sortConfig.key) {
            list.sort((a, b) => {
                let aVal = get(a, sortConfig.key, sortConfig.key[0].toUpperCase() + sortConfig.key.slice(1));
                let bVal = get(b, sortConfig.key, sortConfig.key[0].toUpperCase() + sortConfig.key.slice(1));

                if (sortConfig.key === 'createdAt' || sortConfig.key === 'updatedAt' || sortConfig.key === 'lastLoginAt') {
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
    }, [users, sortConfig, searchQuery, startDate, endDate]);

    const requestSort = key =>
        setSortConfig(prev => ({
            key,
            direction: prev.key === key && prev.direction === 'ascending' ? 'descending' : 'ascending'
        }));

    const sortIcon = key =>
        sortConfig.key === key ? (
            <FontAwesomeIcon icon={sortConfig.direction === 'ascending' ? faSortUp : faSortDown} className="ms-1" />
        ) : null;

    return (
        <div className="table-responsive">
            <Row className="mb-3">
                <Col lg={4}>
                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Search by username or email"
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
                        onClick={() => {
                            setSearchQuery('');
                            setStartDate('');
                            setEndDate('');
                        }}
                    >
                        Clear Filters
                    </button>
                </Col>
            </Row>

            <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                    <tr>
                        {[
                            ['userID', '#'],
                            ['username', 'Username'],
                            ['email', 'Email'],
                            ['roleID', 'Role'],
                            ['isActive', 'Active'],
                            ['isLocked', 'Locked'],
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
                    {sorted.map(u => {
                        const id = get(u, 'userID', 'UserID');
                        const username = get(u, 'username', 'Username');
                        const email = get(u, 'email', 'Email');
                        const role = get(u, 'roleID', 'RoleID');
                        const active = get(u, 'isActive', 'IsActive');
                        const locked = get(u, 'isLocked', 'IsLocked');
                        const created = new Date(get(u, 'createdAt', 'CreatedAt'));

                        return (
                            <React.Fragment key={id}>
                                <tr onClick={() => toggleRow(id)} className="cursor-pointer">
                                    <td>{id}</td>
                                    <td>{username}</td>
                                    <td>{email}</td>
                                    <td>{role}</td>
                                    <td>
                                        <span className={`badge bg-${active ? 'success' : 'secondary'}`}>
                                            {active ? 'Yes' : 'No'}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`badge bg-${locked ? 'danger' : 'secondary'}`}>
                                            {locked ? 'Locked' : 'Unlocked'}
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
                                                            <li>
                                                                <strong>First Name:</strong> {get(u, 'firstName', 'FirstName') || '-'}
                                                            </li>
                                                            <li>
                                                                <strong>Last Name:</strong> {get(u, 'lastName', 'LastName') || '-'}
                                                            </li>
                                                            <li>
                                                                <strong>Phone Number:</strong> {get(u, 'phoneNumber', 'PhoneNumber') || '-'}
                                                            </li>
                                                            <li>
                                                                <strong>Last Login:</strong>{' '}
                                                                {get(u, 'lastLoginAt', 'LastLoginAt')
                                                                    ? new Date(get(u, 'lastLoginAt', 'LastLoginAt')).toLocaleString()
                                                                    : '-'}
                                                            </li>
                                                            <li>
                                                                <strong>Two-Factor:</strong>{' '}
                                                                {get(u, 'twoFactorEnabled', 'TwoFactorEnabled') ? 'Enabled' : 'Disabled'}
                                                            </li>
                                                            <li>
                                                                <strong>Language:</strong> {get(u, 'language', 'Language') || '-'}
                                                            </li>
                                                            <li>
                                                                <strong>Profile Image URL:</strong>{' '}
                                                                {get(u, 'profileImageURL', 'ProfileImageURL') ? (
                                                                    <a href={get(u, 'profileImageURL', 'ProfileImageURL')} target="_blank" rel="noopener noreferrer">
                                                                        View
                                                                    </a>
                                                                ) : (
                                                                    '-'
                                                                )}
                                                            </li>
                                                            <li>
                                                                <strong>Notes:</strong> {get(u, 'notes', 'Notes') || '-'}
                                                            </li>
                                                        </ul>
                                                    </Col>
                                                    <Col md={4} className="text-end">
                                                        <Button
                                                            size="sm"
                                                            variant="outline-primary"
                                                            className="me-2"
                                                            onClick={() => onEdit(u)}
                                                        >
                                                            <FontAwesomeIcon icon={faEdit} /> Edit
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="outline-danger"
                                                            onClick={() => onDelete(id)}
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
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default UsersTable;
