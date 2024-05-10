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

// export const updateUserProfile = (
//   data: CreateUserProfileParams,
//   artworkId: string,
//   controller?: AbortController,
// ): Promise<AxiosResponse<UserProfileResponse>> => {
//   return api.request(
//     {
//       url: `/user-profile/update?id=${artworkId}`,
//       data,
//       method: 'put',
//     },
//     controller,
//   );
// };
