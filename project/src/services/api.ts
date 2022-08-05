import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { getToken } from './token';

const SERVER_URL = 'https://10.react.pages.academy/six-cities';
const TIMEOUT = 5000;

export const api: AxiosInstance = axios.create({
  baseURL: SERVER_URL,
  timeout: TIMEOUT,
});

api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = getToken();

    if (token) {
      config.headers['x-token'] = token;
    }

    return config;
  },
);
