import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL || "/api";

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    // global error handling can go here (e.g., refresh token logic)
    return Promise.reject(error);
  }
);

export default api;
