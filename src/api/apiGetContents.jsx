import useAxios from ".";

const apiGetContents = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

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

export default apiGetContents;
