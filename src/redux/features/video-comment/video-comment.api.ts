import { formatParamsToString } from '../../../helpers';
import { IParam, IResponse } from '../../../types/util.type';
import { IVideoComment, IVideoCommentPublic } from '../../../types/video-comment.type';
import { baseApi } from '../../api/baseApi';
const videoApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createVideoComment: builder.mutation({
      query: payload => ({
        url: `/video-comments`,
        method: 'POST',
        body: payload,
      }),
      transformResponse: (response: IResponse<IVideoComment>) => {
        return response;
      },
      // invalidatesTags: ['video-comments'],
    }),
    getVideoComments: builder.query({
      query: (data: { params: IParam[]; videoId: string }) => ({
        url: `/video-comments/video/${data.videoId}${formatParamsToString(data.params)}`,
        method: 'GET',
      }),
      transformResponse: (response: IResponse<IVideoCommentPublic[]>) => {
        return response;
      },
      providesTags: ['video-comments'],
    }),
    getVideoCommentAllReplies: builder.query({
      query: (id: string) => ({
        url: `/video-comments/${id}/replies`,
        method: 'GET',
      }),
      transformResponse: (response: IResponse<IVideoCommentPublic[]>) => {
        return response;
      },
      providesTags: ['video-comments'],
    }),
  }),
});

export const {
  useCreateVideoCommentMutation,
  useGetVideoCommentsQuery,
  useGetVideoCommentAllRepliesQuery,
} = videoApi;
