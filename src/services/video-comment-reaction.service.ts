import axiosInstance from '../axios';
import { IResponse } from '../types/util.type';
import { EVideoReactionType, IVideoReaction } from '../types/video-reaction.type';

export async function switchVideoCommentReaction(payload: {
  commentId: string;
  type: EVideoReactionType | null;
}) {
  try {
    const res = await axiosInstance.post('/video-comment-reactions', payload);
    const data = res.data as IResponse<IVideoReaction>;
    if (!data.success) {
      throw new Error(data.message);
    }
    return data;
  } catch (error: any) {
    throw new Error(error.response.message);
  }
}
