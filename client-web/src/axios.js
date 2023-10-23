import axios from "axios";

export const makeRequest = axios.create({
    baseURL: "https://node-mysql-water.onrender.com/api/",
    withCredentials: true,
  });