import { Container, Table, Stack, Button, Spinner, Alert } from "react-bootstrap";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

import ModalCreateContent from "../components/modals/ModalCreateContent";
import ModalEditContent from "../components/modals/ModalEditContent";

import apiGetContents from "../api/apiGetContents";
import apiDeleteContent from "../api/apiDeleteContent";

const ContentPage = () => {
  const queryClient = useQueryClient();

  const {
    data: contents,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["contents"],
    queryFn: apiGetContents,
  });

  const { mutate: deleteContent, isPending } = useMutation({
    mutationKey: "deleteContent",
    mutationFn: apiDeleteContent,
    onSuccess: (res) => {
      queryClient.invalidateQueries("contents");
      toast.success(res.message);
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  if (isLoading)
    return (
      <Container className="mt-4">
        <Spinner as="span" animation="border" variant="primary" size="lg" role="status" aria-hidden="true" />
        <h6>Loading...</h6>
      </Container>
    );

  return (
    <Container className="mt-4">
      <Stack direction="horizontal" gap={3}>
        <h1 className="fw-bold">Content Page</h1>
        <div className="ms-auto">
          <ModalCreateContent />
        </div>
      </Stack>
      {error ? (
        <Alert variant="info" className="mt-3">
          <strong>Info!</strong> Data masih kosong.
        </Alert>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Title</th>
              <th>Released Year</th>
              <th>Genre</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {contents?.map((content, index) => (
              <tr key={content.id}>
                <td>{index + 1}</td>
                <td>{content.title}</td>
                <td>{content.released_year}</td>
                <td>{content.genre}</td>
                <td>{content.type}</td>
                <td>
                  <Stack direction="horizontal" gap={2}>
                    <ModalEditContent content={content} />
                    {isPending ? (
                      <Button variant="danger" disabled>
                        <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                        Loading...
                      </Button>
                    ) : (
                      <Button variant="danger" onClick={() => deleteContent(content.id)}>
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
      )}
    </Container>
  );
};

export default ContentPage;
