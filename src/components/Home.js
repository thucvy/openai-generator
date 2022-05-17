import Display from './Display'

import {Container, Row, Col} from 'react-bootstrap'

const Home = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <Display 
                        header="Product Descriptions"
                        title="Generate Product Descriptions"
                        text="Generate product descriptions for any types of products, simply enter the name and product description to get started"
                        link="product-desc"
                    />
                </Col>

                <Col>
                    <Display 
                        header="Marketing Emails"
                        title="Cold Email Template"
                        text="This is perfect for marketing agents or companies who need fresh ideas daily on cold email content that is created by AI technology."
                        link="cold-emails"
                    />
                </Col>

                <Col>
                    <Display 
                        header="Creating Tweets"
                        title="Generate Tweets"
                        text="Start generating tweet ideas with hashtags for your online social media campaigns on twitter. Create endless unique tweet ideas, no more writers block."
                        link="tweets"
                    />
                </Col>
            </Row>
        </Container>
    )
}

export default Home