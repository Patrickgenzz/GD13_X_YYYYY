import useAxios from ".";
// Get all contents
export const GetAllContents = async () => {
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    const response = await useAxios.get("/contents", {
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

// Get my contents
export const GetMyContents = async () => {

  const id = JSON.parse(sessionStorage.getItem("user")).id;
  try {
    const response = await useAxios.get(`/contents/user/${id}`, {
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

// Get content by id
export const GetContentById = async (id) => {

  try {
    const response = await useAxios.get(`/contents/${id}`, {
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
export const CreateContent = async (data) => {
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    const response = await useAxios.post("/contents", data, {
      headers: {
        "Content-Type": "multipart/form-data", // untuk upload thumbnail
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Put / Update Data
export const UpdateContent = async (values) => {
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    const response = await useAxios.put(`/contents/${values.id}`, values, {
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
export const DeleteContent = async (id) => {
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    const response = await useAxios.delete(`/contents/${id}`, {
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
