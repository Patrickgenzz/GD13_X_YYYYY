import { Modal, Alert, Button, Spinner } from "react-bootstrap";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik, Form } from "formik";
import { FaPlusSquare } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

import InputForm from "../forms/InputForm";
import apiCreateContent from "../../api/apiCreateContent";

/* eslint-disable react/prop-types */
const ModalCreateContent = () => {
  const queryClient = useQueryClient();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { mutate: createContent, isPending } = useMutation({
    mutationKey: "createContent",
    mutationFn: apiCreateContent,
    onSuccess: (res) => {
      queryClient.invalidateQueries("contents");
      toast.success(res.message);
      handleClose();
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
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
          <Formik
            initialValues={{
              title: "",
              released_year: "",
              genre: "",
              type: "",
            }}
            validationSchema={Yup.object({
              title: Yup.string().required("Required"),
              released_year: Yup.string().required("Required"),
              genre: Yup.string().required("Required"),
              type: Yup.string().required("Required"),
            })}
            onSubmit={(values) => {
              createContent(values);
            }}
          >
            <Form style={{ maxWidth: "800px", margin: "auto" }} className="p-4">
              <Alert variant="info">
                <strong>Info!</strong> Semua form wajib diisi.
              </Alert>
              <InputForm type="text" label="Title" name="title" placeholder="Masukkan Title" />
              <InputForm type="texxt" label="Released Year" name="released_year" placeholder="Masukkan Released Year" />
              <InputForm type="text" label="Genre" name="genre" placeholder="Masukkan Genre" />
              <InputForm type="text" label="Type" name="type" placeholder="Masukkan Type" />
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Batal
                </Button>
                {isPending ? (
                  <Button variant="primary" disabled>
                    <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                    Loading...
                  </Button>
                ) : (
                  <Button variant="primary" type="submit">
                    Simpan
                  </Button>
                )}
              </Modal.Footer>
            </Form>
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalCreateContent;
