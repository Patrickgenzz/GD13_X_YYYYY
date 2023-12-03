// @ts-nocheck
import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Stack,
  Spinner,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import image from "../assets/images/profil.png";
import { GetMyProfile, UpdateProfile } from "../api/apiUser";
import { FaPen } from "react-icons/fa6";
import InputForm from "../components/forms/InputFloatingForm";
import { toast } from "react-toastify";

function UserPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchUser = () => {
    setIsLoading(true);
    GetMyProfile()
      .then((response) => {
        setUser(response);
        console.log(response);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  const submitData = (event) => {
    event.preventDefault();
    setIsPending(true);

    UpdateProfile(user)
      .then((response) => {
        setIsPending(false);
        console.log("berhasil??");
        fetchUser();
        toast.success(response.message);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
        setIsPending(false);
        toast.dark(err.message);
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <Container className="mt-4">
        <Stack direction="horizontal" gap={3} className="mb-3">
          <h1 className="h4 fw-bold mb-0 text-nowrap">Profil</h1>
          <hr className="border-top border-light opacity-50 w-100" />
        </Stack>
        <Card>
          <Card.Body>
            {isLoading ? (
              <div className="text-center">
                <Spinner
                  as="span"
                  animation="border"
                  variant="primary"
                  size="lg"
                  role="status"
                  aria-hidden="true"
                />
                <h6 className="mt-2 mb-0">Loading...</h6>
              </div>
            ) : (
              <Stack
                direction="horizontal"
                gap={3}
                className="align-items-start"
              >
                <img
                  src={image}
                  style={{ width: "350px", height: "350px" }}
                  alt="profilUser"
                />
                <div className="p-2 w-100">
                  <Stack direction="horizontal" gap={3}>
                    <h1>{user.name}</h1>
                    <Button
                      variant="success"
                      className="ms-auto"
                      onClick={handleShow}
                    >
                      <FaPen /> Edit Profil
                    </Button>
                  </Stack>
                  <h5>@{user.handle}</h5>
                  <p className="mb-1">email: {user.email}</p>
                  <p className="mb-0">bio : </p>
                  <p>{user.bio}</p>
                </div>
              </Stack>
            )}
          </Card.Body>
        </Card>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profil</Modal.Title>
        </Modal.Header>
        <Form onSubmit={submitData}>
          <Modal.Body>
            <InputForm
              type="text"
              label="Name"
              name="name"
              placeholder="Masukkan Nama"
              value={user.name}
              onChange={handleChange}
            />
            <InputForm
              type="text"
              label="Handle"
              name="handle"
              placeholder="Masukkan handle"
              value={user.handle}
              onChange={handleChange}
            />
            <InputForm
              type="email"
              label="Email"
              name="email"
              placeholder="Masukkan Email"
              value={user.email}
              onChange={handleChange}
            />
            <InputForm
              as="textarea"
              label="Bio"
              name="bio"
              placeholder="Masukkan Bio"
              value={user.bio}
              style={{ height: "150px" }}
              onChange={handleChange}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" onClick={handleClose}>
              {isPending ? (
                <>
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  Loading...
                </>
              ) : (
                <span>Simpan</span>
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default UserPage;
