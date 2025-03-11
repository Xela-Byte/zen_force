import axios from 'axios';
import {store} from '../store';

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
