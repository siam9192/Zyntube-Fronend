import axiosInstance from '../axios';
import { IAppUser, ISetupProfilePayload, IUpdateProfilePayload } from '../types/user.type';
import { IResponse } from '../types/util.type';

export async function getMe() {
  try {
    const res = await axiosInstance.get('/users/me');
    const data = res.data as IResponse<IAppUser>;
    if (!data.success) {
      throw new Error(data.message);
    }
    return data;
  } catch (error: any) {
    throw new Error(error.response.message);
  }
}

export async function setupProfile(payload: ISetupProfilePayload) {
  try {
    const res = await axiosInstance.post('/users/profile/setup', payload);
    const data = res.data as IResponse<IAppUser>;
    if (!data.success) {
      throw new Error(data.message);
    }
    return data;
  } catch (error: any) {
    throw new Error(error.response.message);
  }
}

export async function updateProfile(payload: IUpdateProfilePayload) {
  try {
    const res = await axiosInstance.put('/users/profile', payload);
    const data = res.data as IResponse<IAppUser>;
    if (!data.success) {
      throw new Error(data.message);
    }
    return data;
  } catch (error: any) {
    throw new Error(error.response.message);
  }
}
