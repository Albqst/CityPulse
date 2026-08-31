import axios from "axios";

const api = axios.create({
  baseURL: (import.meta && import.meta.env && import.meta.env.VITE_API_BASE) || "http://localhost:5254"
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    if (!config.headers) config.headers = {} as any;
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
