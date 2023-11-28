// @ts-nocheck
import { Button, Alert, Spinner, Form } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const moveToLogin = () => {
    navigate("/");
  };

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
      <Alert variant="info" className="mb-5">
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
        label="Name"
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
      <Form.Check
        type="checkbox"
        onChange={handleCheck}
        label="Have you Already Read the term and condition"
      />

      <Button
        disabled={isDisabled}
        type="submit"
        className="mt-3 w-100 border-0 buttonSubmit btn-lg"
      >
        Register
      </Button>
      <p className="text-end mt-2">
        Already Have an Account?{" "}
        <a onClick={moveToLogin}>
          <u>Click Here!</u>
        </a>
      </p>
    </Form>
  );
};

export default FormRegister;
