import React from 'react';
import Layout from '../Layout';
import Card from 'react-bootstrap/Card';
import Fade from 'react-reveal/Fade';

const NotFound = () => {
  return (
    <Layout>
      <Fade>
        <Card className="notfound">
          <Card.Body className="text-center">
            <Card.Title className="mb-4">
              <h1>404</h1>
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              <h4>Page Not Found</h4>
            </Card.Subtitle>
          </Card.Body>
        </Card>
      </Fade>
    </Layout>
  )
}

export default NotFound;