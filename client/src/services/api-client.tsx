import axios, { CanceledError } from "axios";

const baseURL = "http://localhost:3001";

export { CanceledError };
export const apiClient = axios.create({
  baseURL,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
});
