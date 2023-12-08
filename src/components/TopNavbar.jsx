// @ts-nocheck
import { useNavigate, useLocation } from "react-router-dom";
import { Navbar, Container, Nav, Button, Modal, Form, FloatingLabel } from "react-bootstrap";

import imgAH from "../assets/images/atmahub-white.png";
import { useEffect, useState } from "react";
import { getThumbnail } from "../api";
import PlaceholderImg from "../assets/images/user-icon.png"
import { FaImage, FaSave } from "react-icons/fa";
import { UpdateAvatar, UpdateProfile } from "../api/apiUser";

import { toast } from "react-toastify";

/* eslint-disable react/prop-types */
const TopNavbar = ({ routes }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [currentUserData, setCurrentUserData] = useState({});
  const [avatar, setAvatar] = useState(null);

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/");
  };

  const showEditModal = () => {
    setShowModal(true);
  }

  const editProfile = (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (avatar) {
      formData.append("avatar", avatar);
    }
    formData.append("bio", currentUserData.bio);
    formData.append("handle", currentUserData.handle)

    UpdateAvatar(formData)
      .then((res) => {
        sessionStorage.setItem("user", JSON.stringify(res.data));
        setShowModal(false);
        toast.success(res.message);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      });
  }

  useEffect(() => {
    setCurrentUserData(JSON.parse(sessionStorage.getItem("user")));
  }, []);

  return <>
    <Navbar fixed="top" collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
          tabIndex={0} // agar bisa diakses dengan keyboard
        >
          <div className="d-flex align-items-center">
            <img src={imgAH} height="50" className="d-inline-block align-top" />
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

            <Nav.Link onClick={showEditModal}>
              <Button variant="success" className="w-100">
                Edit Profile
              </Button>
            </Nav.Link>

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

    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <form onSubmit={editProfile}>
        <Modal.Body>
          <div className="text-center mb-3">
            <img className="rounded-circle mx-auto object-fit-cover" style={{ width: "250px", aspectRatio: "1 / 1" }} src={
              avatar ? (
                URL.createObjectURL(avatar)
              ) : (
                currentUserData?.avatar ? getThumbnail(currentUserData?.avatar) : PlaceholderImg
              )} alt="Avatar" />
          </div>
          <div className="text-center mb-3">
            <Button variant="success" size="sm" onClick={() => document.getElementById("inputAvatar").click()}><FaImage /> Pilih Foto Profil</Button>
            <input type="file" id="inputAvatar" className="d-none" onChange={(e) => setAvatar(e.target.files[0])} accept="image/*" />
          </div>
          <div>
            <Form.Group className="w-100 me-3 mb-3">
                <FloatingLabel className="fw-bold text-light" label="Handle (@)">
                    <Form.Control
                        placeholder="Handle (@)"
                        value={currentUserData?.handle}
                        onChange={(e) => setCurrentUserData({ ...currentUserData, handle: e.target.value })}
                    />
                </FloatingLabel>
            </Form.Group>

            <Form.Group className="w-100 me-3 mb-0">
                <FloatingLabel className="fw-bold text-light" label="Bio">
                    <Form.Control
                        placeholder="Bio"
                        value={currentUserData?.bio}
                        onChange={(e) => setCurrentUserData({ ...currentUserData, bio: e.target.value })}
                    />
                </FloatingLabel>
            </Form.Group>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit">
            <FaSave /> Save
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  </>
};

export default TopNavbar;
