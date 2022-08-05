import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom'

export const Header: React.FC = () => {
  return (
  <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Tasks MySql</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Item as={Link} to="/" className="nav-link">Inicio</Nav.Item>
            <Nav.Item as={Link} to="/tarefas" className="nav-link">Tarefas</Nav.Item>
           </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

