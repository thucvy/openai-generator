import { Card, Button, Nav } from 'react-bootstrap'

import { LinkContainer } from 'react-router-bootstrap'

const Display = (props) => {
    const { header, title, text, link } = props
    return (
        <Card style={{textAlign:'center', margin: '20px'}}>
            <Card.Header>{header}</Card.Header>

            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    {text}
                </Card.Text>
                <LinkContainer to={link}>
                    <Nav.Link>
                        <Button variant="primary">Get Started</Button>
                    </Nav.Link>
                </LinkContainer>
            </Card.Body>
            
        </Card>
    )
}

export default Display