// @ts-nocheck
import { Container, Card } from "react-bootstrap";

import FormRegister from "../../components/forms/FormRegister";
import imgCrown from "../../assets/images/crown.png";
import "./Form.css"

const RegisterPage = () => {
  return (
    <Container className="mt-5">
      <div className="text-center mb-3">
        <img src={imgCrown} width="150" alt="logo" />
        <h1 className="mt-1 pb-1  fw-bold" style={{ color: "#fafaff" }}>
          Sign Up
        </h1>
      </div>
      <div className="FormGlass p-4">
        <FormRegister/>
      </div>
    </Container>
  );
};

export default RegisterPage;
