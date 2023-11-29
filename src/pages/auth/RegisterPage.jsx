// @ts-nocheck
import { Container, Card } from "react-bootstrap";

import FormRegister from "../../components/forms/FormRegister";
import imgAH from "../../assets/images/atmahub-white.png";
import "./Form.css"

const RegisterPage = () => {
  return (
    <Container className="mt-5">
      <div className="text-center mb-3">
        <img src={imgAH} width="200" alt="logo" />
        <h1 className="mt-1 pb-1  fw-bold" style={{ color: "#fafaff" }}>
          Sign Up
        </h1>
      </div>
      <FormRegister />
    </Container>
  );
};

export default RegisterPage;
