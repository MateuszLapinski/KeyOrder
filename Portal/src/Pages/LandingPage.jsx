import React from 'react';
import {
    Navbar,
    Nav,
    Container,
    Row,
    Col,
    Card,
   
} from 'react-bootstrap';
import { Users, Globe, Shield } from 'lucide-react';
import TopMenu from '../Components/topmenu';
import FirstSection from '../Components/firstSection';
import Pricing from '../Components/Pricing';
import FooterComponent from '../Components/Footer';
import TestimonialComponent from '../Components/TestimonialComponent';
import '../CSS/LandingPage.css';

export default function LandingPage() {

    


    return (
        <>
            <TopMenu/>
            <Container className="mainContent">
            <FirstSection/>

                <Container id="features" className="py-5 mg-200">
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
            <TestimonialComponent/>
                <Pricing id="pricing" className="py-5 mg-200" />

            </Container>
            <FooterComponent/>

           
          
        </>
    );
}
