import useAxios from ".";

const SignUp = async (data) => {
  try {
    const response = await useAxios.post("/register", data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};


const SignIn = async (data) => {
  try {
    const response = await useAxios.post("/login", data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export { SignUp, SignIn };
