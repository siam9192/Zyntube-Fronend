import { IUser } from './user.type';

export interface ISession {
  id: string;
  userId: string;
  user: IUser;
  sessionToken: string;
  browser: string;
  device: TSessionDevice;
  ip: string;
  userAgent: string;
  lastSeen: string | Date;
  updatedAt: string | Date;
  createdAt: string | Date;
}

export type TSessionDevice = {
  sessionId: string;
  session: ISession;
  name: string;
  type: EDeviceType;
  osName: string;
  osVersion: string;
};

export enum EDeviceType {
  MOBILE = 'MOBILE',
  TABLET = 'TABLET',
  DESKTOP = 'DESKTOP',
  UNKNOWN = 'UNKNOWN',
}
