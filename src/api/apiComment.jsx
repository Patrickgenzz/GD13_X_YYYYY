import useAxios from ".";
// Get all
export const GetAllComments = async (id) => {
  try {
    const response = await useAxios.get(`/comments/${id}`, {
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
export const CreateComment = async (data) => {
  try {
    const response = await useAxios.post("/comments", data, {
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
export const UpdateComment = async (id, data) => {
  try {
    const response = await useAxios.put(`/comments/${id}`, data, {
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
export const DeleteComment = async (id) => {
  try {
    const response = await useAxios.delete(`/comments/${id}`, {
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
