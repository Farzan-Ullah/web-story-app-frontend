import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const createStories = async (stories) => {
  try {
    const reqUrl = `${backendUrl}/story/create`;
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.post(reqUrl, stories);
    return response.data;
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

export const getStoryById = async (storyId) => {
  try {
    const reqUrl = `${backendUrl}/story/getstory/${storyId}`;
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.get(reqUrl);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
