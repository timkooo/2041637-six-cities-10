import axios, { AxiosInstance } from 'axios';

const SERVER_URL = 'https://10.react.pages.academy/six-cities';
const TIMEOUT = 5000;

export const api: AxiosInstance = axios.create({
  baseURL: SERVER_URL,
  timeout: TIMEOUT,
});

