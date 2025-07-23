import { formatParamsToString } from '../../../helpers';
import { IMyChannelSubscribe } from '../../../types/channel-subscribe.type';
import { IParam, IResponse } from '../../../types/util.type';
import { baseApi } from '../../api/baseApi';
const channelApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getMySubscribes: builder.query({
      query: (params:IParam[]) => ({
        url: `/channel-subscribers/subscribes/my${formatParamsToString(params)}`,
        method: 'GET',
      }),
      transformResponse: (response: IResponse<IMyChannelSubscribe[]>) => {
        return response;
      },
    }),
  }),
});

export const { useGetMySubscribesQuery} = channelApi;
