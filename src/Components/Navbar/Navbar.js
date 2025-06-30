import React, { useState } from 'react';
import { Navbar, Nav, Container, Button, Dropdown } from 'react-bootstrap';
import { RiArrowDownSLine, RiUserLine, RiLogoutBoxLine } from '@remixicon/react';
import logoImage from '../Assets/CoFund logo2.png';
import profilImage from '../Assets/profil.png';

const CustomNavbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    console.log("User logged out");
    setShowDropdown(false);
  };

  return (
    <header className="bg-white shadow-sm mb-4">
      <Container>
        <Navbar expand="md">
          <img 
            className="img-fluid rounded mb-3" 
            loading="lazy" 
            src={logoImage}
            width="70" 
            height="80" 
            alt="Logo"
          />
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto ms-md-5">
              <Nav.Link href="#" className="text-dark">Home</Nav.Link>
              <Nav.Link href="/ListeCampaign" className="text-primary border-bottom border-primary border-2">Campaigns</Nav.Link>
              <Nav.Link href="#" className="text-dark">Communities</Nav.Link>
            </Nav>
            <div className="d-flex align-items-center">
              <Dropdown show={showDropdown} onToggle={(isOpen) => setShowDropdown(isOpen)}>
                <Dropdown.Toggle as={Button} variant="link" className="d-flex align-items-center p-0">
                  <img 
                    src={profilImage}
                    alt="Avatar" 
                    className="rounded-circle me-1" 
                    width="40" 
                    height="40"
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu align="end" className="mt-2">
                  <Dropdown.Item href="#" className="d-flex align-items-center">
                    <RiUserLine className="me-2" />
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item 
                    onClick={handleLogout}
                    className="d-flex align-items-center text-danger"
                  >
                    <RiLogoutBoxLine className="me-2" />
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </header>
  );
};

export default CustomNavbar;