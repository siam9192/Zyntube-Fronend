import { IUser } from './user.type';

export interface ISession {
  id: string;
  sessionToken: string;
  device: string;
  browser: string;
  ip: string;
  userId: string;
  user: IUser;
  expires: string | Date;
  updatedAt: string | Date;
  createdAt: string | Date;
}
