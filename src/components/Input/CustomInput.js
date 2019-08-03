import React from 'react';
import './CustomInput.scss';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

const CustomInput = (props) => {
  return (
    <Form.Group>
      <FormControl
        name={props.formdata.name}
        placeholder={props.formdata.placeholder}
        value={props.formdata.value}
        onChange={props.onChange}
        aria-label={props.formdata.name}
        aria-describedby={props.formdata.name}
      />
    </Form.Group>
  )
}

export default CustomInput;