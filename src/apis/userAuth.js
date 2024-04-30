import axios from "axios";
// const backendUrl = `http://localhost:3001/api`;
const backendUrl = `https://swiptory-web-story-app-backend.onrender.com/api`

export const registerUser = async ({ username, password }) => {
  try {
    const reqUrl = `${backendUrl}/userauth/register`;
    const response = await axios.post(reqUrl, {
      username,
      password,
    });
    localStorage.setItem("token", response.data.token);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const updateUserBookmarks = async (id) => {
  try {
    const reqUrl = `${backendUrl}/userauth/addBookmarks/${id}`;
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.put(reqUrl, {id});
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const updateUserLikes = async (id) => {
  try {
    const reqUrl = `${backendUrl}/userauth/addlikes/${id}`;
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.put(reqUrl, {id});
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const updateUserStories = async (id) => {
  try {
    const reqUrl = `${backendUrl}/userauth/userstories/${id}`;
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.put(reqUrl, {id});
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
    localStorage.setItem("username", response.data.name);

    return response.data.name;
  } catch (error) {
    console.log(error);
  }
};

// export const getUserDetails = async () => {
//   try {
//     const reqUrl = `${backendUrl}/userauth/addBookmars`;
//     const token = localStorage.getItem("token");
//     axios.defaults.headers.common["Authorization"] = token;
//     const response = await axios.get(reqUrl);
//     console.log(response.data);
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getBookmarks = async () => {
  try {
    const reqUrl = `${backendUrl}/userauth/getbookmarks`;
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.get(reqUrl);
    console.log (response.data[0].userbookmarks);
  } catch (error) {
    console.log(error);
  }
};
