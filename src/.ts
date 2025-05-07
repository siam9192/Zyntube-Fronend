interface IUser {
  id: string;
  email: string;
  lastLoginAt: string;
  status: TUserStatus;
}

export type TUserStatus = `${EUserStatus}`;

export enum EUserStatus {
  ACTIVE = 'active',
  blocked = 'blocked',
}

export interface IChannel {
  name: string;
  uniqueName: string;
  profilePhotoUrl?: string;
  coverPhotoUrl?: string;
  about?: string;
  count: {
    videos: number;
    subscriber: number;
    views: number;
  };
  status: TChannelStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type TChannelStatus = `${EChannelStatus}`;

export enum EChannelStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
  ARCHIVED = 'archived',
  DELETED = 'deleted',
  SUSPENDED = 'suspended',
}

export interface IVideo {
  id: string;
  muxId: string;
  title: string;
  description?: string;
  thumbnail: string;
  count: {
    likes: number;
    dislikes: number;
    views: number;
  };
  status: TVideoStatus;
  privacy: EVideoPrivacy;
  createdAt: Date;
  updatedAt: Date;
}

export type TVideoStatus = `${EVideoStatus}`;
export type TVideoPrivacy = `${EVideoPrivacy}`;
export enum EVideoPrivacy {
  PUBLIC = 'public', // Visible to everyone
  PRIVATE = 'private', // Only visible to the owner
}

export enum EVideoStatus {
  DRAFT = 'draft', // Not published yet
  PROCESSING = 'processing', // Video is being processed (e.g., after upload),
  PUBLISHED = 'published',
  FAILED = 'failed', // Processing/upload failed
  DELETED = 'deleted', // Removed by user or system
  REJECTED = 'rejected', // Blocked due to policy violation
}

export interface IVideoReaction {
  id: string;
  userId: string;
  videoId: string;
  type: 'like' | 'dislike';
  createdAt: Date;
  updatedAt: Date;
}

export interface Subscription {
  id: string;
  subscriberId: string;
  channelId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IWatchHistory {
  id: string;
  userId: string;
  videoId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISavedVideo {
  id: string;
  userId: string;
  videoId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPlaylist {
  id: string;
  name: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPlaylist {
  id: string;
  name: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IVideoComment {
  id: string;
  userId: string;
  videoId: string;
  comment: string;
  parentId: string;
  status: TVideoCommentStatus;
  createdAt: Date;
  updatedAt: Date;
  count: {
    like: number;
    dislike: number;
    replay: number;
  };
}

export interface IVideoCommentReaction {
  id: string;
  userId: string;
  commentId: string;
  type: 'like' | 'dislike';
  createdAt: Date;
  updatedAt: Date;
  count: {
    like: number;
    dislike: number;
  };
}

export type TVideoCommentStatus = `${EVideoCommentStatus}`;

export enum EVideoCommentStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}
