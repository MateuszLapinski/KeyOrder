import React from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   
    faPuzzlePiece,
    faCreditCard,
    faTruck,
    faFile,
    faMessage

} from '@fortawesome/free-solid-svg-icons';

const CustomMegaContent = () => {
    return (
        <Container fluid>
        <Row>
                <Col lg={3} className="first_mega-col-left">
                
                <Row className="mx-3 padding-30 margin-30">
                    <h3 className="mega-header">Manage your order, share platform to your client</h3>
                 </Row>
                <Row>
                        <Button className="margin-30 trialButton">Free 14-days Trial</Button>
                        <p className="trialText margin-30">Try without obligations, without subscription</p>
                        <ul style={{ listStyle: 'none', padding: 0 }} className="margin-30">
                            <li style={{ marginBottom: '2rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <FontAwesomeIcon icon={faPuzzlePiece} className="mega-item-icon" style={{ marginRight: 8 }} />
                                    <h5 style={{ margin: 0 }}>KeyOrder Premium</h5>
                                </div>
                                <p style={{ fontSize: 14, marginLeft: 26, marginRight:100}}>
                                    Gain support for high traffic in the store, dedicated implementations and integrations. Move your store to KeyOrder.
                                </p>
                            </li>
                            <li>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <FontAwesomeIcon icon={faPuzzlePiece} className="mega-item-icon" style={{ marginRight: 8 }} />
                                    <h5 style={{ margin: 0 }}>Migrate to KeyOrder</h5>
                                </div>
                                <p style={{ fontSize: 14, marginLeft: 26, marginRight: 100 }}>
                                    Sell more with new software, without data loss.
                                </p>
                            </li>
                        </ul>

                </Row>
            </Col>

                <Col lg={3} className="mega-col">
                    <Row className="mx-3 padding-30 margin-30">
                        <h5 className="megless-header">Konfiguracja</h5>
                    </Row>
                    <Row className="mt30">
                        <ul style={{ listStyle: 'none', padding: 0 }} className="margin-30">
                            <li style={{ marginBottom: '2rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center'}}>
                                    <FontAwesomeIcon icon={faCreditCard} className="mega-item-icon" style={{ marginRight: 8 }} />
                                    <h6 style={{ margin: 0 }}>Payments System</h6>
                                </div>
                                <p style={{ fontSize: 14, marginLeft: 26, marginRight: 100, maxWidth: 400}}>
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
                            <li style={{ marginBottom: '2rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <FontAwesomeIcon icon={faPuzzlePiece} className="mega-item-icon" style={{ marginRight: 8 }} />
                                    <h6 style={{ margin: 0 }}>Integrations and Extentions</h6>
                                </div>
                                <p style={{ fontSize: 14, marginLeft: 26, marginRight: 100, maxWidth: 400 }}>
                                    Choose from many ready-made integrations, plugins, and add-ons.
                                </p>
                            </li>
                        </ul>
                    </Row>
                </Col>
                <Col lg={3} className="mega-col">
                    <Row className="mx-3 padding-30 margin-30">
                        <h5 className="megless-header" style={{color:'#ffffff'}}>Key Order</h5>
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
                            <li style={{ marginBottom: '2rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <FontAwesomeIcon icon={faPuzzlePiece} className="mega-item-icon" style={{ marginRight: 8 }} />
                                    <h6 style={{ margin: 0 }}>Integrations and Extentions</h6>
                                </div>
                                <p style={{ fontSize: 14, marginLeft: 26, marginRight: 100, maxWidth: 400 }}>
                                    Choose from many ready-made integrations, plugins, and add-ons.
                                </p>
                            </li>
                        </ul>
                    </Row>
                </Col>
                <Col lg={3} className="mega-col">
                    <Row className="mx-3 padding-30 margin-30">
                        <h5 className="megless-header">Clients</h5>
                    </Row>
                    <Row className="mt30">
                        <ul style={{ listStyle: 'none', padding: 0 }} className="margin-30">
                            <li style={{ marginBottom: '2rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <FontAwesomeIcon icon={faPuzzlePiece} className="mega-item-icon" style={{ marginRight: 8 }} />
                                    <h6 style={{ margin: 0 }}>Key Order</h6>
                                </div>
                                <p style={{ fontSize: 14, marginLeft: 26, marginRight: 100 }}>
                                    Check how stores from different industries work.
                                </p>
                            </li>
                            <li>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <FontAwesomeIcon icon={faMessage} className="mega-item-icon" style={{ marginRight: 8 }} />
                                    <h6 style={{ margin: 0 }}>Opinion about us</h6>
                                </div>
                                <p style={{ fontSize: 14, marginLeft: 26, marginRight: 100 }}>
                                    See how customers rate us.
                                </p>
                            </li>
                        </ul>
                    </Row>

                </Col>

            </Row> 
        </Container>
    );
};

export default CustomMegaContent;
