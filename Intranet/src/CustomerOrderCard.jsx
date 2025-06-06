import React from 'react';
import { Card, Table, Badge, Image } from 'react-bootstrap';
import { AiOutlineReload } from 'react-icons/ai';
import './CustomerOrderCard.css';

const orders = [
    { name: 'Press', avatar: 'https://i.pravatar.cc/30?img=1', address: 'London', date: '22.08.2022', status: 'Delivered', price: '$920' },
    { name: 'Marina', avatar: 'https://i.pravatar.cc/30?img=2', address: 'Man city', date: '24.08.2022', status: 'Processed', price: '$452' },
    { name: 'Alex', avatar: 'https://i.pravatar.cc/30?img=3', address: 'Unknown', date: '18.08.2022', status: 'Cancelled', price: '$1200' },
    { name: 'Robert', avatar: 'https://i.pravatar.cc/30?img=4', address: 'New York', date: '03.08.2022', status: 'Delivered', price: '$1235' },
    { name: 'Anna', avatar: 'https://i.pravatar.cc/30?img=4', address: 'New York', date: '03.08.2022', status: 'Delivered', price: '$1235' },
    { name: 'Pinotchet', avatar: 'https://i.pravatar.cc/30?img=4', address: 'New York', date: '03.08.2022', status: 'Delivered', price: '$1235' },
    { name: 'Juan Pablo Secondo', avatar: 'https://i.pravatar.cc/30?img=4', address: 'New York', date: '03.08.2022', status: 'Delivered', price: '$1235' },
    { name: 'Pol Pot', avatar: 'https://i.pravatar.cc/30?img=4', address: 'New York', date: '03.08.2022', status: 'Delivered', price: '$1235' },
   
];

const getStatusColor = (status) => {
    switch (status) {
        case 'Delivered': return 'success';
        case 'Processed': return 'info';
        case 'Cancelled': return 'danger';
        default: return 'secondary';
    }
};

const CustomerOrdersCard = () => (
    <Card className="shadow-sm customer-orders-card">
        <Card.Body>
            <Card.Title className="d-flex justify-content-between align-items-center mb-3">
                <span>Customer Orders</span>
                <AiOutlineReload className="reload-icon" />
            </Card.Title>
            <div className="wrapperTable">
            <Table responsive hover className="align-middle">
                <thead>
                    <tr>
                        <th>Profile</th>
                        <th>Address</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th className="text-end">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={index} className={`order-row ${order.status.toLowerCase()}`}>
                            <td>
                                <Image src={order.avatar} roundedCircle className="me-2" />
                                {order.name}
                            </td>
                            <td>{order.address}</td>
                            <td>{order.date}</td>
                            <td>
                                <Badge bg={getStatusColor(order.status)}>
                                    {order.status}
                                </Badge>
                            </td>
                            <td className="text-end">{order.price}</td>
                        </tr>
                    ))}
                </tbody>
                </Table>
            </div>
        </Card.Body>
    </Card>
);

export default CustomerOrdersCard;
