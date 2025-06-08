import React from 'react';
import {
    
    Nav,
    Container,
    Row,
    Col,
  
} from 'react-bootstrap';
export default function FooterComponent() {
    return (
        <footer className="bg-light text-muted py-4">
            <Container>
                <Row>
                    <Col md={4} className="mb-3">
                        <h5>KeyOrder</h5>
                        <p>{new Date().getFullYear()} KeyOrder. All rights reserved.</p>
                    </Col>
                    <Col md={4} className="mb-3">
                        <h6>Resources</h6>
                        <Nav className="flex-column">
                            <Nav.Link href="#" className="ps-0">Blog</Nav.Link>
                            <Nav.Link href="#" className="ps-0">Documentation</Nav.Link>
                            <Nav.Link href="#" className="ps-0">Support</Nav.Link>
                        </Nav>
                    </Col>
                    <Col md={4} className="mb-3">
                        <h6>Company</h6>
                        <Nav className="flex-column">
                            <Nav.Link href="#" className="ps-0">About Us</Nav.Link>
                            <Nav.Link href="#" className="ps-0">Careers</Nav.Link>
                            <Nav.Link href="#" className="ps-0">Contact</Nav.Link>
                        </Nav>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}