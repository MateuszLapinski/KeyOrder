import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const tiers = [
    {
        name: 'Free',
        price: '$0',
        period: 'Month',
        button: { text: 'Get Started', variant: 'outline-primary' },
        features: [
            'Full Text log search',
            'Basic alarms',
            'Community support',
        ],
    },
    {
        name: 'Starter',
        price: '$48',
        period: 'Month',
        button: { text: 'Try Free for 14 days', variant: 'outline-primary' },
        features: [
            'Unlimited invocations',
            'Advanced Alarms',
            'Email support',
        ],
    },
    {
        name: 'Pro',
        price: '$250',
        period: 'Month',
        highlighted: true,
        button: { text: 'Try Free for 14 days', variant: 'primary' },
        features: [
            'Smart Insights',
            'Premium notification',
            'Email & Chat support',
        ],
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        period: '',
        button: { text: 'Contact Sales', variant: 'outline-primary' },
        features: [
            'Dedicated account manager',
            'Integration support',
            'Email & Chat support',
        ],
    },
];

export default function PricingSection() {
    return (
        <Container className="py-5">
            <Row className="g-4 justify-content-center">
                {tiers.map((tier) => (
                    <Col key={tier.name} xs={12} md={6} lg={3}>
                        <Card
                            className={`h-100 text-center ${tier.highlighted ? 'border-0 shadow-lg' : 'shadow-sm'
                                }`}
                        >
                            <Card.Body className="d-flex flex-column">
                                <Card.Title className="mb-2">{tier.name}</Card.Title>
                                <h2 className="fw-bold">
                                    {tier.price}
                                    {tier.period && <small className="text-muted"> / {tier.period}</small>}
                                </h2>
                                <Button
                                    variant={tier.button.variant}
                                    className={`my-3 mt-auto ${tier.highlighted ? 'text-white' : ''
                                        }`}
                                >
                                    {tier.button.text}
                                </Button>
                                <ul className="list-unstyled text-start mt-3 mb-0">
                                    {tier.features.map((f) => (
                                        <li key={f} className="mb-2">
                                            • {f}
                                        </li>
                                    ))}
                                </ul>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
