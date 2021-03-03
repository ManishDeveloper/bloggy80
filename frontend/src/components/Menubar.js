import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {connect} from 'react-redux';


const Menubar = ({isAuthenticated}) => {

    const authLinks = (
      <Nav className="ml-auto">
      <LinkContainer to="/">
      <Nav.Link>Home</Nav.Link>
      </LinkContainer>

      <LinkContainer to="/post">
      <Nav.Link>Dashboard</Nav.Link>
      </LinkContainer>

      <LinkContainer to="/logout">
      <Nav.Link>Logout</Nav.Link>
      </LinkContainer>
    </Nav>
    )

    const guestLinks = (
      <Nav className="ml-auto">
        
      <LinkContainer to="/">
      <Nav.Link>Home</Nav.Link>
      </LinkContainer>

      <LinkContainer to="/login">
      <Nav.Link>Login</Nav.Link>
      </LinkContainer>

      <LinkContainer to="/register">
      <Nav.Link>Register</Nav.Link>
      </LinkContainer>
    </Nav>
    )
    return (
        <>
  <Navbar bg="dark" variant="dark">
  <LinkContainer to="/">
    <Navbar.Brand>Bloggy</Navbar.Brand>
  </LinkContainer>
    {isAuthenticated ? authLinks : guestLinks}
    
  </Navbar>
  
</>
    )
}

const mapStateToProps = state => (
  {isAuthenticated: state.auth.isAuthenticated}
)

export default connect(mapStateToProps)(Menubar);
