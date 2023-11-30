// @ts-nocheck
import { Button, Alert, Spinner, Form } from "react-bootstrap";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import InputFloatingForm from "./InputFloatingForm";
import { SignUp } from "../../api/apiAuth";

const FormRegister = () => {
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const [data, setData] = useState({
    name: "",
    handle: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleCheck = (e) => {
    let isChecked = e.target.checked;
    if (isChecked) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const Register = (event) => {
    event.preventDefault();
    SignUp(data)
      .then((res) => {
        console.log("masuk sini");
        navigate("/");
        toast.success(res.message);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  return (
    <Form style={{ maxWidth: "800px", margin: "auto" }} onSubmit={Register}>
      <Alert variant="primary" className="mb-5 alertColor">
        <strong>Info!</strong> Semua form wajib diisi.
      </Alert>
      <InputFloatingForm
        type="text"
        label="Name"
        name="name"
        onChange={handleChange}
        placeholder="Masukkan Nama"
      />
      <InputFloatingForm
        type="text"
        label="Handle"
        name="handle"
        onChange={handleChange}
        placeholder="Masukkan Handle"
      />
      {/* <InputForm type="file" label="Image" name="image" /> */}
      <InputFloatingForm
        type="email"
        label="Email"
        name="email"
        onChange={handleChange}
        placeholder="Masukkan Email"
      />
      <InputFloatingForm
        type="password"
        label="Password"
        name="password"
        onChange={handleChange}
        placeholder="Masukkan Password"
        autoComplete="off"
      />
      <label className="d-flex justify-content-start">
        <Form.Check type="checkbox" onChange={handleCheck} />
        <p className="ms-2">
          Have you Already Read the{" "}
          <a href="https://www.youtube.com/static?template=terms&gl=ID">
            Terms of Service
          </a>
        </p>
      </label>
      <Button
        disabled={isDisabled}
        type="submit"
        className="mt-3 w-100 border-0 buttonSubmit btn-lg"
      >
        Register
      </Button>
      <p className="text-end mt-2">
        Already Have an Account? <Link to="/">Click Here!</Link>
      </p>
    </Form>
  );
};

export default FormRegister;
