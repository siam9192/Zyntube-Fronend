import { IAppUser } from './user.type';

export interface IChannel {
  id: string;
  userId: string;
  user: IAppUser;
  name: string;
  uniqueName: string;
  profilePhotoUrl: string;
  profileCoverPhotoUrl: string;
  about: string;
  viewsCount: number;
  subscribersCount: number;
  videos: [];
  status: EChannelStatus;
  updatedAt: string | Date;
  createdAt: string | Date;
}

export enum EChannelStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DELETED = 'DELETED',
  SUSPENDED = 'SUSPENDED',
}

export interface IPublicChannel
  extends Pick<
    IChannel,
    | 'id'
    | 'name'
    | 'uniqueName'
    | 'profilePhotoUrl'
    | 'profileCoverPhotoUrl'
    | 'about'
    | 'subscribersCount'
    | 'status'
    | 'updatedAt'
    | 'createdAt'
  > {
  _count: {
    subscribers: number;
    videos: number;
  };
  isSubscribed: boolean;
  isOwn: boolean;
}
