import { EVideoReactionType } from './video-reaction.type';

export interface IVideoComment {
  id: string;
  content: string;
  likesCount: number;
  dislikesCount: number;
  isPinned: boolean;
  isHidden: boolean;
  parentId: string | null;
  videoId: string;
  userId: string;
  replies: IVideoComment[];
  parent: IVideoComment | null;
  createdAt: string;
  updatedAt: string;
}

export interface IVideoCommentPublic
  extends Pick<
    IVideoComment,
    'id' | 'content' | 'likesCount' | 'dislikesCount' | 'isPinned' | 'isHidden' | 'createdAt'
  > {
  repliesCount: number;
  replies: IVideoCommentPublic[];
  reactionType: EVideoReactionType | null;
  isOwner: boolean;
  owner: {
    name: string;
    uniqueName: string;
    profilePhotoUrl: string;
    subscribersCount: string;
  };
}

export enum EVideoCommentReactionType {
  LIKE = 'LIKE',
  DISLIKE = 'DISLIKE',
}
