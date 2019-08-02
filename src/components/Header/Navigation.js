import React from 'react';
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const Navigation = () => {
  return (
    <Navbar bg="dark">
      <Container>
        <Navbar.Brand>
          <NavLink exact={true} to="/" activeClassName="active" className="nav-link">Dashboard</NavLink>
        </Navbar.Brand>
      </Container>
    </Navbar>
  )
}

export default Navigation;