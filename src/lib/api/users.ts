import { AxiosResponse } from 'axios';
import * as api from '.';

export const getUserProfile = (
  userId: string,
  controller?: AbortController,
): Promise<AxiosResponse<UserProfile>> => {
  return api.request(
    {
      url: `/user-profile/?userId=${userId}`,
    },
    controller,
  );
};

// export const createProfile = (
//   data: CreateArtworkParams,
//   controller?: AbortController,
// ): Promise<AxiosResponse<ArtworkResponse>> => {
//   return api.request(
//     {
//       url: '/user-profile/create',
//       data,
//       method: 'post',
//     },
//     controller,
//   );
// };

// export const updateProfile = (
//   data: UpdateArtworkParams,
//   artworkId: string,
//   controller?: AbortController,
// ): Promise<AxiosResponse<ArtworkResponse>> => {
//   return api.request(
//     {
//       url: `/user-profile/update?id=${artworkId}`,
//       data,
//       method: 'put',
//     },
//     controller,
//   );
// };
