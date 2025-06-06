import React, { useState, useMemo } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronUp, faChevronDown,
    faSortUp, faSortDown,
    faEdit, faTrashAlt
} from '@fortawesome/free-solid-svg-icons';

const InvoicesTable = ({ invoices, onEdit, onDelete }) => {
    const [openId, setOpenId] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
    const [q, setQ] = useState('');

    const toggle = id => setOpenId(openId === id ? null : id);

    const sorted = useMemo(() => {
        let arr = [...invoices];

        if (q) {
            const low = q.toLowerCase();
            arr = arr.filter(i => i.clientName.toLowerCase().includes(low));
        }

        if (sortConfig.key) {
            arr.sort((a, b) => {
                let aV = a[sortConfig.key];
                let bV = b[sortConfig.key];
                if (sortConfig.key === 'date' || sortConfig.key === 'dueDate') {
                    aV = new Date(aV); bV = new Date(bV);
                }
                if (aV < bV) return sortConfig.direction === 'ascending' ? -1 : 1;
                if (aV > bV) return sortConfig.direction === 'ascending' ? 1 : -1;
                return 0;
            });
        }
        return arr;
    }, [invoices, sortConfig, q]);

    const sortBy = key => {
        setSortConfig(prev => ({
            key,
            direction: prev.key === key && prev.direction === 'ascending'
                ? 'descending' : 'ascending'
        }));
    };

    const icon = key =>
        sortConfig.key === key
            ? (sortConfig.direction === 'ascending' ? faSortUp : faSortDown)
            : null;

    return (
        <div className="table-responsive">
            <Row className="mb-3">
                <Col lg={6}>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by client"
                        value={q}
                        onChange={e => setQ(e.target.value)}
                    />
                </Col>
            </Row>

            <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                    <tr>
                        <th onClick={() => sortBy('id')} className="cursor-pointer">
                            # {icon('id') && <FontAwesomeIcon icon={icon('id')} />}
                        </th>
                        <th onClick={() => sortBy('clientName')} className="cursor-pointer">
                            Client {icon('clientName') && <FontAwesomeIcon icon={icon('clientName')} />}
                        </th>
                        <th onClick={() => sortBy('amount')} className="cursor-pointer text-end">
                            Amount {icon('amount') && <FontAwesomeIcon icon={icon('amount')} />}
                        </th>
                        <th onClick={() => sortBy('date')} className="cursor-pointer">
                            Date {icon('date') && <FontAwesomeIcon icon={icon('date')} />}
                        </th>
                        <th onClick={() => sortBy('status')} className="cursor-pointer">
                            Status {icon('status') && <FontAwesomeIcon icon={icon('status')} />}
                        </th>
                        <th className="text-end">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {sorted.map(inv => (
                        <React.Fragment key={inv.id}>
                            <tr onClick={() => toggle(inv.id)} className="cursor-pointer">
                                <th scope="row">{inv.id}</th>
                                <td>{inv.clientName}</td>
                                <td className="text-end">{inv.amount}</td>
                                <td>{inv.issuedAt}</td>
                                <td>
                                    <span className={`badge bg-${inv.statusColor}`}>
                                        {inv.status}
                                    </span>
                                </td>
                                <td className="text-end">
                                    <FontAwesomeIcon icon={openId === inv.id ? faChevronUp : faChevronDown} />
                                </td>
                            </tr>
                            {openId === inv.id && (
                                <tr>
                                    <td colSpan="6">
                                        <div className="p-3 bg-light">
                                            <strong>Invoice details:</strong>
                                            <ul className="mb-2">
                                                <li><strong>Due date:</strong> {inv.dueDate}</li>
                                                <li><strong>Payment method:</strong> {inv.paymentMethod}</li>
                                                <li><strong>Invoice type:</strong>   {inv.invoiceType}</li>
                                            </ul>
                                            {inv.notes && <small className="text-muted">{inv.notes}</small>}
                                            <div className="mt-2">
                                                <Button size="sm" variant="outline-primary" className="me-2"
                                                    onClick={() => onEdit(inv)}>
                                                    <FontAwesomeIcon icon={faEdit} /> Edit
                                                </Button>
                                                <Button size="sm" variant="outline-danger"
                                                    onClick={() => onDelete(inv.id)}>
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

export default InvoicesTable;
