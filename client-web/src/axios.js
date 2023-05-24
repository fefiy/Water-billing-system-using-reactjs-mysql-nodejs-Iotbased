import axios from "axios";

export const makeRequest = axios.create({
    baseURL: "http://localhost:3004/api/",
    withCredentials: true,
  });