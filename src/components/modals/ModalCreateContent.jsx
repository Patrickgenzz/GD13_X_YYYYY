// @ts-nocheck
import { Modal, Button, Spinner, Form } from "react-bootstrap";

import { FaImage, FaPlusSquare } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";

import InputForm from "../forms/InputFloatingForm";
import { CreateContent } from "../../api/apiContent";

/* eslint-disable react/prop-types */
const ModalCreateContent = ({ onClose }) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState({
    title: "",
    description: "",
  });
  const [isPending, setIsPending] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);

  const handleClose = () => {
    setShow(false);
    setThumbnail(null);
    onClose();
  };
  const handleShow = () => setShow(true);

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const submitData = (event) => {
    event.preventDefault();
    setIsPending(true);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("thumbnail", thumbnail);

    CreateContent(formData)
      .then((response) => {
        setIsPending(false);
        toast.success(response.message);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
        setIsPending(false);
        toast.dark(JSON.stringify(err.message));
      });
  };

  const handleThumbnail = (event) => {
    setThumbnail(event.target.files[0]);
  };

  return (
    <>
      <Button variant="light" onClick={handleShow}>
        <FaPlusSquare className="mx-1 mb-1" />
        Tambah
      </Button>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Video Baru</Modal.Title>
        </Modal.Header>
        <Form onSubmit={submitData}>
          <Modal.Body>
            <div
              className="img-preview text-center position-relative mb-3"
              style={{ aspectRatio: "16 / 9" }}
            >
              {thumbnail && (
                <img
                  src={URL.createObjectURL(thumbnail)}
                  alt="Thumbnail"
                  className="w-100 h-100 object-fit-cover"
                />
              )}
              <Button
                variant="primary"
                type="button"
                disabled={isPending}
                size="sm"
                className="w-fit h-fit position-absolute bottom-0 end-0 me-3 mb-3"
                onClick={() => document.getElementById("thumbnail").click()}
              >
                <FaImage /> Pilih Thumbnail
              </Button>
              {/* Input type file yang disembunyikan, diakses pakai tombol di atas */}
              <input
                type="file"
                name="thumbnail"
                id="thumbnail"
                className="d-none"
                onChange={handleThumbnail}
                accept="image/*"
              />
            </div>
            <InputForm
              type="text"
              label="Title"
              name="title"
              placeholder="Masukkan Title"
              onChange={handleChange}
            />
            <InputForm
              as="textarea"
              label="Description"
              name="description"
              placeholder="Masukkan Description"
              onChange={handleChange}
              style={{ height: "8rem" }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Batal
            </Button>
            <Button variant="primary" type="submit" disabled={isPending}>
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
};

export default ModalCreateContent;
