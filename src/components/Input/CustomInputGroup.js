import React from 'react';
import './CustomInputGroup.scss';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

const CustomInputGroup = (props) => {
  return (
    <Form.Group>
      <InputGroup>
        <FormControl
          name={props.formdata.name}
          placeholder={props.formdata.placeholder}
          value={props.formdata.value}
          onChange={props.onChange}
          aria-label={props.formdata.name}
          aria-describedby={props.formdata.name}
        />
        <InputGroup.Append>
          <InputGroup.Text id={props.formdata.name}>{props.inputRight}</InputGroup.Text>
        </InputGroup.Append>
      </InputGroup>
    </Form.Group>
  )
}

export default CustomInputGroup;