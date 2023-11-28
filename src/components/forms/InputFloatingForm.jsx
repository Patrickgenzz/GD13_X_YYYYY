// @ts-nocheck

import { Form, FloatingLabel } from "react-bootstrap";

/* eslint-disable */
const InputFloatingForm = (props) => {
  // const [field, meta] = useField(props);

  return (
    <Form.Group className="mb-3" controlId={props.name}>
      <FloatingLabel className="fw-bold text-light" label={props.name}>
        <Form.Control
          className="text-light bg-transparent border-secoondary"
          placeholder={props.placeholder}
          onChange={props.onChange}
          name={props.name}
          type={props.type}
        />
      </FloatingLabel>
    </Form.Group>
  );
};

export default InputFloatingForm;
