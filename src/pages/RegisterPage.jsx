import { Container } from "react-bootstrap";

import FormRegister from "../components/forms/FormRegister";
import imgCrown from "../assets/images/crown.png";

const RegisterPage = () => {
  return (
    <Container className="mt-5">
      <div className="text-center mb-3">
        <img src={imgCrown} width="150" alt="logo" />
        <h1 className="mt-1 pb-1 text-primary fw-bold">Sign Up</h1>
      </div>
      <FormRegister />
    </Container>
  );
};

export default RegisterPage;
