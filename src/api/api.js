import axios from "axios";

const API = axios.create({
  baseURL: "https://signature-app-backend-5uvj.onrender.com/api",
});

// Attach JWT token to all requests
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers['Authorization'] = `Bearer ${token}`;
  }
  return req;
});

export default API;
