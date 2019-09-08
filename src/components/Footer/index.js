import React from 'react';
import './Footer.scss';

const Footer = () => {

  const dateYear = () => {
    let date = new Date();
    return date.getFullYear();
  }

  return (
    <footer className="text-center">
      &copy; copyright {dateYear()}
    </footer>
  )
}

export default Footer;