import React from 'react';
import {
    Container,
    Card,
    Carousel,
} from 'react-bootstrap';


export default function TestimonialComponent() {

    const testimonials = [
        { name: 'Anna Kowalska', role: 'CEO, Acme Corp', text: 'A transformative tool that changed the way we work.' },
        { name: 'John Smith', role: 'CTO, TechSolutions', text: 'Reliable and intuitive B2B platform.' },
        { name: 'Maria Garcia', role: 'COO, GlobalTrade', text: 'Excellent support and a safe environment.' },
        { name: 'Liam Chen', role: 'Head of Procurement, MedSupply', text: 'Saved us hours each week.' },
        { name: 'Sophie Dubois', role: 'eCommerce Manager, BoutiQ', text: 'Simple and elegant interface.' },
        { name: 'Carlos Mendes', role: 'Logistics Lead, FastShip', text: 'Integrated perfectly with our workflow.' },
        { name: 'Julia Nowak', role: 'IT Director, NetZone', text: 'Secure and dependable at scale.' },
        { name: 'David Lee', role: 'Founder, NextPhase', text: 'The best investment we made this year.' },
    ]


    return (
          <Container id="testimonials" className="py-5 testimonials rounded shadow-sm">
                    <h2 className="text-center mb-4">What Our Clients Say</h2>
                    <Carousel indicators={false} controls={true} interval={2000} fade={false}>
                        {testimonials.map((t, idx) => (
                            <Carousel.Item key={idx}>
                                <div className="d-flex justify-content-center">
                                    <Card className="w-75 border-0">
                                        <Card.Body className="p-4 text-center">
                                            <Card.Text className="fst-italic fs-5"> &ldquo;{t.text}&rdquo;</Card.Text>
                                            <Card.Subtitle className="mt-3 fw-semibold">{t.name}</Card.Subtitle>
                                            <Card.Text className="text-muted small">{t.role}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Container>
    );
}
