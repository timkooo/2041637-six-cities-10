import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';
import { getToken } from './token';
import history from '../browser-history';
import { AppRoutes } from '../const';

const SERVER_URL = 'https://10.react.pages.academy/six-cities';
const TIMEOUT = 5000;

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true,
};

const shouldDisplayError = (response: AxiosResponse) =>
  !!StatusCodeMapping[response.status];

export const api: AxiosInstance = axios.create({
  baseURL: SERVER_URL,
  timeout: TIMEOUT,
});

api.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = getToken();

  if (token) {
    config.headers['x-token'] = token;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response && shouldDisplayError(error.response)) {
      toast.warn(error.response.data.error);
    }
    if (error.response && error.response.status === 404) {
      history.replace(AppRoutes.PageNotFound);
    }
    throw error;
  }
);
