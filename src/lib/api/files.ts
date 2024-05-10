import { AxiosResponse } from 'axios';
import * as api from '.';

export const uploadImage = async (
  file: File,
  controller?: AbortController,
): Promise<AxiosResponse<UploadImageResponse>> => {
  const data = new FormData();
  data.append('file', file);
  // const a = new Promise((res) => {
  //   setTimeout(() => res('123'), 3000);
  // });
  // await a;
  return api.request(
    {
      url: '/files/upload-image',
      data,
      method: 'post',
      headers: { 'Content-Type': 'multipart/form-data' },
    },
    controller,
  );
};
