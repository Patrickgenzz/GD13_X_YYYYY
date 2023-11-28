import useAxios from ".";

const signUp = async (data) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    const response = await useAxios.post("/register", data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default signUp;
