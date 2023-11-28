import { useField } from "formik";
import { Form } from "react-bootstrap";

/* eslint-disable */
const InputForm = (props) => {
  const [field, meta] = useField(props);

  return (
    <Form.Group className="mb-3" controlId={props.name}>
      <Form.Label className="fw-bold">{props.label}</Form.Label>
      <Form.Control {...field} {...props} isInvalid={meta.touched && meta.error} />
      {meta.touched && meta.error && (
        <Form.Text className="text-xs text-danger">
          <span className="font-medium fw-bold">Error!</span> {meta.error}
        </Form.Text>
      )}
    </Form.Group>
  );
};

export default InputForm;
