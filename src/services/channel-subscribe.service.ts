import axiosInstance from '../axios';
import { IChannelSubscriber } from '../types/channel-subscribe.type';
import { IResponse } from '../types/util.type';

export async function subscribeChannel(payload: { channelId: string }) {
  try {
    const res = await axiosInstance.post(`/channel-subscribers`, payload);
    const data = res.data as IResponse<IChannelSubscriber>;
    if (!data.success) {
      throw new Error(data.message);
    }
    return data;
  } catch (error: any) {
    throw new Error(error.response.message);
  }
}

export async function unsubscribeChannel(channelId: string) {
  try {
    const res = await axiosInstance.delete(`/channel-subscribers/${channelId}`);
    const data = res.data as IResponse<null>;
    if (!data.success) {
      throw new Error(data.message);
    }
    return data;
  } catch (error: any) {
    throw new Error(error.response.message);
  }
}
