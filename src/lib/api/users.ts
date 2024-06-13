import { AxiosResponse } from 'axios';
import * as api from '.';

export const getUserProfile = (
  userId: string,
  controller?: AbortController,
): Promise<AxiosResponse<UserProfileResponse>> => {
  return api.request(
    {
      url: `/user-profile/?userId=${userId}`,
    },
    controller,
  );
};

export const updateLoginData = (
  data: Partial<SignInParams>,
  controller?: AbortController,
) => {
  return api.request(
    {
      url: '/users',
      data,
      method: 'patch',
    },
    controller,
  );
};

export const createUserProfile = (
  data: CreateUserProfileParams,
  controller?: AbortController,
): Promise<AxiosResponse<UserProfileResponse>> => {
  return api.request(
    {
      url: '/user-profile/create',
      data,
      method: 'post',
    },
    controller,
  );
};

export const updateUserProfile = (
  data: Partial<CreateUserProfileParams>,
  controller?: AbortController,
): Promise<AxiosResponse<UserProfileResponse>> => {
  return api.request(
    {
      url: `/user-profile/update`,
      data,
      method: 'patch',
    },
    controller,
  );
};

export const followUser = (
  followId: string,
  controller?: AbortController,
): Promise<AxiosResponse<UserFollow>> => {
  return api.request(
    {
      url: `/user-follows/follow?followId=${followId}`,
      method: 'post',
    },
    controller,
  );
};

export const unFollowUser = (
  followId: string,
  controller?: AbortController,
): Promise<AxiosResponse<boolean>> => {
  return api.request(
    {
      url: `/user-follows/unfollow?followId=${followId}`,
      method: 'post',
    },
    controller,
  );
};

export const userFollows = (
  userId: string,
  controller?: AbortController,
): Promise<AxiosResponse<FollowResponse[]>> => {
  return api.request(
    {
      url: `/user-follows/user-follows?userId=${userId}`,
    },
    controller,
  );
};

export const userFollowers = (
  userId: string,
  controller?: AbortController,
): Promise<AxiosResponse<FollowResponse[]>> => {
  return api.request(
    {
      url: `/user-follows/user-followers?userId=${userId}`,
    },
    controller,
  );
};

export const checkFollow = async (
  userId: string,
  followId: string,
  controller?: AbortController,
) => {
  const follows = await userFollows(userId, controller);
  return follows.data.some((f) => f.followId === followId);
};
