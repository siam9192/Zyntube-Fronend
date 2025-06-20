import axios from 'axios';
import Cookies from 'js-cookie';
import envConfig from '../config/env.config';
const axiosInstance = axios.create({
  baseURL: envConfig.url.serverBase,
});

axiosInstance.interceptors.request.use(async function (config) {
  const accessToken = Cookies.get('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
    config.withCredentials = true;
  }

  return config;
});

export default axiosInstance;
