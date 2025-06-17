import { IAppUser } from '../../../types/user.type';
import { baseApi } from '../../api/baseApi';
import { IResponse } from './util.type';

const userApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getMe: builder.mutation({
      query: payload => ({
        url: `/user/me`,
        method: 'GET',
        body: payload,
      }),
      transformResponse: (response: IResponse<IAppUser[]>) => {
        return response;
      },
    }),
  }),
});

export const {} = userApi;
