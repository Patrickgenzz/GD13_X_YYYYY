// @ts-nocheck
import { Modal, Button, Spinner, Form } from "react-bootstrap";

import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";

import InputForm from "../forms/InputFloatingForm";
import { UpdateContent } from "../../api/apiContent";
import { getThumbnail } from "../../api";

/* eslint-disable react/prop-types */
const ModalEditContent = ({ content, onClose }) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState(content);
  const [isPending, setIsPending] = useState(false);

  const handleClose = () => {
    setShow(false);
    onClose();
  };
  const handleShow = () => setShow(true);

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const submitData = (event) => {
    event.preventDefault();
    setIsPending(true);

    UpdateContent(data)
      .then((response) => {
        setIsPending(false);
        toast.success(response.message);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
        setIsPending(false);
        toast.dark(err.message);
      });
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <FaEdit className="mx-1 mb-1" />
        Ubah
      </Button>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Video</Modal.Title>
        </Modal.Header>
        <Form onSubmit={submitData}>
          <Modal.Body>
            <div
              className="img-preview text-center position-relative mb-3"
              style={{ aspectRatio: "16 / 9" }}
            >
              <img
                src={getThumbnail(data?.thumbnail)}
                alt="Thumbnail"
                className="w-100 h-100 object-fit-cover"
              />
            </div>
            <InputForm
              type="text"
              label="Title"
              name="title"
              placeholder="Masukkan Title"
              value={data?.title}
              onChange={handleChange}
            />
            <InputForm
              as="textarea"
              label="Description"
              name="description"
              placeholder="Masukkan Description"
              value={data?.description}
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

export default ModalEditContent;
