import axios from "axios";
const backendUrl = `http://localhost:3001/api`;

export const registerUser = async ({ username, password }) => {
  try {
    const reqUrl = `${backendUrl}/userauth/register`;
    const response = await axios.post(reqUrl, {
      username,
      password,
    });
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async ({ username, password }) => {
  try {
    const reqUrl = `${backendUrl}/userauth/login`;
    const response = await axios.post(reqUrl, {
      username,
      password,
    });

    localStorage.setItem("token", response.data.token);
    return response.data.name;
  } catch (error) {
    console.log(error);
  }
};

export const getUserDetails = async ({ username }) => {
  try {
    const reqUrl = `${backendUrl}/userauth/userdetails`;
    const response = await axios.post(reqUrl, {
      username,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
