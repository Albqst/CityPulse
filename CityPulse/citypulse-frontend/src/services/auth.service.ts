import api from "./api";

export async function login(email: string, password: string) {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  return response.data;
}

export async function register(email: string, password: string, dateOfBirth: string) {
  const response = await api.post("/auth/register", {
    email,
    password,
    dateOfBirth,
  });

  return response.data;
}
