import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://clogblog.herokuapp.com/api/v1/",
});

export default axiosInstance;
