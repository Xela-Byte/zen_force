import axios from 'axios';
import {store} from '../store';
import {logout, setSessionExpired} from '../store/slices/appSlice';

export const API_URL = process.env.API_URL;

const getToken = async () => {
  const state = store.getState();

  const token =
    state.app.tempUser?.accessToken || state.app.user?.accessToken || '';
  return token;
};

const ApiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

ApiClient.interceptors.request.use(
  async config => {
    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${await getToken()}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

ApiClient.interceptors.response.use(
  response => response,
  async error => {
    const status = error?.response?.status;
    const dataString = JSON.stringify(error?.response?.data || '');
    const isTokenIssue =
      /expired|invalid/i.test(dataString) && /(token|jwt)/i.test(dataString);

    if (status === 401 && isTokenIssue) {
      store.dispatch(setSessionExpired(true));
    }

    return Promise.reject(error);
  },
);

export default ApiClient;

export const ApiFileClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-type': 'multipart/form-data',
  },
});

ApiFileClient.interceptors.request.use(
  async config => {
    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${await getToken()}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

ApiFileClient.interceptors.response.use(
  response => response,
  async error => {
    const status = error?.response?.status;
    const dataString = JSON.stringify(error?.response?.data || '');
    const isTokenIssue =
      /expired|invalid/i.test(dataString) && /(token|jwt)/i.test(dataString);

    if (status === 401 && isTokenIssue) {
      store.dispatch(setSessionExpired(true));
    }

    return Promise.reject(error);
  },
);
