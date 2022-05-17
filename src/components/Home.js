import Display from "./Display";

import { Container, Row, Col } from "react-bootstrap";

import letterImg from "../lettertemplate.png";
import essayImg from "../essayoutline.png";
import grammarImg from "../grammarcheck.png";

const Home = () => {
  return (
    <Container>
      <Row>
        <Col md>
          <Display
            header="Formal Letter"
            imgSrc={letterImg}
            alt="Letter Template"
            title="Formal Letter Template"
            text="Are you having difficulties writing a formal and professional letter to your school, employer, or just someone you admire? Let us provide some tips about what you should include in a letter about any specific topics at your discretion."
            link="letter-template"
          />
        </Col>

        <Col md>
          <Display
            header="Essay Brainstorming"
            imgSrc={essayImg}
            alt="Essay Outline"
            title="Essay Outline Template"
            text="If you are feeling lost and confused about what to write or should be included in your essay, this tool will help you generate an outline for your essay. This outline can include topics such as your personal statement, research paper, storytelling, etc."
            link="essay-outline"
          />
        </Col>

        <Col md>
          <Display
            header="Better English"
            imgSrc={grammarImg}
            alt="Grammar Corrector"
            title="Grammar Corrector"
            text="This is perfect for students, writers, or any individuals who wish to improve their communication and writing skills. This tool will help check your English sentences for grammar, spelling, and punctuation errors to correct them into standard English."
            link="grammar-corrector"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
