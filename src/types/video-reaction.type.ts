export enum EVideoReactionType {
  LIKE = 'LIKE',
  DISLIKE = 'DISLIKE',
}

export interface IVideoReaction {
  id: string;
  type: EVideoReactionType;
  videoId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
