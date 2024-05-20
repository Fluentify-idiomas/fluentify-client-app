import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://api.fluentify.net.br",
  // baseURL: 'http://127.0.1:5000',
  timeout: 5000,
});
