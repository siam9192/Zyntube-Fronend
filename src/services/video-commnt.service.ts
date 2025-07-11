import axiosInstance from '../axios';
import { IResponse } from '../types/util.type';
import { IVideoComment } from '../types/video-comment.type';

export async function createVideoComment(payload: {
  parentId?: string;
  videoId?: string;
  content: string;
}) {
  try {
    const res = await axiosInstance.post(`/video-comments`, payload);
    const data = res.data as IResponse<IVideoComment>;
    if (!data.success) {
      throw new Error(data.message);
    }
    return data;
  } catch (error: any) {
    throw new Error(error.response.message);
  }
}

export async function deleteVideoComment(id: string) {
  try {
    const res = await axiosInstance.delete(`/video-comments/${id}`);
    const data = res.data as IResponse<null>;
    if (!data.success) {
      throw new Error(data.message);
    }
    return data;
  } catch (error: any) {
    throw new Error(error.response.message);
  }
}

export async function changeVideoCommentPinStatus(id: string, payload: { status: boolean }) {
  try {
    const res = await axiosInstance.patch(`/video-comments/change-pin-status/${id}`, payload);
    const data = res.data as IResponse<null>;
    if (!data.success) {
      throw new Error(data.message);
    }
    return data;
  } catch (error: any) {
    throw new Error(error.response.message);
  }
}

export async function updateVideoComment(id: string, payload: { content: string }) {
  try {
    const res = await axiosInstance.put(`/video-comments/${id}`, payload);
    const data = res.data as IResponse<IVideoComment>;
    if (!data.success) {
      throw new Error(data.message);
    }
    return data;
  } catch (error: any) {
    throw new Error(error.response.message);
  }
}
