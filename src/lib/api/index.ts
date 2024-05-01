import axios from 'axios';

const baseUrl = 'http://localhost:9000';

const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${lsGetToken()}`;
  return config;
});

type Method =
  | 'get'
  | 'post'
  | 'put'
  | 'delete'
  | 'patch'
  | 'options'
  | 'head'
  | 'trace';

type Request = {
  url: string;
  data?: Record<string, unknown>;
  method?: Method;
};

export const request = (
  { url, data, method }: Request,
  controller?: AbortController,
) => {
  return api({
    method: method ?? 'get',
    url,
    data,
    signal: controller?.signal,
    withCredentials: true,
  });
};

export const reqWithoutInterceptor = (
  { url, data, method }: Request,
  controller?: AbortController,
) => {
  return axios({
    baseURL: 'http://localhost:9000',
    method: method ?? 'get',
    url,
    data,
    signal: controller?.signal,
    withCredentials: true,
  });
};
const lsGetToken = () => {
  const lsString = localStorage.getItem('sessionData');
  if (!lsString) {
    return '';
  }
  return JSON.parse(lsString)?.data?.accessToken || '';
};
