import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import {
  Container,
  Form,
  Button,
  Alert,
  Card,
  Row,
  Col,
} from "react-bootstrap";

import goBackImgSrc from "../goback.png";

const toHour = (ms) => Number((ms / (1000 * 60 * 60)).toFixed(2));

const BaseForm = (props) => {
  const {
    imgSrc,
    alt,
    header,
    storageKey,
    prompt,
    formLabel,
    placeHolder,
    notice,
  } = props;

  const [promptInput, setPromptInput] = useState("");
  const [results, setResults] = useState();
  const [error, setError] = useState();

  const storeDataLocally = (data) => {
    const dataObj = {
      date: Date.now(),
      data,
    };
    localStorage.setItem(storageKey, JSON.stringify(dataObj));
  };

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
        prompt: `${prompt} ${promptInput}`,
        temperature: 0.8,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0,
      });
      if (!response) {
        throw new Error("Sorry something went wrong. Please try again");
      }
      let resultsArray = [];
      let res = response.data.choices[0].text;
      if (!res.endsWith(".")) res += "...";
      if (results) {
        resultsArray = [
          {
            input: promptInput,
            response: res,
          },
          ...results,
        ];
      } else {
        resultsArray = [
          {
            input: promptInput,
            response: res,
          },
        ];
      }
      setResults(resultsArray);
      storeDataLocally(resultsArray);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const getDataLocally = () => {
      const dataObj = localStorage.getItem(storageKey);
      return JSON.parse(dataObj);
    };

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
  }, [storageKey]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    promptInput && getAI(promptInput);
    !promptInput && setError("Please provide your input");
    setPromptInput("");
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
                <p
                  className="text-muted"
                  style={{ fontWeight: "lighter", fontSize: "0.9em" }}
                >
                  (Max. 100 words)
                </p>
              </Col>
              <Col sm={9}>{result.response}</Col>
            </Row>
          </Card.Body>
        </Card>
      );
    });

  return (
    <Container>
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: "black",
          display: "flex",
          fontStyle: "italic"
        }}
      >
        <img
          src={goBackImgSrc}
          alt="Go Back"
          style={{ width: "30px", marginBottom: "20px", marginRight: "10px" }}
        />{" "}
        Back to Home
      </Link>

      <h1>
        <img
          src={imgSrc}
          alt={alt}
          style={{ width: "50px", marginRight: "20px" }}
        />
        {header}
      </h1>
      <Form onSubmit={onFormSubmit} style={{ marginBottom: "50px" }}>
        <Form.Group className="mb-3" controlId="formProduct">
          <Form.Label>{formLabel}</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder={placeHolder}
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
          />
          <Form.Text className="text-muted">{notice}</Form.Text>
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
      {results && <h1>Responses</h1>}
      {renderedProductList}
    </Container>
  );
};

export default BaseForm;
