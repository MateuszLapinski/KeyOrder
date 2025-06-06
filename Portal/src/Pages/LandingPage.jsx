import React from 'react';
import {
    Navbar,
    Nav,
    Container,
    Row,
    Col,
    Card,
    Button,
} from 'react-bootstrap';
import { Users, Globe, Shield } from 'lucide-react';
import TopMenu from '../Components/topmenu';
import FirstSection from '../Components/firstSection';
import Pricing from '../Components/Pricing';

export default function LandingPage() {
    return (
        <>
            {/* Navbar */}
            <TopMenu/>
            <Container className="mainContent">
            {/* Hero Section */}
            <FirstSection/>

            {/* Features Section */}
            <Container id="features" className="py-5">
                <h2 className="text-center mb-4">Key Features</h2>
                <Row className="g-4">
                    {[
                        { icon: Users, title: 'Collaboration', desc: 'Connect your teams seamlessly across departments.' },
                        { icon: Globe, title: 'Global Reach', desc: 'Manage international partnerships with ease.' },
                        { icon: Shield, title: 'Security', desc: 'Enterprise-grade security to protect your data.' },
                    ].map((feature, idx) => (
                        <Col md={4} key={idx}>
                            <Card className="h-100 text-center border-0 shadow-sm">
                                <Card.Body className="p-4">
                                    <feature.icon size={48} className="mb-3 text-primary" />
                                    <Card.Title>{feature.title}</Card.Title>
                                    <Card.Text>{feature.desc}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            {/* Testimonials Section */}
            <Container id="testimonials" className="py-5 bg-white rounded shadow-sm">
                <h2 className="text-center mb-4">What Our Clients Say</h2>
                <Row className="g-4">
                    {[
                        { name: 'Anna Kowalska', role: 'CEO, Acme Corp', text: 'Transformacyjne narzêdzie, które zmieni³o nasz¹ pracê.' },
                        { name: 'John Smith', role: 'CTO, TechSolutions', text: 'Niezawodna i intuicyjna platforma B2B.' },
                        { name: 'Maria Garcia', role: 'COO, GlobalTrade', text: 'Doskona³e wsparcie i bezpieczne œrodowisko.' },
                    ].map((t, idx) => (
                        <Col md={4} key={idx}>
                            <Card className="h-100 border-0">
                                <Card.Body className="p-4">
                                    <Card.Text className="fst-italic">“{t.text}”</Card.Text>
                                    <Card.Subtitle className="mt-3 fw-semibold">{t.name}</Card.Subtitle>
                                    <Card.Text className="text-muted small">{t.role}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            {/* CTA Section */}

            <Pricing id="pricing" className="py-5 text-center" />

            </Container>
           

            {/* Footer */}
            <footer className="bg-light text-muted py-4">
                <Container>
                    <Row>
                        <Col md={4} className="mb-3">
                            <h5>KeyOrder</h5>
                            <p>© {new Date().getFullYear()} KeyOrder. All rights reserved.</p>
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
        </>
    );
}
