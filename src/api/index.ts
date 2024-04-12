import axios from "axios";

const baseUrl = "http://localhost:9000";

const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${lsGetToken()}`;
  return config;
});

export default api;

export const lsSetToken = (token: string) => {
  localStorage.setItem("token", token);
}

export const lsGetToken = () => {
  return localStorage.getItem("token");
}

export const lsRemoveToken = () => {
  localStorage.removeItem("token");
}
