import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});
// for storing image in public folder in server.
export const uploadImage = (data) => API.post("/upload/", data);

// for storing post details in database.
export const uploadPost = (data) => API.post("/post", data);