import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080", // default base url
  // baseURL: "http://localhost:5050/v1/auth",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
