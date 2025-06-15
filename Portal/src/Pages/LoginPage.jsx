import React, { useState, useContext } from 'react'
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
import KeyOrderLight from '../assets/KeyOrder_light.png'
import { AuthContext } from '../App' // zak³adamy, ¿e kontekst Auth jest zdefiniowany w App.js

export default function LoginPage() {
    const { setAuth } = useContext(AuthContext)

   
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const [userNameError, setUserNameError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const navigate = useNavigate()

    const validate = () => {
        let isValid = true

       

        if (!userName.trim()) {
            setUserNameError('E-mail jest wymagany.')
            isValid = false
        } else if (!/^\S+@\S+\.\S+$/.test(userName)) {
            setUserNameError('Nieprawid³owy format e-mail.')
            isValid = false
        } else {
            setUserNameError('')
        }

        if (!password) {
            setPasswordError('Has³o jest wymagane.')
            isValid = false
        } else if (password.length < 6) {
            setPasswordError('Has³o musi mieæ co najmniej 6 znaków.')
            isValid = false
        } else {
            setPasswordError('')
        }

        return isValid
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validate()) return

        setLoading(true)

        try {
            const response = await fetch('http://localhost:5029/api/Auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    login: userName,
                    password: password
                })
            })

            const data = await response.json()

            if (response.ok) {
                localStorage.setItem('authToken', data.token)

                const profileResp = await fetch('http://localhost:5029/api/Auth/me', {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                })

                if (!profileResp.ok) {
                    throw new Error('Nie uda³o siê pobraæ profilu u¿ytkownika')
                }

                const user = await profileResp.json()

                setAuth({ user, token: data.token })

                window.location.href = 'http://localhost:3002/dashboard';
          
            } else if (response.status === 401) {
                alert(data.message || 'Nieprawid³owy login lub has³o.')
            } else {
                alert(`B³¹d serwera: ${response.status}`)
            }
        } catch (err) {
            alert('B³¹d sieci: ' + err.message)
        } finally {
            setLoading(false)
        }
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
                        <p className="login-subtitle">Just enter your shop&#39;s address</p>

                        <Form
                            className="login-form"
                            onSubmit={handleSubmit}
                            style={{ maxWidth: '600px', width: '100%' }}
                        >
                            

                            <Form.Group controlId="formUser" className="mb-3 text-start">
                                <Form.Label className="form-label">* Username (e-mail):</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="example@your_domain.com"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    isInvalid={!!userNameError}
                                />
                                <Form.Control.Feedback type="invalid">{userNameError}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formPass" className="mb-4 text-start">
                                <Form.Label className="form-label">* Password:</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    isInvalid={!!passwordError}
                                />
                                <Form.Control.Feedback type="invalid">{passwordError}</Form.Control.Feedback>
                            </Form.Group>

                            <Button variant="primary" type="submit" className="w-100 login-button" disabled={loading}>
                                {loading ? 'Signing in...' : 'Sign in'}
                            </Button>
                        </Form>

                        <div className="mt-3 signup-link-wrapper">
                            <span>Don't have an account yet?&nbsp;</span>
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
                                    Free webinar: EAA in practice for e-shops – what awaits you?
                                </Card.Title>
                                <Card.Text className="promo-text mb-4">
                                    Who does the EAA apply to, how much time to change for the online store and what hides the abbreviation WCAG. Sign up and find out the key dates and requirements!
                                </Card.Text>
                                <a href="/webinar" className="promo-link mb-4 d-block">
                                    Learn more &rarr;
                                </a>
                                <hr />
                                <div className="promo-footer mt-3">
                                    <i className="bi bi-camera-video"></i>&nbsp; Check Upcoming Online Workshops
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
