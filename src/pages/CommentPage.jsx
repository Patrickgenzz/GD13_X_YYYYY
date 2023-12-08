import { useNavigate, useParams } from "react-router-dom";
import {
  Alert,
  Button,
  Card,
  Container,
  FloatingLabel,
  Form,
  Modal,
  Spinner,
  Stack,
} from "react-bootstrap";
import { GetContentById } from "../api/apiContent";
import { useEffect, useState } from "react";
import { getThumbnail } from "../api";
import {
  CreateComment,
  DeleteComment,
  GetAllComments,
  UpdateComment,
} from "../api/apiComment";
import { toast } from "react-toastify";
import { FaEdit, FaSave, FaTrashAlt, FaVideo } from "react-icons/fa";

import UserIcon from "../assets/images/user-icon.png";

export default function CommentPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [currentComment, setCurrentComment] = useState(); // untuk DELETE & EDIT
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [newCommentContent, setNewCommentContent] = useState("");
  const [editedCommentContent, setEditedCommentContent] = useState("");

  const getDetail = () => {
    setIsLoading(true);
    GetContentById(id)
      .then((data) => {
        setContent(data);
      })
      .catch((err) => {
        toast.error(JSON.stringify(err?.message));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getComments = () => {
    setIsCommentLoading(true);
    GetAllComments(id)
      .then((data) => {
        setComments(data);
      })
      .catch((err) => {
        toast.error(JSON.stringify(err?.message));
      })
      .finally(() => {
        setIsCommentLoading(false);
      });
  };

  const postComment = () => {
    setIsCommentLoading(true);
    CreateComment({
      id_content: id,
      comment: newCommentContent,
    })
      .then((data) => {
        setNewCommentContent("");
        toast.success(data.message);
      })
      .catch((err) => {
        toast.error(err?.message);
      })
      .finally(() => {
        getComments();
      });
  };

  const updateComment = () => {
    setIsCommentLoading(true);
    UpdateComment(currentComment?.id, {
      comment: editedCommentContent,
    })
      .then((data) => {
        toast.success(data.message);
      })
      .catch((err) => {
        toast.error(JSON.stringify(err?.message));
      })
      .finally(() => {
        setShowModalEdit(false);
        getComments();
      });
  };

  const deleteComment = () => {
    setIsCommentLoading(true);
    DeleteComment(currentComment?.id)
      .then((data) => {
        toast.success(data.message);
      })
      .catch((err) => {
        toast.error(JSON.stringify(err?.message));
      })
      .finally(() => {
        setShowModalDelete(false);
        getComments();
      });
  };

  const handleEditComment = (comment) => {
    setCurrentComment(comment);
    setShowModalEdit(true);
    setEditedCommentContent(comment.comment);
  };

  const handleDeleteComment = (comment) => {
    setCurrentComment(comment);
    setShowModalDelete(true);
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false, // format 24 jam
    };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  };

  useEffect(() => {
    getDetail();
    getComments();

    const user = JSON.parse(sessionStorage.getItem("user"));
    setCurrentUser(user);
  }, [id]);

  if (!id) {
    navigate("/user");
  } else if (!isLoading && !content) {
    navigate("/user");
  } else {
    return (
      <>
        <Container className="mt-4">
          <Stack direction="horizontal" gap={3} className="mb-3">
            <h1 className="h4 fw-bold mb-0 text-nowrap">Comment Video</h1>
            <hr className="border-top border-light opacity-50 w-100" />
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
          ) : (
            <Card className="mb-4">
              <div className="d-flex flex-column">
                <div>
                  <Card.Img
                    src={getThumbnail(content?.thumbnail)}
                    className="rounded object-fit-cover"
                    style={{ aspectRatio: "16 / 9" }}
                  />
                </div>
                <Card.Body className="flex-shrink-0">
                  <div className="d-flex">
                    <FaVideo className="mb-3 fs-1 me-2" />
                    <h4 className="mt-2 mx-2">{content?.title}</h4>
                  </div>
                  <p className="mb-0">{content?.description}</p>
                </Card.Body>
              </div>
            </Card>
          )}

          <h5 className="fw-bold">Comments</h5>

          <label className="mb-2">Tuliskan komentar baru:</label>
          <Stack direction="horizontal" className="mb-3">
            <Form.Group className="w-100 me-3 mb-0">
              <FloatingLabel
                className="fw-bold text-light"
                label="Add New Comment"
              >
                <Form.Control
                  className="text-light bg-transparent border-secoondary"
                  placeholder="Add New Comment"
                  value={newCommentContent}
                  onChange={(e) => setNewCommentContent(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
            <Button variant="primary" className="h-100" onClick={postComment}>
              Kirim
            </Button>
          </Stack>
          {isCommentLoading ? (
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
          ) : comments?.length > 0 ? (
            <div>
              {comments?.map((comment) => (
                <Card className="mb-3 bg-transparent" key={comment.id}>
                  <Card.Body className="d-flex align-items-center">
                    <div>
                      <img
                        src={UserIcon}
                        className="rounded-circle me-3"
                        style={{ width: "4rem" }}
                      />
                    </div>
                    <div className="w-100">
                      <h6 className="fw-bold">@{comment.Reviewer}</h6>
                      <p className="mb-0">{comment.comment}</p>
                    </div>
                    <p className="mb-0 mx-4 text-end">
                      {formatDate(comment.date_added)}
                    </p>
                    {currentUser?.id === comment.id_user && (
                      <div className="flex-shrink-0 flex">
                        <Button
                          variant="primary"
                          className="me-2"
                          onClick={() => handleEditComment(comment)}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleDeleteComment(comment)}
                        >
                          <FaTrashAlt />
                        </Button>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              ))}
            </div>
          ) : (
            <Alert variant="dark" className="text-center">
              Belum ada komentar, ayo tambahin komentar!
            </Alert>
          )}
        </Container>

        <Modal show={showModalEdit} onHide={() => setShowModalEdit(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Comment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FloatingLabel
              className="fw-bold text-light"
              label="Comment Content"
            >
              <Form.Control
                className="text-light bg-transparent border-secoondary"
                placeholder="Comment Content"
                value={editedCommentContent}
                onChange={(e) => setEditedCommentContent(e.target.value)}
              />
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={updateComment}>
              <FaSave /> Update Comment
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showModalDelete} onHide={() => setShowModalDelete(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Hapus Comment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Apakah Anda yakin dengan sungguh-sungguh ingin menghapus comment
              ini:
            </p>
            <p className="lead fw-bold mb-0">{currentComment?.comment}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={deleteComment}>
              <FaTrashAlt /> Hapus
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
