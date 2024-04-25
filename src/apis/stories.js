import axios from "axios";
const backendUrl = `http://localhost:3001/api`;

export const createStories = async (stories) => {
  try {
    const reqUrl = `${backendUrl}/story/create`;
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.post(reqUrl, stories);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const getFullStories = async () => {
  try {
    const reqUrl = `${backendUrl}/story/stories`;
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.get(reqUrl);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
