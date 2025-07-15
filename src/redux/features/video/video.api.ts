import { formatParamsToString } from '../../../helpers';
import { IParam, IResponse } from '../../../types/util.type';
import { IPublicVideo, IVideo, IWatchVideo } from '../../../types/video.type';
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
      transformResponse: (response: IResponse<IPublicVideo[]>) => {
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
      keepUnusedDataFor: 60,
    }),
    getRelatedVideos: builder.query({
      query: (id: string) => ({
        url: `/videos/related/${id}`,
        method: 'GET',
      }),
      transformResponse: (response: IResponse<IPublicVideo[]>) => {
        return response;
      },
    }),
    getSearchVideos: builder.query({
      query: (params: IParam[]) => ({
        url: `/videos/search${formatParamsToString(params)}`,
        method: 'GET',
      }),
      transformResponse: (response: IResponse<IPublicVideo[]>) => {
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
  useGetSearchVideosQuery,
} = videoApi;
