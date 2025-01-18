import axios from "axios";

const baseURL = "http://localhost:3001";

export const instance = axios.create({
  baseURL,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
});
