import axios from "axios";

const baseUrl = import.meta.env.MODE === "deployment" ? "http://localhost:5001/api" : import.meta.env.VITE_BACKEND_URL + "/api";

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});
