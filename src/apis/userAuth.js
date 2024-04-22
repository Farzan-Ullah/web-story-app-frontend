import axios from "axios";
const backendUrl = `http://localhost:3001/api`;

export const registerUser = async ({ username, password }) => {
  try {
    const reqUrl = `${backendUrl}/auth/register`;
    const response = await axios.post(reqUrl, {
      username,
      password,
    });
    console.log(response.data);
  } catch (error) {
    console.log(error);
    alert("Something went wrong!");
  }
};
