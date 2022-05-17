import { Container, Nav, Navbar } from 'react-bootstrap'

import { LinkContainer } from 'react-router-bootstrap'

const Navigation = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top" style={{marginBottom:'50px'}}>
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>OpenAI Generator</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    <LinkContainer to="product-desc">
                        <Nav.Link>Product Description</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="cold-emails">
                        <Nav.Link>Cold Emails</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="tweets">
                        <Nav.Link>Tweets</Nav.Link>
                    </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation