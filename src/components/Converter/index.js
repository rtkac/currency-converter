import React from 'react';
import Fade from 'react-reveal/Fade';

// custom components
import Layout from '../Layout';
import ConversionForm from './ConversionForm';
import ConversionList from './ConversionList';
import ConversionNotify from './ConversionNotify';

// react-bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

const Converter = () => {
  return (
    <Layout>
      <ConversionNotify />
      <Fade>
        <Row className="justify-content-center">
          <Col xs sm="8" md="6" lg="5" xl="4" className="mb-5">
            <Card>
              <Card.Header className="mb-4">
                <h3 className="mb-0 text-center">Currency Converter</h3>
              </Card.Header>
              <Card.Body className="position-relative text-center">
                <ConversionForm />
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="justify-content-center mb-4">
          <Col xs sm="8" md="6" lg="5" xl="4">
            <ConversionList />
          </Col>
        </Row>
      </Fade>
    </Layout>
  )
}

export default Converter;