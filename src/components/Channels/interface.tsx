export enum ChannelStatus {
  PUBLIC = "PUBLIC",
  PROTECTED = "PROTECTED",
  PRIVATE = "PRIVATE",
}

export interface ChannelsInfo {
  id: number;
  title: string;
  owner: any;
  nickname: string;
  status: ChannelStatus;
  createdAt: string;
  updatedAt: string;
}
