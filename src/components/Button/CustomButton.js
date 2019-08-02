import React from 'react';
import './CustomButton.scss';
import Button from 'react-bootstrap/Button';

const CustomButton = (props) => {
  return (
    <Button
      type={props.type}
      variant={props.variant}
      onSubmit={props.onSubmit}
      className={props.class}
      disabled={props.disabled}
    >
      {props.value}
    </Button>
  )
}

export default CustomButton;