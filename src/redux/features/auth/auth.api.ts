import { IAppUser } from '../../../types/user.type';
import { IResponse } from '../../../types/util.type';
import { baseApi } from '../../api/baseApi';
const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    googleCallback: builder.mutation({
      query: payload => ({
        url: `/auth/google-callback`,
        method: 'POST',
        body: payload,
      }),
      transformResponse: (response: IResponse<IAppUser[]>) => {
        return response;
      },
    }),
  }),
});

export const {} = authApi;
