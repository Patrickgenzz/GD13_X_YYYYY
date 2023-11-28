// @ts-nocheck
import { Modal, Alert, Button, Spinner } from "react-bootstrap";

import { FaPlusSquare } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";

import InputForm from "../forms/InputFloatingForm";
import { CreateContent } from "../../api/apiContent";

/* eslint-disable react/prop-types */
const ModalCreateContent = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const { mutate: createContent, isPending } = useMutation({
  //   mutationKey: "createContent",
  //   mutationFn: apiCreateContent,
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
      <Button variant="info" onClick={handleShow}>
        <FaPlusSquare className="mx-1 mb-1" />
        Tambah
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
              type="texxt"
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
              {/* <Button variant="secondary" onClick={handleClose}>
                  Batal
                </Button>
                {isPending ? (
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

export default ModalCreateContent;
