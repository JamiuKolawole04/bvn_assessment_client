import axios from "axios";

const instance = axios.create({
  //   baseURL: "https://bvn-assessment.vercel.app/api", // production base url
  baseURL: "http://localhost:8000", // default base url
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
