import '../CSS/topmenu.css';
import { Navbar, Nav, NavDropdown, Container, Button, Image } from 'react-bootstrap';
import KeyOrderDark from '../assets/KeyOrder_dark.png';
import MegaDropdown from './MegaDropDown';
import FirstMegaContent from './FirstMegaContent';
function TopMenu() {
    return (
      
        <Navbar fixed="top" expand="lg" className="topmenu">
            <Container className="topmenuContainer">
              
                <Navbar.Brand href="#">
                    <Image className="logoImage" src={KeyOrderDark} alt="KeyOrderDark" />
                </Navbar.Brand>

     
                <Nav className="me-auto align-items-center">
                    <MegaDropdown title="Set up a shop">
                        <FirstMegaContent />
                    </MegaDropdown>

                    <NavDropdown title="Increase your sale" className="menuDropDown" id="dropdown-zwiekszaj-sprzedaz">
                       
                    </NavDropdown>

                    {/* Trzeci NavDropdown – „Przenieœ sklep” */}
                    <NavDropdown title="Migrate a shop" className="menuDropDown"  id="dropdown-przenies-sklep">
                        
                    </NavDropdown>
                </Nav>

                {/* Toggler (zwraca siê w widoku mobilnym) */}
                <Navbar.Toggle aria-controls="navbar-nav" />

                {/* NAV po prawej stronie */}
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="ms-auto align-items-center">
                        <Nav.Link href="#features" className="menuLinks">Features</Nav.Link>
                        <Nav.Link href="#testimonials" className="menuLinks">Testimonials</Nav.Link>
                        <Nav.Link href="#pricing" className="menuLinks">Pricing</Nav.Link>
                        <Button variant="primary" className="ms-3">Login</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default TopMenu;
