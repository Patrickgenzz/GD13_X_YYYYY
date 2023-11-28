// @ts-nocheck
import { Button, Alert, Spinner, Form } from "react-bootstrap";

// import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import InputForm from "./InputForm";
import apiSignUp from "../../api/apiSignUp";

const FormRegister = () => {
  const navigate = useNavigate();

  // const { mutate: signUpUser, isPending } = useMutation({
  //   mutationFn: apiSignUp,
  //   mutationKey: "signUp",
  //   onSuccess: (res) => {
  //     navigate("/login");
  //     toast.success(res.message);
  //   },
  //   onError: (err) => {
  //     toast.error(err.message);
  //   },
  // });

  return (
    <Form>
      <Alert variant="info" className="mb-5">
        <strong>Info!</strong> Semua form wajib diisi.
      </Alert>
      <InputForm
        type="text"
        label="Name"
        name="Name"
        placeholder="Masukkan Nama"
      />

      <InputForm
        type="text"
        label="Name"
        name="Handle"
        placeholder="Masukkan Handle"
      />

      <InputForm
        type="number"
        label="Nomor Telepon"
        name="Nomor Telepon"
        placeholder="Masukkan No Telepon"
      />
      {/* <InputForm type="file" label="Image" name="image" /> */}
      <InputForm
        type="email"
        label="Email"
        name="Email"
        placeholder="Masukkan Email"
      />
      <InputForm
        type="password"
        label="Password"
        name="Password"
        placeholder="Masukkan Password"
        autoComplete="off"
      />

      <Button type="submit" className="mt-3 w-100 border-0 buttonSubmit btn-lg">
        Register
      </Button>
    </Form>
  );
};

export default FormRegister;
