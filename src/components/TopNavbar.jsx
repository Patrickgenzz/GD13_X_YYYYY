// @ts-nocheck
import { useNavigate, useLocation } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";

import imgAH from "../assets/images/atmahub-white.png";

/* eslint-disable react/prop-types */
const TopNavbar = ({ routes }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/");
  };

  return (
    <Navbar
      fixed="top"
      collapseOnSelect
      expand="lg"
    >
      <Container>
        <Navbar.Brand
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
          tabIndex={0} // agar bisa diakses dengan keyboard
        >
          <div className="d-flex align-items-center">
            <img
              src={imgAH}
              height="50"
              className="d-inline-block align-top"
            />
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            {routes?.map((route, index) => (
              <Nav.Link key={index} onClick={() => navigate(route.path)}>
                <Button
                  variant={
                    location.pathname === route.path ? "primary" : "light"
                  }
                  className="w-100"
                >
                  {route.name}
                </Button>
              </Nav.Link>
            ))}

            {/* Log out */}
            <Nav.Link onClick={logout}>
              <Button variant="danger" className="w-100">
                Log Out
              </Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopNavbar;
