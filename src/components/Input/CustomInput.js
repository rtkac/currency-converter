import React from 'react';
import Form from 'react-bootstrap/Form';

const CustomInput = (props) => {
  return (
    <Form.Group>
      <Form.Control
        type={props.formdata.type}
        name={props.formdata.name}
        value={props.formdata.value}
        placeholder={props.formdata.placeholder}
        onChange={props.onChange}
      />
    </Form.Group>
  )
}

export default CustomInput;