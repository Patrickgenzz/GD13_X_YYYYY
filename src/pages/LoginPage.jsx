import { Container } from "react-bootstrap";

import FormLogin from "../components/forms/FormLogin";
import imgCrown from "../assets/images/crown.png";

const LoginPage = () => {
  return (
    <Container className="mt-5">
      <div className="text-center mb-3">
        <img src={imgCrown} width="150" alt="logo" />
        <h1 className="mt-1 pb-1 text-primary fw-bold">Sign In</h1>
      </div>
      <FormLogin />
    </Container>
  );
};

export default LoginPage;
