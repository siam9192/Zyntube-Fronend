import { UserInfo } from 'firebase/auth';
import { IChannel } from './channel.type';
import { ISession } from './session.type';

export interface IUser {
  google: UserInfo;
  app: IAppUser;
}

export interface IAppUser {
  id: string;
  email: string;
  role: EUserRole;
  channel: IChannel;
  setupStatus: Boolean;
  lastLoginAt: string | Date;
  status: EUserStatus;
  sessions: ISession[];
  updatedAt: string | Date;
  createdAt: string | Date;
}

export enum EUserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export enum EUserStatus {
  ACTIVE = 'ACTIVE',
  BLOCKED = 'BLOCKED',
  DELETED = 'DELETED',
}

export interface ISetupProfilePayload {
  channelName: string;
  channelUniqueName: string;
  channelProfilePhotoUrl: string;
}

export interface IUpdateProfilePayload {
  channelName?: string;
  channelUniqueName?: string;
  channelProfilePhotoUrl?: string;
  channelProfileCoverPhotoUrl?: string;
  channelAbout?: string;
}
