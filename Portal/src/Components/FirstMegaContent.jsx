// src/components/CustomMegaContent.jsx

import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faShoppingCart,
    faCreditCard,
    faTruck,
    faCertificate,
    faPuzzlePiece,

} from '@fortawesome/free-solid-svg-icons';

const CustomMegaContent = () => {
    return (
        <Row>
            <Col lg={3} className="first_mega-col-left">
                <Row className="mx-3 padding-30">
                    <h5 className="mega-header">Start</h5>
                 </Row>
                <Row>
                <p>Few steps to your shop:</p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li>
                        <FontAwesomeIcon icon={faShoppingCart} className="mega-item-icon" />
                        Wgraj produkty
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faCreditCard} className="mega-item-icon" />
                        Skonfiguruj p³atnoœci
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faTruck} className="mega-item-icon" />
                        Dodaj dostawców
                    </li>
                    </ul>
                </Row>
            </Col>

            <Col lg={9} className="mega-col">
                <h6 className="mega-header">Konfiguracja</h6>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li>
                        <FontAwesomeIcon icon={faCertificate} className="mega-item-icon" />
                        Domeny i SSL
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faPuzzlePiece} className="mega-item-icon" />
                        Projekty graficzne
                    </li>
                </ul>
            </Col>

            
        </Row>
    );
};

export default CustomMegaContent;
