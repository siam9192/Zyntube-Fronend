import axiosInstance from "../axios";
import { IResponse } from "../redux/features/user/util.type";
import { IAppUser } from "../types/user.type";

export async function getMe () {
  try {
    const res = await axiosInstance.get('/users/me')
    const data =  res.data as IResponse<IAppUser>
     if(!data.success){
        throw new Error(data.message)
     }
     return data
  } catch (error:any) {
    throw new Error(error.response.message)
  }
}