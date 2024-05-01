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

const staticUrl = 'http://localhost:9000/users';

export const getImageUrl = (img?: string, folder?: string) => {
  if (img && folder) {
    return `${staticUrl}${'/' + folder}/${img}`;
  } else {
    return '';
  }
};
