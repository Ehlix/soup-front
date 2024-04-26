import axios, { AxiosResponse } from 'axios';
import api from '.';

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
  data?: SignInParams;
  method?: Method;
};

const request = ({ url, data, method }: Request) => {
  const controller = new AbortController();
  return api({
    method: method ?? 'get',
    url,
    data,
    signal: controller?.signal,
    withCredentials: true,
  });
};

const reqWithoutInterceptor = ({ url, data, method }: Request) => {
  const controller = new AbortController();
  return axios({
    baseURL: 'http://localhost:9000',
    method: method ?? 'get',
    url,
    data,
    signal: controller?.signal,
    withCredentials: true,
  });
};

export const signIn = (
  data: SignInParams,
): Promise<AxiosResponse<AuthResponse>> => {
  return request({
    url: '/auth/login',
    data,
    method: 'post',
  });
};

export const signUp = (
  data: SignInParams,
): Promise<AxiosResponse<AuthResponse>> => {
  return request({
    url: '/auth/register',
    data,
    method: 'post',
  });
};

export const signOut = (): Promise<AxiosResponse<boolean>> => {
  return request({ url: '/auth/logout' });
};

export const getUsers = () => {
  return request({ url: '/users' });
};

export const refreshToken = (): Promise<AxiosResponse<AuthResponse>> => {
  return reqWithoutInterceptor({ url: '/auth/refresh' });
};
