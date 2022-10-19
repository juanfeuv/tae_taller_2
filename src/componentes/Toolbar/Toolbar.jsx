import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';

const Toolbar = () => {

  return (
    <Navbar bg="success" variant="dark" style={{ position: 'fixed', width: '100%', zIndex: '1000' }}>
      <Navbar.Brand href="/">Calculador puntaje crediticio</Navbar.Brand>
      <Nav className="mr-auto">
        {/* <Nav.Link href="/">Home</Nav.Link> */}
      </Nav>
      {/* <Form inline>
        <Button variant="outline-light">Logout</Button>
      </Form> */}
    </Navbar>
  );
}

export default Toolbar;