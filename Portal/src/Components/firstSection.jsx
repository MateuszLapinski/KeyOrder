import {
    Container,
    Row,
    Col,
    Button,
} from 'react-bootstrap';
import '../CSS/firstSection.css';

function FirstSection() {
    return (
        <Container className="py-5 firstSection">
            <Row className="align-items-center flex-column-reverse flex-lg-row">
                <Col lg={6} className="mt-4 mt-lg-0">
                    <h1 className="display-4">Your Ultimate B2B Solution</h1>
                    <p className="lead">
                        Streamline operations, enhance collaboration, and grow your business with our all-in-one platform.
                    </p>
                    <Button size="lg">Get Started</Button>
                </Col>
                <Col lg={6} className="text-center">
                
                </Col>
            </Row>
        </Container>
    );
} export default FirstSection;