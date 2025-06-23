import axiosInstance from '../axios';
import { IResponse } from '../types/util.type';

export async function postVideo(
  data: FormData,
  onUploadProgress: (progress: number) => void | any,
) {
  try {
    const res = await axiosInstance.post('/videos/upload', data, {
      onUploadProgress: progressEvent => {
        const total = progressEvent.total;
        let progress;
        if (!total) {
          progress = 0;
        } else {
          progress = Math.round((progressEvent.loaded * 100) / total);
        }

        onUploadProgress(progress);
      },
    });
    return res.data as IResponse<null>;
  } catch (error: any) {
    throw new Error(error.response.message);
  }
}
