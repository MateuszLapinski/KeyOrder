import '../CSS/topmenu.css';
import { Navbar, Nav, NavDropdown, Container, Button, Image } from 'react-bootstrap';
import KeyOrderDark from '../assets/KeyOrder_dark.png';
import MegaDropdown from './MegaDropDown';
import FirstMegaContent from './FirstMegaContent';
import MenuTabsComponent from './MenuTabsComponent';
function TopMenu() {
    return (
      
        <Navbar fixed="top" expand="lg" className="topmenu">
            <Container className="topmenuContainer">
              
                <Navbar.Brand href="#">
                    <Image className="logoImage " src={KeyOrderDark} alt="KeyOrderDark" />
                </Navbar.Brand>

     
                <Nav className="me-auto align-items-center">
                    <MegaDropdown title="Set up a shop" >
                        <FirstMegaContent />
                    </MegaDropdown>
                     
                    <MegaDropdown title="Get to know our store" >
                        <MenuTabsComponent />
                    </MegaDropdown>

                    <Nav.Link href="/migrate" className="menuDropDown">
                        Migrate a shop
                    </Nav.Link>
                </Nav>

                <Navbar.Toggle aria-controls="navbar-nav" />

                <Navbar.Collapse id="navbar-nav">
                    <Nav className="ms-auto align-items-center">
                        <Nav.Link href="#features" className="menuLinks">Features</Nav.Link>
                        <Nav.Link href="#testimonials" className="menuLinks">Testimonials</Nav.Link>
                        <Nav.Link href="/pricingpage" className="menuLinks">Pricing</Nav.Link>
                        <Button href="/login" variant="primary" className="ms-3">Login</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default TopMenu;
