import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3003",
});

export default axiosClient;
