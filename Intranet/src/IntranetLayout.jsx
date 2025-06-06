import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Row, Col, OverlayTrigger, Tooltip, Image } from 'react-bootstrap';
import './IntranetLayout.css';
import ButtonPanel from './ButtonPanel';
import { AiOutlineUser, AiOutlineLogout, AiOutlineMoon, AiOutlineNotification } from "react-icons/ai";
import Dropdown from 'react-bootstrap/Dropdown';
import NotificationsDropdown from './NotificationsDropdown';
import KeyOrderDark from './assets/KeyOrder_dark.png'

const IntranetLayout = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark-mode');
            document.getElementById().add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [darkMode]);

    const tooltipContent = {
        notifications: <Tooltip id="tooltip-notifications">Notification</Tooltip>,
        darkMode: <Tooltip id="tooltip-darkmode">{darkMode ? 'Light mode' : 'Dark mode'}</Tooltip>,
        logout: <Tooltip id="tooltip-logout">Logout</Tooltip>,
        profile: <Tooltip id="tooltip-profile">User Profile</Tooltip>
    };

    return (
        <Container fluid>
            <Row className="intranet-layout">
                <Col
                    className="position-xs-fixed position-lg-relative w-xs-100 p-0 col-sm-2"
                    style={{ width: '295px' }}
                >
                    <div
                        className="sidebar menu h-100 position-xs-fixed position-lg-relative menu-m-animate menu-m-active"
                        style={{ width: '295px' }}
                    >
                        <div className="menu-naglowek d-flex justify-content-center border-bottom-header">
                            <div className="d-flex flex-column justify-content-center">
                                <Image className="logoImage" src={KeyOrderDark} alt="KeyOrderDark" />
                            </div>
                        </div>
                        <div className="menu-body">
                            <ButtonPanel />
                        </div>
                    </div>
                </Col>
                <Col className="p-0 flex-fill col-sm-8">
                    <Row className="d-flex flex-row m-0 p-0 border-bottom-header h-lg-86px belka-gorna">
                        <Col className="menuPrawyGornyRog d-none d-lg-flex col-lg-12 col-sm-12">
                            <ul className="menuPrawyGornyRog-ikonki">
                                <li>
                                    <NotificationsDropdown />
                                </li>
                                <li>
                                    <OverlayTrigger
                                        placement="bottom"
                                        overlay={tooltipContent.darkMode}
                                    >
                                        <a onClick={toggleDarkMode} style={{ cursor: 'pointer' }}>
                                            <AiOutlineMoon className="ant-icons" />
                                        </a>
                                    </OverlayTrigger>
                                </li>
                                <li>
                                    <OverlayTrigger placement="bottom" overlay={tooltipContent.logout}>
                                        <a>
                                            <AiOutlineLogout className="ant-icons" />
                                        </a>
                                    </OverlayTrigger>
                                </li>
                                <li>
                                    <Dropdown align="end">
                                        <OverlayTrigger placement="bottom" overlay={tooltipContent.profile}>
                                            <Dropdown.Toggle as="a" className="dropdown-toggle-icon">
                                                <AiOutlineUser className="ant-icons" />
                                            </Dropdown.Toggle>
                                        </OverlayTrigger>
                                        <Dropdown.Menu className="dropdownMenu">
                                            <Dropdown.Item href="#/action-1">Profil Info</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">
                                                Ustawienia Konta
                                            </Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">Log out</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                    <div className="fs-7 border-bottom-2px breadcumb-divider-space site-map"></div>
                    {/* Obszar g³ówny */}
                    <div className="MainContentWrapper">
                        <div className="main-content">
                            {children ? (
                                children
                            ) : (
                                <div>
                                    <h2>Admin panel</h2>
                                    <p>To jest przyk³adowa zawartoœæ strony intranetu.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default IntranetLayout;
