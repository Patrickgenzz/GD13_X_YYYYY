import { Button, Alert, Spinner } from "react-bootstrap";
import { Formik, Form } from "formik";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

import InputForm from "./InputForm";
import apiSignIn from "../../api/apiSignIn";

const FormLogin = () => {
  const navigate = useNavigate();

  const { mutate: signInUser, isPending } = useMutation({
    mutationFn: apiSignIn,
    mutationKey: "signIn",
    onSuccess: (res) => {
      sessionStorage.setItem("token", res.access_token);
      sessionStorage.setItem("user", JSON.stringify(res.user));
      toast.success(res.message);
      navigate("/user");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string().required("Required"),
      })}
      onSubmit={(values) => {
        signInUser(values);
      }}
    >
      <Form style={{ maxWidth: "800px", margin: "auto" }} className="p-4">
        <Alert variant="info">
          <strong>Info!</strong> Email dan Password Wajib diisi.
        </Alert>
        <InputForm label="Email" placeholder="Masukkan Email" name="email" type="email" />
        <InputForm label="Password" placeholder="Masukkan Password" name="password" type="password" autoComplete="off" />
        {isPending ? (
          <Button variant="primary" className="mt-3 w-100" disabled>
            <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
            Loading...
          </Button>
        ) : (
          <Button variant="primary" type="submit" className="mt-3 w-100">
            Sign In
          </Button>
        )}
      </Form>
    </Formik>
  );
};

export default FormLogin;
