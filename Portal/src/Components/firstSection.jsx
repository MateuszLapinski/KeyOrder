import {
    Container,
    Row,
    Col,
    Button,
    Form,
    Image
} from 'react-bootstrap';
import { CheckCircleFill } from 'react-bootstrap-icons';
import '../CSS/firstSection.css';
import Meetings from '../assets/meetings.jpg';

function FirstSection() {
    return (
        <Container fluid className="py-5 bg-white">
            <Row className="align-items-center justify-content-left">
                <Col lg={6} className="px-5 text-start">
                    <p className="text-uppercase  fw-bold text-dark mb-2">
                        <span role="img" aria-label="Trophy">🏆</span> The most popular platform in Europe
                    </p>
                    <h1 className="display-5 fw-bold mb-4">
                        Open your order platform
                    </h1>
                    <ul className="list-unstyled mb-4">
                        <li className="mb-2">
                            <CheckCircleFill className="text-primary me-2" />
                            Pre-built templates and intuitive store editor
                        </li>
                        <li className="mb-2">
                            <CheckCircleFill className="text-primary me-2" />
                            Built-in ERP integrations
                        </li>
                        <li className="mb-3">
                            <CheckCircleFill className="text-primary me-2" />
                            24/7 support and a subscription with no hidden costs
                        </li>
                    </ul>
                    <Form className="d-flex shadow rounded-pill overflow-hidden" style={{ maxWidth: 500 }}>
                        <Form.Control
                            type="email"
                            placeholder="Wpisz adres e-mail"
                            className="border-0 rounded-0 ps-4 py-3"
                        />
                        <Button variant="primary" className="rounded-0 px-4">
                            Try for Free
                        </Button>
                    </Form>
                </Col>

                <Col lg={6} className="text-center mt-5 mt-lg-0">
                    <Image className="meetingImage rounded-4" src={Meetings} alt="Meetings" />
                </Col>
            </Row>
        </Container>
    );
} export default FirstSection;