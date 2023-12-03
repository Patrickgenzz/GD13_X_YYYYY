import useAxios from ".";
// Get all
export const GetAllReviews = async (id) => {
  try {
    const response = await useAxios.get(`/reviews/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Post / Create Data
export const CreateReview = async (data) => {
  try {
    const response = await useAxios.post("/reviews", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Put / Update Data
export const UpdateReview = async (id, data) => {
  try {
    const response = await useAxios.put(`/reviews/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Delete Data
export const DeleteReview = async (id) => {
  try {
    const response = await useAxios.delete(`/reviews/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
