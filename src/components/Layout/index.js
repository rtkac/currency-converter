
import React from 'react';
import './Layout.scss';
import Header from '../Header';
import Footer from '../Footer';
import Container from 'react-bootstrap/Container';

const Layout = (props) => {
  return (
    <React.Fragment>
      <Header />
      <main className="mt-5">
        <Container>
          {props.children}
        </Container>
      </main>
      <Footer />
    </React.Fragment>
  )
}

export default Layout;