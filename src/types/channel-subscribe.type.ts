import { IChannel, IPublicChannel } from "./channel.type";
import { IUser } from "./user.type";

export interface IChannelSubscriber {
  id: string;
  channelId: string;
  channel:IChannel
  subscriberId: string;
  subscriber:IUser
  createdAt: string;
  updatedAt: string;
}


export interface IMyChannelSubscribe {
  id: string;
  channelId: string;
  channel:IPublicChannel
  subscriberId: string;
  createdAt: string;
  updatedAt: string;
}
