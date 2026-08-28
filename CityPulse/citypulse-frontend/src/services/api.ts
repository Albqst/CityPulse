import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5254/api", // твой ASP.NET Core backend
});

// автоматически добавляем JWT токен
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
