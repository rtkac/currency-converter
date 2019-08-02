import React from 'react';
import './CustomAlert.scss';
import Alert from 'react-bootstrap/Alert';

const CustomAlert = (props) => {
  return (
    <Alert
      variant={props.variant}
      className={props.class}
      style={props.style}
    >
      {props.title}
    </Alert>
  )
}

export default CustomAlert;