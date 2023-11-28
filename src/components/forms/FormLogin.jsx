// @ts-nocheck
import { Button, Alert, Spinner, Form } from "react-bootstrap";

// import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


import InputForm from "./InputForm";
import apiSignIn from "../../api/apiSignIn";

const FormLogin = () => {
  const navigate = useNavigate();


  return (
    
      <Form style={{ maxWidth: "800px", margin: "auto" }} className="p-4">
        <Alert variant="info">
          <strong>Info!</strong> Email dan Password Wajib diisi.
        </Alert>
        <InputForm
          label="Username"
          placeholder="Masukkan Username"
          name="email"
          type="email"
        />
        <InputForm
          label="Password"
          placeholder="Masukkan Password"
          name="password"
          type="password"
          autoComplete="off"
        />
        {/* {isPending ? (
          <Button variant="primary" className="mt-3 w-100" disabled>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Loading...
          </Button>
        ) : ( */}
          <Button variant="primary" type="submit" className="mt-3 w-100">
            Sign In
          </Button>
        {/* )} */}
      </Form>
  
  );
};

export default FormLogin;
