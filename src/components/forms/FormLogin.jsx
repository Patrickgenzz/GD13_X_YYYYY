// @ts-nocheck
import { useState } from "react";
import { Button, Alert, Spinner, Form } from "react-bootstrap";
// import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import InputFloatingForm from "./InputFloatingForm";
import { SignIn } from "../../api/apiAuth";

const FormLogin = () => {
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
    if (data.email.trim().length > 0 && data.password.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const Login = (event) => {
    event.preventDefault();
    setLoading(true);
    SignIn(data)
      .then((res) => {
        navigate("/user");
        sessionStorage.setItem("token", res.access_token);
        sessionStorage.setItem("user", JSON.stringify(res.user));
        toast.success(res.message);
      })
      .catch((err) => {
        console.log(err);
        toast.dark(`🫃 ` + err.message);
        setLoading(false);
      });
  };

  return (
    <Form
      style={{ maxWidth: "800px", margin: "auto" }}
      className="p-4"
      onSubmit={Login}
    >
      <Alert variant="primary" className="mb-5">
        <p className="mb-0 lead"><strong>Atma</strong>Tube</p>
        <p className="mb-0">Selamat datang. Silakan masuk ke akun Anda.</p>
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
        disabled={isDisabled || loading}
        className="mt-3 w-100 border-0 buttonSubmit btn-lg"
      >
        {loading ? (
          <Spinner animation="border" variant="light" size="sm" />
        ) : (
          <span>Login</span>
        )}
      </Button>
      <p className="text-end mt-2">
        Don't have an Account?{" "}
        <Link to="/register">
          Click Here!
        </Link>
      </p>
    </Form>
  );
};

export default FormLogin;
