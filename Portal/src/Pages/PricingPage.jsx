import React from 'react';
import {
    Container,
    Card,
    Carousel,
} from 'react-bootstrap';
import Pricing from '../Components/Pricing';
import TopMenu from '../Components/topmenu';
import FeatureComparisonTable from '../Components/PricingTable';

export default function PricingPage() {



    return (
        <>
        <TopMenu/>
        <Container fluid>
        
          <Container id="PricingPage" className="py-5 testimonials rounded shadow-sm mg-200">
            <Container className="text-center py-5">
                <h1 className="fw-bold display-5 mb-3">
                        Online Store Pricing
                </h1>
                <p className="fw-semibold fs-5 mb-1">
                        Open your own online store up to 90% cheaper.
                </p>
                <p className="text-muted fs-6">
                        Try it free for 14 days. No credit card required.
                </p>
            </Container>
            <Pricing className="py-5 mg-200" />
            </Container>

            <FeatureComparisonTable />
        </Container>
        </>
    );
}
