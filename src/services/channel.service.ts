import axiosInstance from '../axios';
import { IResponse } from '../types/util.type';

export async function checkChannelExistence(name: string) {
  try {
    const res = await axiosInstance.get(`/channels/${name}/exist`);
    const data = res.data as IResponse<{ exist: boolean }>;
    if (!data.success) {
      throw new Error(data.message);
    }
    return data;
  } catch (error: any) {
    throw new Error(error.response.message);
  }
}
