// @ts-nocheck
import {
  Container,
  Table,
  Stack,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";

// import { useMutation } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

import ModalCreateContent from "../components/modals/ModalCreateContent";
import ModalEditContent from "../components/modals/ModalEditContent";

import { GetMyContents, DeleteContent } from "../api/apiContent";
import { useEffect, useState } from "react";
import { getThumbnail } from "../api";

const ContentPage = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [contents, setContents] = useState([]);
  const [isPending, setIsPending] = useState(false);

  const deleteContent = (id) => {
    setIsPending(true);
    DeleteContent(id).then((response) => {
      setIsPending(false);
      toast.success(response.message);
      fetchContents();
    }).catch((err) => {
      console.log(err);
      setIsPending(false);
      toast.dark(`🫃 ` + err.message);
    })
  }

  const fetchContents = () => {
    setIsLoading(true);
    GetMyContents().then((response) => {
      setContents(response);
      setIsLoading(false);
    }).catch((err) => {
      console.log(err);
      setIsLoading(false);
    })
  }

  useEffect(() => {
    fetchContents();
  }, [])

  return (
    <Container className="mt-4">
      <Stack direction="horizontal" gap={3} className="mb-3">
        <h1 className="h4 fw-bold mb-0 text-nowrap">My Videos</h1>
        <hr className="border-top border-light opacity-50 w-100" />
        <div className="ms-auto text-nowrap">
          <ModalCreateContent onClose={fetchContents} />
        </div>
      </Stack>
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
      ) : (contents?.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No</th>
              <th style={{ width: "200px" }}>Thumbnail</th>
              <th>Title</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {contents?.map((content, index) => (
              <tr key={content.id}>
                <td>{index + 1}</td>
                <td>
                  <img src={getThumbnail(content.thumbnail)} 
                  alt="Thumbnail" className="object-fit-cover" 
                  style={{ width: "200px", aspectRatio: "16 / 9"}} />
                </td>
                <td>{content.title}</td>
                <td>{content.description}</td>
                <td>
                  <Stack direction="horizontal" gap={2}>
                    <ModalEditContent content={content} onClose={fetchContents} />
                    {isPending ? (
                      <Button variant="danger" disabled>
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
                      <Button
                        variant="danger"
                        onClick={() => deleteContent(content.id)}
                      >
                        <FaTrash className="mx-1 mb-1" />
                        Hapus
                      </Button>
                    )}
                  </Stack>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Alert variant="dark" className="mt-3 text-center">
          Belum ada video, yuk tambah video baru!
        </Alert>
      ))}
    </Container>
  );
};

export default ContentPage;
