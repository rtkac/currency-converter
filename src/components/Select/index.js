import React from 'react';
import Form from 'react-bootstrap/Form';
import uuid from 'uuid';

const Select = (props) => {
  return (
    <Form.Group>
      <Form.Control
        as="select"
        name={props.formdata.name}
        value={props.formdata.value}
        onChange={props.onChange}
        isInvalid={!props.valid}
      >
        <option value="">Select {props.formdata.name}</option>
        {
          props.formdata.options.map(option => (
            <option
              key={uuid()}
              value={option.key}
            >
              {option.value}
            </option>
          ))
        }
      </Form.Control>
    </Form.Group>
  )
}

export default Select;