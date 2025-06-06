import React from 'react';
import { Dropdown, Badge } from 'react-bootstrap';
import { AiOutlineNotification } from 'react-icons/ai';
import './NotificationsDropdown.css';

const NotificationsDropdown = () => {
    return (
        <Dropdown align="end" className="notifications-dropdown">
            <Dropdown.Toggle as="a" className="dropdown-toggle-icon">
                <AiOutlineNotification className="ant-icons" />
                <Badge bg="danger" pill className="notification-badge">3</Badge>
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdownMenu shadow">
                <div className="dropdown-header px-3 pt-2 pb-1">
                    <strong>Powiadomienia</strong>
                </div>
                <Dropdown.Divider />

                <Dropdown.Item href="#/1" className="notification-item">
                    <div className="notification-title">New Order</div>
                    <div className="notification-text">Lorem ipsum dolor sit amet, consectetur.</div>
                </Dropdown.Item>

                <Dropdown.Item href="#/2" className="notification-item">
                    <div className="notification-title">Message from client</div>
                    <div className="notification-text">Duis aute irure dolor in reprehenderit...</div>
                </Dropdown.Item>

                <Dropdown.Item href="#/3" className="notification-item">
                    <div className="notification-title">System upgrade</div>
                    <div className="notification-text">Excepteur sint occaecat cupidatat non proident.</div>
                </Dropdown.Item>

                <Dropdown.Divider />
                <Dropdown.Item href="#/all" className="linkToAllNot text-center text-primary">
                    Zobacz wszystkie powiadomienia
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default NotificationsDropdown;
