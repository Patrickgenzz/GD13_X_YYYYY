// @ts-nocheck

import { Form, FloatingLabel } from "react-bootstrap";

/* eslint-disable */
const InputForm = (props) => {
  // const [field, meta] = useField(props);

  return (
    <Form.Group className="mb-3" controlId={props.name}>
      <FloatingLabel className="fw-bold text-light" label={props.name}>
        <Form.Control
          className="text-light bg-transparent border-secoondary"
          placeholder={props.placeholder}
        />
      </FloatingLabel>
    </Form.Group>
  );
};

export default InputForm;
