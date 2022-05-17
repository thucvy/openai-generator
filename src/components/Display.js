import { Card, Button, Nav } from "react-bootstrap";

import { LinkContainer } from "react-router-bootstrap";

const Display = (props) => {
  const { header, title, text, link, imgSrc, alt } = props;
  return (
    <Card
      style={{
        textAlign: "center",
        margin: "20px",
        width: "100%",
        maxWidth: "100%",
      }}
    >
      <Card.Header>{header}</Card.Header>

      <Card.Body>
        <Card.Img
          variant="top"
          src={imgSrc}
          alt={alt}
          style={{ width: "30%" }}
        />
        <Card.Title>{title}</Card.Title>
        <Card.Text>{text}</Card.Text>
        <LinkContainer to={link}>
          <Nav.Link>
            <Button variant="primary">Get Started</Button>
          </Nav.Link>
        </LinkContainer>
      </Card.Body>
    </Card>
  );
};

export default Display;
