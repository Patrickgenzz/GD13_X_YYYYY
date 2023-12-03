import useAxios from ".";

export const GetMyProfile = async () => {
  try {
    const response = await useAxios.get("/user", {
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



export const UpdateProfile = async (values) => {
  try {
    const response = await useAxios.put("/user", values, {
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
