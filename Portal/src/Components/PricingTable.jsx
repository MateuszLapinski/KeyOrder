import React from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { Check2 } from 'react-bootstrap-icons';

export default function FeatureComparisonTable() {
    const plans = ['Standard', 'Standard+', 'Premium'];

    const features = [
        {
            label: 'Responsive design for all devices (RWD)',
            description: 'Your store displays properly on computers, phones, and tablets.',
            availability: [true, true, true],
        },
        {
            label: 'Access to graphic template catalog',
            description: 'Choose a template tailored to your industry.',
            availability: [true, true, true],
        },
        {
            label: 'Basic template editor',
            description: 'Easily edit and customize the look of your store.',
            availability: [true, true, true],
        },
        {
            label: 'Shoper Visual Editor (Storefront)',
            isNew: true,
            description: 'A rebuilt editor with a modern interface and easier design.',
            availability: [true, true, true],
        },
        {
            label: 'Fully flexible layout management',
            description: 'Choose from over 90 modules and design your layout as needed.',
            availability: [true, true, true],
        },
        {
            label: 'Advanced module editing',
            isNew: true,
            description: 'Create your own modules or add JS code (Storefront only).',
            availability: [false, false, true],
        },
        {
            label: 'Advanced editing of cart & checkout pages',
            description: 'Modify cart layout, shipping & payment steps (Storefront only).',
            availability: [false, false, true],
        },
        {
            label: 'Multi-language versions',
            isNew: true,
            description: 'Create various language versions of your store.',
            availability: [true, true, true],
        },
    ];

    return (
        <Container className="py-5">
            <div className="text-center mb-4">
                <h2 className="fw-bold display-6">Appearance & Content</h2>
            </div>
            <Table bordered responsive className="text-center align-middle">
                <thead>
                    <tr>
                        <th className="text-start">Feature</th>
                        {plans.map((plan, idx) => (
                            <th key={idx}>
                                <div className="fw-semibold">{plan}</div>
                                <Button size="sm" variant="primary" className="mt-2">Try</Button>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {features.map((feature, idx) => (
                        <tr key={idx}>
                            <td className="text-start">
                                <div className="fw-semibold">
                                    {feature.label}
                                    {feature.isNew && (
                                        <span className="badge bg-primary text-white ms-2">New</span>
                                    )}
                                </div>
                                <div className="text-muted small">{feature.description}</div>
                            </td>
                            {feature.availability.map((isAvailable, colIdx) => (
                                <td key={colIdx}>
                                    {isAvailable
                                        ? <Check2 className="text-primary fs-4" />
                                        : <span className="text-muted fs-4">x</span>}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}
