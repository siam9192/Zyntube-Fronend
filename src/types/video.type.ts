import { IChannel } from './channel.type';
import { EVideoReactionType } from './video-reaction.type';

export enum EVideoPrivacy {
  PRIVATE = 'PRIVATE',
  PUBLIC = 'PUBLIC',
}

export interface IVideo {
  id: string;
  channelId: string;
  channel: IChannel;
  title: string;
  description?: string;
  resolutionTier: string;
  duration: number;
  aspectRatio: string;
  media: TVideoMedia;
  state: TVideoState;
  status: EVideoStatus;
  setting: TVideoSetting;
  createdAt: string;
  updatedAt: string;
}

export type TVideoState = {
  videoId: string;
  viewsCount: number;
  likesCount: number;
  dislikesCount: number;
};

export type TVideoSetting = {
  videoId: string;
  disableComments: boolean;
  commentAudience: ECommentAudience;
  disableLikes: boolean;
  disableSharing: boolean;
  privacy: EVideoPrivacy;
  createdAt: Date;
  updatedAt: Date;
};

export type TVideoMedia = {
  videoId: string;
  muxAssetId?: string;
  muxPlaybackId: string;
  imagekitId: string;
  videoUrl: string;
  thumbnailUrl: string;
};

export enum ECommentAudience {
  EVERYONE = 'EVERYONE',
  SUBSCRIBERS = 'SUBSCRIBERS',
  NONE = 'NONE',
}

export enum EVideoStatus {
  PROCESSING = 'PROCESSING',
  UPLOADED = 'UPLOADED',
  UPLOAD_FAILED = 'UPLOAD_FAILED',
  BLOCKED = 'BLOCKED',
}

export interface IWatchVideo extends IVideo {
  reactionType: EVideoReactionType;
  isSubscriber: boolean;
  isSaved: boolean;
}
