import { IAppUser } from '../../../types/user.type';
import { IResponse } from '../../../types/util.type';
import { baseApi } from '../../api/baseApi';

const userApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getMe: builder.query({
      query: () => ({
        url: `/users/me`,
        method: 'GET',
      }),
      transformResponse: (response: IResponse<IAppUser[]>) => {
        return response;
      },
    }),
    setupProfile: builder.mutation({
      query: payload => ({
        url: `/users/profile/setup`,
        method: 'POST',
        body: payload,
      }),
      transformResponse: (response: IResponse<IAppUser[]>) => {
        return response;
      },
    }),
  }),
});

export const { useGetMeQuery, useSetupProfileMutation } = userApi;
