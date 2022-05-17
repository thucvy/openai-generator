import { useEffect, useState } from "react";

import {
  Container,
  Form,
  Button,
  Alert,
  Card,
  Row,
  Col,
} from "react-bootstrap";

const ProductDesc = () => {
  const [productInput, setProductInput] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState();

  // function to get API from OpenAI
  const getAI = async () => {
    setError("");
    try {
      // Open AI
      const { Configuration, OpenAIApi } = require("openai");
      const configuration = new Configuration({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
      });
      delete configuration.baseOptions.headers["User-Agent"];
      const openai = new OpenAIApi(configuration);
      const response = await openai.createCompletion("text-curie-001", {
        prompt: `Write a detailed, smart, informative and professional product description for ${productInput}`,
        temperature: 0.6,
        max_tokens: 50,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      if (!response) {
        throw new Error("Sorry something went wrong. Please try again");
      }
      if (results) {
        setResults([
          {
            input: productInput,
            response: response.data.choices[0].text,
          },
          ...results,
        ]);
      } else {
        setResults([
          {
            input: productInput,
            response: response.data.choices[0].text,
          },
        ]);
      }
    } catch (error) {
      setError(error.message);
    }  
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    productInput && getAI(productInput);
    !productInput && setError("Please provide your input");
    console.log(results);
    localStorage.setItem(results, JSON.stringify(results))
    setProductInput("");
  };
  console.log('outside: ', results)


  //building results list
  const renderedProductList =
    results &&
    results.map((result, i) => {
      return (
        <Card key={i} bg="light" border="secondary" style={{ margin: "20px" }}>
          <Card.Header>
            <Row>
              <Col sm={3} style={{ fontWeight: "bold" }}>
                {" "}
                Input:
              </Col>
              <Col sm={9}>{result.input}</Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col sm={3} style={{ fontWeight: "bold" }}>
                {" "}
                AI Response:
              </Col>
              <Col sm={9}>{result.response}</Col>
            </Row>
          </Card.Body>
        </Card>
      );
    });

    
  useEffect(() => {
    console.log('try use effect')
    }, [])

  return (
    <Container>
      <Form onSubmit={onFormSubmit} style={{ marginBottom: "50px" }}>
        <Form.Group className="mb-3" controlId="formProduct">
          <Form.Label>
            What product would you like to get a description for?
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            name="productName"
            placeholder="Enter Product Name"
            value={productInput}
            onChange={(e) => setProductInput(e.target.value)}
          />
          <Form.Text className="text-muted">
            Enter as much information as possible for more accurate
            descriptions.
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
          Get AI Suggestions
        </Button>
      </Form>
      {error && (
        <Alert variant="danger" onClose={() => setError()} dismissible>
          {error}
        </Alert>
      )}
      {results && <h1>Response</h1>}
      {renderedProductList}
    </Container>
  );
};

export default ProductDesc;
