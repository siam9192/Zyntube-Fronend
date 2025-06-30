import { formatParamsToString } from '../../../helpers';
import { IParam, IResponse } from '../../../types/util.type';
import { IVideo, IWatchVideo } from '../../../types/video.type';
import { baseApi } from '../../api/baseApi';
const videoApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getMyVideos: builder.query({
      query: (params: IParam[]) => ({
        url: `/videos/my${formatParamsToString(params)}`,
        method: 'GET',
      }),
      transformResponse: (response: IResponse<IVideo[]>) => {
        return response;
      },
      providesTags: ['my-videos'],
    }),
    getMyVideoById: builder.query({
      query: (id: string) => ({
        url: `/videos/my/${id}`,
        method: 'GET',
      }),
      transformResponse: (response: IResponse<IVideo>) => {
        return response;
      },
    }),
    getHomeFeedVideos: builder.query({
      query: (params: IParam[]) => ({
        url: `/videos/home-feed${formatParamsToString(params)}`,
        method: 'GET',
      }),
      transformResponse: (response: IResponse<IVideo[]>) => {
        return response;
      },
    }),
    getWatchVideo: builder.query({
      query: (id: string) => ({
        url: `/videos/watch/${id}`,
        method: 'GET',
      }),
      transformResponse: (response: IResponse<IWatchVideo>) => {
        return response;
      },
    }),
    getRelatedVideos: builder.query({
      query: (id: string) => ({
        url: `/videos/related/${id}`,
        method: 'GET',
      }),
      transformResponse: (response: IResponse<IWatchVideo[]>) => {
        return response;
      },
    }),
  }),
});

export const {
  useGetMyVideosQuery,
  useGetMyVideoByIdQuery,
  useGetHomeFeedVideosQuery,
  useGetWatchVideoQuery,
  useGetRelatedVideosQuery,
} = videoApi;
