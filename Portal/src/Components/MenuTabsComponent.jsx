import React from 'react';
import { Tabs, Tab, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCreditCard,
    faTruck,
    faFile
} from '@fortawesome/free-solid-svg-icons';

export default function TestimonialComponent() {
    return (
        <div className="tabs-wrapper">
            <Tabs
                defaultActiveKey="home"
                id="justify-tab-example"
                className="mb-3"
                fill
            >
                <Tab eventKey="home" title="Omnichannel sales" className="menuTabs">
                    <Row style={{ minHeight: '400px' }} >
                        <Col lg={4}>
                            
                                <Row className="mx-3 padding-30 margin-30">
                                    <h5 className="megless-header">Konfiguracja</h5>
                                </Row>
                                <Row className="mt30">
                                    <ul style={{ listStyle: 'none', padding: 0 }} className="margin-30">
                                        <li style={{ marginBottom: '2rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <FontAwesomeIcon icon={faCreditCard} className="mega-item-icon" style={{ marginRight: 8 }} />
                                                <h6 style={{ margin: 0 }}>Payments System</h6>
                                            </div>
                                            <p style={{ fontSize: 14, marginLeft: 26, marginRight: 100, maxWidth: 400 }}>
                                                Quickly activate any payment method.
                                            </p>
                                        </li>
                                        <li style={{ marginBottom: '2rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <FontAwesomeIcon icon={faTruck} className="mega-item-icon" style={{ marginRight: 8 }} />
                                                <h6 style={{ margin: 0 }}>Delivery</h6>
                                            </div>
                                            <p style={{ fontSize: 14, marginLeft: 26, marginRight: 100, maxWidth: 400 }}>
                                                Quickly activate any payment method.
                                            </p>
                                        </li>
                                        <li style={{ marginBottom: '2rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <FontAwesomeIcon icon={faFile} className="mega-item-icon" style={{ marginRight: 8 }} />
                                                <h6 style={{ margin: 0 }}>Store Regulations</h6>
                                            </div>
                                            <p style={{ fontSize: 14, marginLeft: 26, marginRight: 100, maxWidth: 400 }}>
                                                Use the creator for handling legal documents.
                                            </p>
                                        </li>
                                      
                                    </ul>
                                </Row>
                         </Col>
                      

                        <Col
                            lg={4}
                            className="with-divider ps-3 pe-3"
                            style={{ minHeight: '400px' }}
                        >
                            <Row className="mx-3 padding-30 margin-30">
                                <h5 className="megless-header">Konfiguracja</h5>
                            </Row>
                            <Row className="mt30">
                                <ul style={{ listStyle: 'none', padding: 0 }} className="margin-30">
                                    <li style={{ marginBottom: '2rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <FontAwesomeIcon icon={faCreditCard} className="mega-item-icon" style={{ marginRight: 8 }} />
                                            <h6 style={{ margin: 0 }}>Payments System</h6>
                                        </div>
                                        <p style={{ fontSize: 14, marginLeft: 26, marginRight: 100, maxWidth: 400 }}>
                                            Quickly activate any payment method.
                                        </p>
                                    </li>
                                    <li style={{ marginBottom: '2rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <FontAwesomeIcon icon={faTruck} className="mega-item-icon" style={{ marginRight: 8 }} />
                                            <h6 style={{ margin: 0 }}>Delivery</h6>
                                        </div>
                                        <p style={{ fontSize: 14, marginLeft: 26, marginRight: 100, maxWidth: 400 }}>
                                            Quickly activate any payment method.
                                        </p>
                                    </li>
                                    <li style={{ marginBottom: '2rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <FontAwesomeIcon icon={faFile} className="mega-item-icon" style={{ marginRight: 8 }} />
                                            <h6 style={{ margin: 0 }}>Store Regulations</h6>
                                        </div>
                                        <p style={{ fontSize: 14, marginLeft: 26, marginRight: 100, maxWidth: 400 }}>
                                            Use the creator for handling legal documents.
                                        </p>
                                    </li>

                                </ul>
                            </Row>
                        </Col>

                        <Col
                            lg={4}
                            className="with-divider ps-3 pe-3"
                            style={{ minHeight: '400px' }}
                        >
                            <Row className="mx-3 padding-30 margin-30">
                                <h5 className="megless-header">Konfiguracja</h5>
                            </Row>
                            <Row className="mt30">
                                <ul style={{ listStyle: 'none', padding: 0 }} className="margin-30">
                                    <li style={{ marginBottom: '2rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <FontAwesomeIcon icon={faCreditCard} className="mega-item-icon" style={{ marginRight: 8 }} />
                                            <h6 style={{ margin: 0 }}>Payments System</h6>
                                        </div>
                                        <p style={{ fontSize: 14, marginLeft: 26, marginRight: 100, maxWidth: 400 }}>
                                            Quickly activate any payment method.
                                        </p>
                                    </li>
                                    <li style={{ marginBottom: '2rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <FontAwesomeIcon icon={faTruck} className="mega-item-icon" style={{ marginRight: 8 }} />
                                            <h6 style={{ margin: 0 }}>Delivery</h6>
                                        </div>
                                        <p style={{ fontSize: 14, marginLeft: 26, marginRight: 100, maxWidth: 400 }}>
                                            Quickly activate any payment method.
                                        </p>
                                    </li>
                                    <li style={{ marginBottom: '2rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <FontAwesomeIcon icon={faFile} className="mega-item-icon" style={{ marginRight: 8 }} />
                                            <h6 style={{ margin: 0 }}>Store Regulations</h6>
                                        </div>
                                        <p style={{ fontSize: 14, marginLeft: 26, marginRight: 100, maxWidth: 400 }}>
                                            Use the creator for handling legal documents.
                                        </p>
                                    </li>

                                </ul>
                            </Row>
                        </Col>
                    </Row>
                </Tab>
                <Tab eventKey="integrations" title="Integrations" className="menuTabs">
                    <Row style={{ minHeight: '400px' }} >
                        <Col lg={4}>
                      
                            <Row className="mx-3 padding-30 margin-30">
                                <h5 className="megless-header">Programs</h5>
                            </Row>
                            <Row className="mt30">
                                <ul style={{ listStyle: 'none', padding: 0 }} className="margin-30">
                                    <li style={{ marginBottom: '2rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <FontAwesomeIcon icon={faCreditCard} className="mega-item-icon" style={{ marginRight: 8 }} />
                                            <h6 style={{ margin: 0 }}>Payments System</h6>
                                        </div>
                                        <p style={{ fontSize: 14, marginLeft: 26, marginRight: 100, maxWidth: 400 }}>
                                            Quickly activate any payment method.
                                        </p>
                                    </li>
                                    <li style={{ marginBottom: '2rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <FontAwesomeIcon icon={faTruck} className="mega-item-icon" style={{ marginRight: 8 }} />
                                            <h6 style={{ margin: 0 }}>Delivery</h6>
                                        </div>
                                        <p style={{ fontSize: 14, marginLeft: 26, marginRight: 100, maxWidth: 400 }}>
                                            Quickly activate any payment method.
                                        </p>
                                    </li>
                                    <li style={{ marginBottom: '2rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <FontAwesomeIcon icon={faFile} className="mega-item-icon" style={{ marginRight: 8 }} />
                                            <h6 style={{ margin: 0 }}>Store Regulations</h6>
                                        </div>
                                        <p style={{ fontSize: 14, marginLeft: 26, marginRight: 100, maxWidth: 400 }}>
                                            Use the creator for handling legal documents.
                                        </p>
                                    </li>

                                </ul>
                            </Row>
                        </Col>

                        <Col
                            lg={4}
                            className="with-divider ps-3 pe-3"
                            style={{ minHeight: '400px' }}
                        >
                            <Row className="mx-3 padding-30 margin-30">
                                <h5 className="megless-header" style={{ color: '#ffffff' } }>Configurations</h5>
                            </Row>
                            <Row className="mt30">
                                <ul style={{ listStyle: 'none', padding: 0 }} className="margin-30">
                                    <li style={{ marginBottom: '2rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <FontAwesomeIcon icon={faCreditCard} className="mega-item-icon" style={{ marginRight: 8 }} />
                                            <h6 style={{ margin: 0 }}>Payments System</h6>
                                        </div>
                                        <p style={{ fontSize: 14, marginLeft: 26, marginRight: 100, maxWidth: 400 }}>
                                            Quickly activate any payment method.
                                        </p>
                                    </li>
                                    <li style={{ marginBottom: '2rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <FontAwesomeIcon icon={faTruck} className="mega-item-icon" style={{ marginRight: 8 }} />
                                            <h6 style={{ margin: 0 }}>Delivery</h6>
                                        </div>
                                        <p style={{ fontSize: 14, marginLeft: 26, marginRight: 100, maxWidth: 400 }}>
                                            Quickly activate any payment method.
                                        </p>
                                    </li>
                                    <li style={{ marginBottom: '2rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <FontAwesomeIcon icon={faFile} className="mega-item-icon" style={{ marginRight: 8 }} />
                                            <h6 style={{ margin: 0 }}>Store Regulations</h6>
                                        </div>
                                        <p style={{ fontSize: 14, marginLeft: 26, marginRight: 100, maxWidth: 400 }}>
                                            Use the creator for handling legal documents.
                                        </p>
                                    </li>

                                </ul>
                            </Row>
                        </Col>

                        <Col
                            lg={4}
                            className="with-divider ps-3 pe-3"
                            style={{ minHeight: '400px' }}
                        >
                            <Row className="mx-3 padding-30 margin-30">
                                <h5 className="megless-header">Extensions</h5>
                            </Row>
                            <Row className="mt30">
                                <ul style={{ listStyle: 'none', padding: 0 }} className="margin-30">
                                    <li style={{ marginBottom: '2rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <FontAwesomeIcon icon={faCreditCard} className="mega-item-icon" style={{ marginRight: 8 }} />
                                            <h6 style={{ margin: 0 }}>Payments System</h6>
                                        </div>
                                        <p style={{ fontSize: 14, marginLeft: 26, marginRight: 100, maxWidth: 400 }}>
                                            Quickly activate any payment method.
                                        </p>
                                    </li>
                                    <li style={{ marginBottom: '2rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <FontAwesomeIcon icon={faTruck} className="mega-item-icon" style={{ marginRight: 8 }} />
                                            <h6 style={{ margin: 0 }}>Delivery</h6>
                                        </div>
                                        <p style={{ fontSize: 14, marginLeft: 26, marginRight: 100, maxWidth: 400 }}>
                                            Quickly activate any payment method.
                                        </p>
                                    </li>
                                    <li style={{ marginBottom: '2rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <FontAwesomeIcon icon={faFile} className="mega-item-icon" style={{ marginRight: 8 }} />
                                            <h6 style={{ margin: 0 }}>Store Regulations</h6>
                                        </div>
                                        <p style={{ fontSize: 14, marginLeft: 26, marginRight: 100, maxWidth: 400 }}>
                                            Use the creator for handling legal documents.
                                        </p>
                                    </li>

                                </ul>
                            </Row>
                        </Col>
                    </Row>
                </Tab>
                <Tab eventKey="FinancialService" title="Financial Service" className="menuTabs">
                    <Row style={{ minHeight: '400px' }} >
                        <Col lg={4}>

                            <Row className="mx-3 padding-30 margin-30">
                                <h5 className="megless-header">Konfiguracja</h5>
                            </Row>
                            <Row className="mt30">
                                <ul style={{ listStyle: 'none', padding: 0 }} className="margin-30">
                                    <li style={{ marginBottom: '2rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <FontAwesomeIcon icon={faCreditCard} className="mega-item-icon" style={{ marginRight: 8 }} />
                                            <h6 style={{ margin: 0 }}>Payments System</h6>
                                        </div>
                                        <p style={{ fontSize: 14, marginLeft: 26, marginRight: 100, maxWidth: 400 }}>
                                            Quickly activate any payment method.
                                        </p>
                                    </li>
                                    <li style={{ marginBottom: '2rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <FontAwesomeIcon icon={faTruck} className="mega-item-icon" style={{ marginRight: 8 }} />
                                            <h6 style={{ margin: 0 }}>Delivery</h6>
                                        </div>
                                        <p style={{ fontSize: 14, marginLeft: 26, marginRight: 100, maxWidth: 400 }}>
                                            Quickly activate any payment method.
                                        </p>
                                    </li>
                                    <li style={{ marginBottom: '2rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <FontAwesomeIcon icon={faFile} className="mega-item-icon" style={{ marginRight: 8 }} />
                                            <h6 style={{ margin: 0 }}>Store Regulations</h6>
                                        </div>
                                        <p style={{ fontSize: 14, marginLeft: 26, marginRight: 100, maxWidth: 400 }}>
                                            Use the creator for handling legal documents.
                                        </p>
                                    </li>

                                </ul>
                            </Row>
                        </Col>

                        <Col
                            lg={4}
                            className="with-divider ps-3 pe-3"
                            style={{ minHeight: '400px' }}
                        >
                            <Row className="mx-3 padding-30 margin-30">
                                <h5 className="megless-header">Konfiguracja</h5>
                            </Row>
                            <Row className="mt30">
                                <ul style={{ listStyle: 'none', padding: 0 }} className="margin-30">
                                    <li style={{ marginBottom: '2rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <FontAwesomeIcon icon={faCreditCard} className="mega-item-icon" style={{ marginRight: 8 }} />
                                            <h6 style={{ margin: 0 }}>Payments System</h6>
                                        </div>
                                        <p style={{ fontSize: 14, marginLeft: 26, marginRight: 100, maxWidth: 400 }}>
                                            Quickly activate any payment method.
                                        </p>
                                    </li>
                                    <li style={{ marginBottom: '2rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <FontAwesomeIcon icon={faTruck} className="mega-item-icon" style={{ marginRight: 8 }} />
                                            <h6 style={{ margin: 0 }}>Delivery</h6>
                                        </div>
                                        <p style={{ fontSize: 14, marginLeft: 26, marginRight: 100, maxWidth: 400 }}>
                                            Quickly activate any payment method.
                                        </p>
                                    </li>
                                    <li style={{ marginBottom: '2rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <FontAwesomeIcon icon={faFile} className="mega-item-icon" style={{ marginRight: 8 }} />
                                            <h6 style={{ margin: 0 }}>Store Regulations</h6>
                                        </div>
                                        <p style={{ fontSize: 14, marginLeft: 26, marginRight: 100, maxWidth: 400 }}>
                                            Use the creator for handling legal documents.
                                        </p>
                                    </li>

                                </ul>
                            </Row>
                        </Col>

                        <Col
                            lg={4}
                            className="with-divider ps-3 pe-3"
                            style={{ minHeight: '400px' }}
                        >
                            <Row className="mx-3 padding-30 margin-30">
                                <h5 className="megless-header">Konfiguracja</h5>
                            </Row>
                            <Row className="mt30">
                                <ul style={{ listStyle: 'none', padding: 0 }} className="margin-30">
                                    <li style={{ marginBottom: '2rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <FontAwesomeIcon icon={faCreditCard} className="mega-item-icon" style={{ marginRight: 8 }} />
                                            <h6 style={{ margin: 0 }}>Payments System</h6>
                                        </div>
                                        <p style={{ fontSize: 14, marginLeft: 26, marginRight: 100, maxWidth: 400 }}>
                                            Quickly activate any payment method.
                                        </p>
                                    </li>
                                    <li style={{ marginBottom: '2rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <FontAwesomeIcon icon={faTruck} className="mega-item-icon" style={{ marginRight: 8 }} />
                                            <h6 style={{ margin: 0 }}>Delivery</h6>
                                        </div>
                                        <p style={{ fontSize: 14, marginLeft: 26, marginRight: 100, maxWidth: 400 }}>
                                            Quickly activate any payment method.
                                        </p>
                                    </li>
                                    <li style={{ marginBottom: '2rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <FontAwesomeIcon icon={faFile} className="mega-item-icon" style={{ marginRight: 8 }} />
                                            <h6 style={{ margin: 0 }}>Store Regulations</h6>
                                        </div>
                                        <p style={{ fontSize: 14, marginLeft: 26, marginRight: 100, maxWidth: 400 }}>
                                            Use the creator for handling legal documents.
                                        </p>
                                    </li>

                                </ul>
                            </Row>
                        </Col>
                    </Row>
                </Tab>
            </Tabs>
        </div>
    );
}
