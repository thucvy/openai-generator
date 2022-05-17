import { Container, Nav, Navbar } from "react-bootstrap";

import { LinkContainer } from "react-router-bootstrap";

import logo from "../logo.png"

const Navigation = () => {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      sticky="top"
      style={{ marginBottom: "50px" }}
    >
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img 
              src={logo}
              width="35"
              height="35"
              className="d-inline-block align-top"
              alt="Smart Writing logo"
            />
            Write Better with OpenAI!
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="letter-template">
              <Nav.Link>Letter Template</Nav.Link>
            </LinkContainer>
            <LinkContainer to="essay-outline">
              <Nav.Link>Essay Outline</Nav.Link>
            </LinkContainer>
            <LinkContainer to="grammar-corrector">
              <Nav.Link>Grammar Corrector</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
