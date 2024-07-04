import { AxiosResponse } from 'axios';
import * as api from '.';

export const getAllArtworks = (
  data: GetAllArtworksParams,
  controller?: AbortController,
): Promise<AxiosResponse<ArtworkResponse[]>> => {
  return api.request(
    {
      url: '/artworks/all',
      method: 'post',
      data,
    },
    controller,
  );
};

export const getUserArtworks = (
  data: GetUserArtworksParams,
  controller?: AbortController,
): Promise<AxiosResponse<ArtworkResponse[]>> => {
  return api.request(
    {
      url: '/artworks/user-artworks',
      method: 'post',
      data,
    },
    controller,
  );
};

export const createArtwork = (
  data: CreateArtworkParams,
  controller?: AbortController,
): Promise<AxiosResponse<ArtworkResponse>> => {
  return api.request(
    {
      url: '/artworks/create',
      data,
      method: 'post',
    },
    controller,
  );
};

export const updateArtwork = (
  data: UpdateArtworkParams,
  artworkId: string,
  controller?: AbortController,
): Promise<AxiosResponse<ArtworkResponse>> => {
  return api.request(
    {
      url: `/artworks/update?id=${artworkId}`,
      data,
      method: 'put',
    },
    controller,
  );
};

export const deleteArtwork = (
  artworkId: string,
  controller?: AbortController,
): Promise<AxiosResponse<boolean>> => {
  return api.request(
    {
      url: `/artworks/delete?id=${artworkId}`,
      method: 'delete',
    },
    controller,
  );
};

const staticUsersUrl = 'http://localhost:9000/users';
const staticCacheUrl = 'http://localhost:9000/cache';

export const getImageUrl = (img?: string, folder?: string) => {
  if (img && folder) {
    return `${staticUsersUrl}${'/' + folder}/${img}`;
  } else if (img) {
    return `${staticCacheUrl}/${img}`;
  } else {
    return '';
  }
};

export const artworkLikes = (
  artworkId: string,
  controller?: AbortController,
): Promise<AxiosResponse<ArtworkLike[]>> => {
  return api.request(
    {
      url: `/artwork-likes/artwork?artworkId=${artworkId}`,
    },
    controller,
  );
};

export const userArtworksLikes = (
  data: UserArtworkLikeParams,
  controller?: AbortController,
): Promise<AxiosResponse<UserArtworkLikeResponse[]>> => {
  return api.request(
    {
      method: 'post',
      url: `/artwork-likes/user`,
      data: data,
    },
    controller,
  );
};

export const artworkLikesCount = (
  artworkId: string,
  controller?: AbortController,
): Promise<AxiosResponse<number>> => {
  return api.request(
    {
      url: `/artwork-likes/count?artworkId=${artworkId}`,
    },
    controller,
  );
};

export const userArtworksLikesCount = (
  userId: string,
  controller?: AbortController,
): Promise<AxiosResponse<number>> => {
  return api.request(
    {
      url: `/artwork-likes/count/user?userId=${userId}`,
    },
    controller,
  );
};

export const checkArtworkLike = (
  artworkId: string,
  userId: string,
  controller?: AbortController,
): Promise<AxiosResponse<boolean>> => {
  return api.request(
    {
      url: `/artwork-likes/check?artworkId=${artworkId}&userId=${userId}`,
    },
    controller,
  );
};

export const artworkLike = (
  artworkId: string,
  controller?: AbortController,
): Promise<AxiosResponse<boolean>> => {
  return api.request(
    {
      url: `/artwork-likes/like?artworkId=${artworkId}`,
      method: 'post',
    },
    controller,
  );
};

export const artworkDislike = (
  artworkId: string,
  controller?: AbortController,
): Promise<AxiosResponse<boolean>> => {
  return api.request(
    {
      url: `/artwork-likes/dislike?artworkId=${artworkId}`,
      method: 'post',
    },
    controller,
  );
};
