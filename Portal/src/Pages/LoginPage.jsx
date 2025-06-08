import React, { useState } from 'react'
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Card,
    Image,
} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import '../CSS/LoginPage.css'
import FooterComponent from '../Components/Footer'
import KeyOrderLight from '../assets/KeyOrder_light.png';

export default function LoginPage() {
    const [shopUrl, setShopUrl] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        alert(`Próbujemy zalogowaæ sklep: ${shopUrl}`)
    }

    return (
        <div className="login-page-wrapper">
            <Container fluid className="login-container">
               
                <Row className="h-100 gx-0">
  
                    <Col
                        xs={12}
                        lg={7}
                        className="d-flex flex-column justify-content-center align-items-center left-column h-100 px-5 text-center"
                    >
                        <Button
                            variant="secondary"
                            onClick={() => navigate(-1)}
                            className="mb-4 align-self-start"
                        >
                            Back
                        </Button>

                        <Image className="logoImageSign mb-3" src={KeyOrderLight} alt="KeyOrderLight" />

                        <h1 className="login-title">Sign in</h1>
                        <p className="login-subtitle">
                            Just entry your shop&#39;s address
                        </p>


                        <Form
                            className="login-form"
                            onSubmit={handleSubmit}
                            style={{ maxWidth: '600px', width: '100%' }}
                        >
                            <Form.Group controlId="formShopUrl" className="mb-3">
                                <Form.Label className="form-label">* Shop address:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="www.twojsklep.pl"
                                    value={shopUrl}
                                    onChange={(e) => setShopUrl(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formUser" className="mb-3">
                                <Form.Label className="form-label">* Username:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="example@your_domain.com"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formPass" className="mb-4">
                                <Form.Label className="form-label">* Password:</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit" className="w-100 login-button">
                                Sign in
                            </Button>
                        </Form>

                        <div className="mt-3 signup-link-wrapper">
                            <span>Dont have account yet?&nbsp;</span>
                            <a href="/rejestracja" className="signup-link">
                                Try for free
                            </a>
                        </div>
                    </Col>

         
                    <Col
                        xs={12}
                        lg={5}
                        className="d-flex justify-content-center align-items-center right-column h-100 px-5"
                    >
                        <Card className="promo-card">
                            <Card.Body>
                                <div className="promo-badge mb-3">
                                    <small className="badge-webinar">
                                        <i className="bi bi-camera-video-fill"></i> Webinar
                                    </small>
                                </div>
                                <Card.Title className="promo-title">
                                    Free webinar: EAA in practice for e-shops what awaits you?
                                </Card.Title>
                                <Card.Text className="promo-text mb-4">
                                    Who does the EAA apply to, how much time to change for the online
                                    store and what hides the abbreviation WCAG. Sign up and find out the
                                    key dates and requirements!
                                </Card.Text>
                                <a href="/webinar" className="promo-link mb-4 d-block">
                                    Learn more &rarr;
                                </a>
                                <hr />
                                <div className="promo-footer mt-3">
                                    <i className="bi bi-camera-video"></i>&nbsp; Check Upcoming Online
                                    Workshops
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <FooterComponent />
        </div>
    )
}