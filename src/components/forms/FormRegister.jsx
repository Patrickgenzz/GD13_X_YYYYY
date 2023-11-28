import { Button, Alert, Spinner } from "react-bootstrap";
import { Formik, Form } from "formik";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

import InputForm from "./InputForm";
import apiSignUp from "../../api/apiSignUp";

const FormRegister = () => {
  const navigate = useNavigate();

  const { mutate: signUpUser, isPending } = useMutation({
    mutationFn: apiSignUp,
    mutationKey: "signUp",
    onSuccess: (res) => {
      navigate("/login");
      toast.success(res.message);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return (
    <Formik
      initialValues={{
        name: "",
        no_telp: "",
        email: "",
        password: "",
        // image: "",
      }}
      validationSchema={Yup.object({
        name: Yup.string().required("Required"),
        no_telp: Yup.string().required("Required").min(11, "Must be at least 11 digits"),
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string().required("Required"),
      })}
      onSubmit={(values) => {
        signUpUser(values);
      }}
    >
      <Form style={{ maxWidth: "800px", margin: "auto" }} className="p-4">
        <Alert variant="info">
          <strong>Info!</strong> Semua form wajib diisi.
        </Alert>
        <InputForm type="text" label="Nama" name="name" placeholder="Masukkan Nama" />
        <InputForm type="number" label="Nomor Telepon" name="no_telp" placeholder="Masukkan No Telepon" />
        {/* <InputForm type="file" label="Image" name="image" /> */}
        <InputForm type="email" label="Email" name="email" placeholder="Masukkan Email" />
        <InputForm type="password" label="Password" name="password" placeholder="Masukkan Password" autoComplete="off" />
        {isPending ? (
          <Button variant="primary" className="mt-3 w-100" disabled>
            <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
            Loading...
          </Button>
        ) : (
          <Button variant="primary" type="submit" className="mt-3 w-100">
            Register
          </Button>
        )}
      </Form>
    </Formik>
  );
};

export default FormRegister;
