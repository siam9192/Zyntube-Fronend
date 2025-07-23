import { IPublicChannel } from '../../../types/channel.type';
import { IResponse } from '../../../types/util.type';
import { baseApi } from '../../api/baseApi';
const channelApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getPublicChannel: builder.query({
      query: (uniqueName: string) => ({
        url: `/channels/public/${uniqueName}`,
        method: 'GET',
      }),
      transformResponse: (response: IResponse<IPublicChannel>) => {
        return response;
      },
    }),
  }),
});

export const { useGetPublicChannelQuery } = channelApi;
