// @ts-nocheck
import { useState } from "react";
import { Button, Alert, Spinner, Form } from "react-bootstrap";
// import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import InputFloatingForm from "./InputFloatingForm";
import { SignIn } from "../../api/apiAuth";

const FormLogin = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const moveToRegister = () => {
    navigate("/register");
  };

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const Login = (event) => {
    event.preventDefault();
    SignIn(data)
      .then((res) => {
        console.log("masuk sini");
        navigate("/user");
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        toast.success(res.message);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  return (
    <Form
      style={{ maxWidth: "800px", margin: "auto" }}
      className="p-4"
      onSubmit={Login}
    >
      <Alert variant="info" className="mb-5">
        <strong>Info!</strong> Email dan Password Wajib diisi.
      </Alert>

      <InputFloatingForm
        label="Username"
        placeholder="Masukkan Username"
        name="email"
        type="email"
        onChange={handleChange}
      />
      <InputFloatingForm
        label="Password"
        placeholder="Masukkan Password"
        name="password"
        type="password"
        autoComplete="off"
        onChange={handleChange}
      />

      <Button
        variant="primary"
        type="submit"
        className="mt-3 w-100 border-0 buttonSubmit btn-lg"
      >
        Sign In
      </Button>
      <p className="text-end mt-2">
        Don't have an Account?{" "}
        <a onClick={moveToRegister}>
          <u>Click Here!</u>
        </a>
      </p>
    </Form>
  );
};

export default FormLogin;
