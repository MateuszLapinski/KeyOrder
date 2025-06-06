import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import './ButtonPanel.css' 
import { AiOutlineDashboard, AiOutlineSolution, AiOutlineEuroCircle, AiOutlinePieChart, AiOutlineTeam, AiOutlineCalendar, AiOutlineSetting } from "react-icons/ai";
function ButtonPanel() {

    return (
        <Col className='menu-content'>
            <Nav defaultActiveKey="/dashboard" className="flex-column px-2">
                <Nav.Link href="/dashboard" className="sideMenuButton text-white mb-2">
                <Row>
                        <Col className="sideButtonIcon" sm={2}><AiOutlineDashboard /> </Col>
                        <Col sm={8}> Dashboard</Col>
                </Row>
                </Nav.Link>
                <Nav.Link href="/orders" className="sideMenuButton text-white mb-2">
                    <Row>
                        <Col className="sideButtonIcon" sm={2}><AiOutlineSolution/></Col>
                        <Col sm={8}>Orders</Col>
                    </Row>
                </Nav.Link>
                <Nav.Link href="/reports" className="sideMenuButton text-white mb-2">
                    <Row>
                        <Col className="sideButtonIcon" sm={2}><AiOutlinePieChart /></Col>
                        <Col sm={8}>Reports</Col>
                    </Row>
                </Nav.Link>
                <Nav.Link href="/clients" className="sideMenuButton text-white mb-2">
                    <Row>
                        <Col className="sideButtonIcon" sm={2}><AiOutlineEuroCircle/></Col>
                        <Col sm={8}>Clients</Col>
                    </Row>
                </Nav.Link>
          
                <Nav.Link href="/invoices" className="sideMenuButton text-white mb-2">
                <Row>
                    <Col className="sideButtonIcon" sm={2}><AiOutlineEuroCircle /></Col>
                    <Col sm={8}>Invoices</Col>
                </Row>
                </Nav.Link>
                <Nav.Link href="/products" className="sideMenuButton text-white mb-2">
                    <Row>
                        <Col className="sideButtonIcon" sm={2}><AiOutlineEuroCircle /></Col>
                        <Col sm={8}>Products</Col>
                    </Row>
                </Nav.Link>
                <Nav.Link href="/users" className="sideMenuButton text-white mb-2">
                    <Row>
                        <Col className="sideButtonIcon" sm={2}><AiOutlineTeam /></Col>
                        <Col sm={8}>User</Col>
                    </Row>
                </Nav.Link>
                <Nav.Link href="/calendar" className="sideMenuButton text-white mb-2">
                    <Row>
                        <Col className="sideButtonIcon" sm={2}><AiOutlineCalendar /></Col>
                        <Col sm={8}>Calendar</Col>
                    </Row>
                </Nav.Link>
                <Nav.Link href="/settings" className="sideMenuButton text-white mb-2">
                    <Row>
                        <Col className="sideButtonIcon" sm={2}><AiOutlineSetting /></Col>
                        <Col sm={8}>Settings</Col>
                    </Row>
                </Nav.Link>
            </Nav>
        </Col>
    );
}

export default ButtonPanel
