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

const storageKey = "productDescResults";
const toHour = ms => Number((ms / (1000 * 60 * 60)).toFixed(2));

const storeDataLocally = data => {
  const dataObj = {
    date: Date.now(),
    data
  };
  localStorage.setItem(storageKey, JSON.stringify(dataObj));
};

const getDataLocally = () => {
  const dataObj = localStorage.getItem(storageKey);
  return JSON.parse(dataObj);
};

const ProductDesc = () => {
  const [productInput, setProductInput] = useState("");
  const [results, setResults] = useState();
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
      let resultsArray = []
      let res = response.data.choices[0].text
      if (!res.endsWith('.')) res += '...'
      if (results) {
        resultsArray = [
          {
            input: productInput,
            response: res,
          },
          ...results,
        ];
      } else {
        resultsArray = [
          {
            input: productInput,
            response: res,
          },
        ];
      }
      setResults(resultsArray)
      storeDataLocally(resultsArray)
    } catch (error) {
      setError(error.message);
    }  
  };

  useEffect(() => {
    const localObj = getDataLocally();
    let shouldGetDataFromserver = false;
    if (localObj) {
      const isOneHourAgo =
        toHour(new Date()) - toHour(Number(localObj.date)) > 1;
      if (isOneHourAgo) {
        shouldGetDataFromserver = true;
      }
    } else {
      shouldGetDataFromserver = true;
    }

    !shouldGetDataFromserver && setResults(localObj.data);
  }, [])

  const onFormSubmit = (e) => {
    e.preventDefault();
    productInput && getAI(productInput);
    !productInput && setError("Please provide your input");
    setProductInput("");
  };


  //building results list
  const renderedProductList =
    results &&
    results.map((result, i) => {
      return (
        <Card key={i} bg="light" border="secondary" style={{ margin: "20px" }}>
          <Card.Header>
            <Row>
              <Col sm={3} style={{ fontWeight: "bold" }}>
                Input:
              </Col>
              <Col sm={9}>{result.input}</Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col sm={3} style={{ fontWeight: "bold" }}>
                AI Response:
              </Col>
              <Col sm={9}>{result.response}</Col>
            </Row>
          </Card.Body>
        </Card>
      );
    });


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
