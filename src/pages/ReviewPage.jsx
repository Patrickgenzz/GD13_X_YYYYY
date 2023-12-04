import { useNavigate, useParams } from "react-router-dom";
import { Alert, Button, Card, Container, FloatingLabel, Form, Modal, Spinner, Stack } from "react-bootstrap";
import { GetContentById } from "../api/apiContent";
import { useEffect, useState } from "react";
import { getThumbnail } from "../api";
import { CreateReview, DeleteReview, GetAllReviews, UpdateReview } from "../api/apiReview";
import { toast } from "react-toastify";
import { FaEdit, FaSave, FaTrashAlt, FaVideo } from "react-icons/fa";

import UserIcon from "../assets/images/user-icon.png"

export default function ReviewPage() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [content, setContent] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [reviews, setReviews] = useState([])
    const [isReviewLoading, setIsReviewLoading] = useState(false)
    const [currentUser, setCurrentUser] = useState()
    const [currentReview, setCurrentReview] = useState() // untuk DELETE & EDIT
    const [showModalEdit, setShowModalEdit] = useState(false)
    const [showModalDelete, setShowModalDelete] = useState(false)
    const [newReviewContent, setNewReviewContent] = useState("")
    const [editedReviewContent, setEditedReviewContent] = useState("")

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
    }

    const getReviews = () => {
        setIsReviewLoading(true);
        GetAllReviews(id)
            .then((data) => {
                setReviews(data);
            })
            .catch((err) => {
                toast.error(JSON.stringify(err?.message));
            })
            .finally(() => {
                setIsReviewLoading(false);
            });
    }

    const postReview = () => {
        setIsReviewLoading(true)
        CreateReview({
            id_content: id,
            comment: newReviewContent
        })
            .then((data) => {
                setNewReviewContent("")
                toast.success(data.message)
            })
            .catch((err) => {
                toast.error(err?.message);
            })
            .finally(() => {
                getReviews()
            });
    }

    const updateReview = () => {
        setIsReviewLoading(true)
        UpdateReview(currentReview?.id, {
            comment: editedReviewContent
        })
            .then((data) => {
                toast.success(data.message)
            })
            .catch((err) => {
                toast.error(JSON.stringify(err?.message));
            })
            .finally(() => {
                setShowModalEdit(false)
                getReviews()
            });
    }

    const deleteReview = () => {
        setIsReviewLoading(true)
        DeleteReview(currentReview?.id)
            .then((data) => {
                toast.success(data.message)
            })
            .catch((err) => {
                toast.error(JSON.stringify(err?.message));
            })
            .finally(() => {
                setShowModalDelete(false)
                getReviews()
            });
    }

    const handleEditReview = (review) => {
        setCurrentReview(review)
        setShowModalEdit(true)
        setEditedReviewContent(review.comment)
    }

    const handleDeleteReview = (review) => {
        setCurrentReview(review)
        setShowModalDelete(true)
    }

    useEffect(() => {
        getDetail()
        getReviews()

        const user = JSON.parse(sessionStorage.getItem("user"))
        setCurrentUser(user)
    }, [id]);

    if (!id) {
        navigate("/user");
    } else if (!isLoading && !content) {
        navigate("/user");
    } else {
        return <>
            <Container className="mt-4">
                <Stack direction="horizontal" gap={3} className="mb-3">
                    <h1 className="h4 fw-bold mb-0 text-nowrap">Review Video</h1>
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
                        <div className="d-flex">
                            <div>
                                <Card.Img
                                    src={getThumbnail(content?.thumbnail)}
                                    className="rounded object-fit-cover"
                                    style={{ aspectRatio: "16 / 9" }}
                                />
                            </div>
                            <Card.Body className="flex-shrink-0" style={{ width: "300px" }}>
                                <FaVideo className="mb-3 fs-1" />
                                <h4>
                                    {content?.title}
                                </h4>
                                <p>{content?.description}</p>
                            </Card.Body>
                        </div>
                    </Card>
                )}

                <h5 className="fw-bold">Reviews</h5>

                <label className="mb-2">Tuliskan review baru:</label>
                <Stack direction="horizontal" className="mb-3">
                    <Form.Group className="w-100 me-3 mb-0">
                        <FloatingLabel className="fw-bold text-light" label="Add New Review">
                            <Form.Control
                                className="text-light bg-transparent border-secoondary"
                                placeholder="Add New Review"
                                value={newReviewContent}
                                onChange={(e) => setNewReviewContent(e.target.value)}
                            />
                        </FloatingLabel>
                    </Form.Group>
                    <Button variant="primary" className="h-100" onClick={postReview}>Kirim</Button>
                </Stack>
                {isReviewLoading ? (
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
                ) : reviews?.length > 0 ? (
                    <div>
                        {reviews?.map((review) => (
                            <Card className="mb-3 bg-transparent" key={review.id}>
                                <Card.Body className="d-flex align-items-center">
                                    <div>
                                        <img src={UserIcon} className="rounded-circle me-3" style={{ width: "4rem" }} />
                                    </div>
                                    <div className="w-100">
                                        <h6 className="fw-bold">@{review.Reviewer}</h6>
                                        <p className="mb-0">{review.comment}</p>
                                    </div>
                                    {currentUser?.id === review.id_user && (
                                        <div className="flex-shrink-0 flex">
                                            {/* <Button variant="primary" className="me-2" onClick={() => handleEditReview(review)}>
                                                <FaEdit />
                                            </Button> */}
                                            <Button variant="danger" onClick={() => handleDeleteReview(review)}>
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
                        Belum ada review, ayo tambahin review!
                    </Alert>
                )}
            </Container>

            <Modal show={showModalEdit} onHide={() => setShowModalEdit(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FloatingLabel className="fw-bold text-light" label="Review Content">
                        <Form.Control
                            className="text-light bg-transparent border-secoondary"
                            placeholder="Review Content"
                            value={editedReviewContent}
                            onChange={(e) => setEditedReviewContent(e.target.value)}
                        />
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={updateReview}><FaSave /> Update Review</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showModalDelete} onHide={() => setShowModalDelete(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Hapus Review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Apakah Anda yakin dengan sungguh-sungguh ingin menghapus review ini:</p>
                    <p className="lead fw-bold mb-0">{currentReview?.comment}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={deleteReview}><FaTrashAlt /> Hapus</Button>
                </Modal.Footer>
            </Modal>
        </>
    }
}