import axios from "axios";
import Cookies from "js-cookie"
import envConfig from "../config/env.config";
const axiosInstance = axios.create({
  baseURL: envConfig.serverBaseUrl,
});

axiosInstance.interceptors.request.use(async function (config) {
  const accessToken = Cookies.get("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});



export default axiosInstance;
