// @ts-nocheck
import { Modal, Alert, Button, Spinner } from "react-bootstrap";

import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

import { useState } from "react";


import InputForm from "../forms/InputForm";
import apiUpdateContent from "../../api/apiUpdateContent";

/* eslint-disable react/prop-types */
const ModalEditContent = ({ content }) => {


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const { mutate: updateContent, isPending } = useMutation({
  //   mutationKey: "updateContent",
  //   mutationFn: apiUpdateContent,
  //   onSuccess: (res) => {
  //     toast.success(res.message);
  //     handleClose();
  //   },
  //   onError: (error) => {
  //     toast.error(error.message);
  //     console.log(error);
  //   },
  // });

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        <FaEdit className="mx-1 mb-1" />
        Edit
      </Button>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h2 className="fw-bold">Tambah Content</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
            <Form style={{ maxWidth: "800px", margin: "auto" }} className="p-4">
              <Alert variant="info">
                <strong>Info!</strong> Semua form wajib diisi.
              </Alert>
              <InputForm
                type="text"
                label="Title"
                name="title"
                placeholder="Masukkan Title"
              />
              <InputForm
                type="text"
                label="Released Year"
                name="released_year"
                placeholder="Masukkan Released Year"
              />
              <InputForm
                type="text"
                label="Genre"
                name="genre"
                placeholder="Masukkan Genre"
              />
              <InputForm
                type="text"
                label="Type"
                name="type"
                placeholder="Masukkan Type"
              />
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Batal
                </Button>
                {/* {isPending ? (
                  <Button variant="primary" disabled>
                    <Spinner
                      as="span"
                      animation="grow"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    Loading...
                  </Button>
                ) : (
                  <Button variant="primary" type="submit">
                    Simpan
                  </Button>
                )} */}
              </Modal.Footer>
            </Form>
        
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalEditContent;
