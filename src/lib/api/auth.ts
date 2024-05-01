import { AxiosResponse } from 'axios';
import * as api from '.';

export const signIn = (
  data: SignInParams,
  controller: AbortController,
): Promise<AxiosResponse<AuthResponse>> => {
  return api.request(
    {
      url: '/auth/login',
      data,
      method: 'post',
    },
    controller,
  );
};

export const signUp = (
  data: SignInParams,
  controller: AbortController,
): Promise<AxiosResponse<AuthResponse>> => {
  return api.request(
    {
      url: '/auth/register',
      data,
      method: 'post',
    },
    controller,
  );
};

export const signOut = (
  controller?: AbortController,
): Promise<AxiosResponse<boolean>> => {
  return api.request({ url: '/auth/logout' }, controller);
};

export const getUsers = (controller?: AbortController) => {
  return api.request({ url: '/users' }, controller);
};

export const refreshToken = (
  controller?: AbortController,
): Promise<AxiosResponse<AuthResponse>> => {
  return api.reqWithoutInterceptor({ url: '/auth/refresh' }, controller);
};
