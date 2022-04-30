/*
 * @作者: zhao
 * @Date: 2022-03-17 12:44:33
 * @上次更新作者: your name
 * @上次更新时间: Do not edit
 * @描述: file content
 */
/*
 * @作者: zhao
 * @Date: 2021-12-05 11:13:29
 * @上次更新作者: your name
 * @上次更新时间: Do not edit
 * @描述: file content
 */

import { Fee } from '../enum'
import type { User, UserProfile } from './user'

export interface Album {
  id: number;
  name: string;
  picUrl: string;
  publishTime: number;
}
export interface Song {
  id: number;
  name: string;
  reason: string;
  al: Album;
  ar: Artist[];
  publishTime: number;
  play?: boolean;
  isLiked?: boolean;
  dt: number;
  fee: Fee,
  copyright: number
}

export interface SongRecord {
  id: number;
  name: string;
  url: string;
  picUrl: string
}
export interface Playlist {
  picUrl: string;
  creator: Creator;
  id: number;
  playcount: number;
  playCount: number;
  name: string;
  copywriter: string;
  createTime: number;
  userId: number;
  trackCount: number;
  coverImgUrl?: string
}
export interface PlaylistDetail {
  id: number;
  name: string;
  coverImgUrl: string;
  userId: number;
  createTime: number;
  creator: Creator;
  updateTime: number;
  trackCount: number;
  playCount: number;
  subscribedCount: number;
  description: string;
  tags: string[];
  updateFrequency: string;
  backgroundCoverUrl: string;
  titleImage: number;
  enlistTitle: string;
  subscribers: [];
  tracks: Song[];
}
export interface PlaylistDynamic {
  bookedCount: number;
  commentCount: number;
  followed: false;
  playCount: number;
  remarkName: string;
  sharedCount: number;
  subscribed: false;
}
export interface Subscriber {
  userId: number;
  nickname: string;
  avatarURl: string;
  backgroundUrl: string;
  city: number;
  signature: string;
}
export interface Artist {
  albumSize: number;
  alias: string[];
  fansCount: number;
  followed: boolean;
  id: number;
  img1v1Url: string;
  musicSize: number;
  name: string;
  picUrl: string;
  mvSize?: number;
}
export interface Creator {
  description: string;
  detailDescription: string;
  backgroundUrl: string;
  avatarUrl: string;
  nickname: string;
  signature: string;
  followed: boolean;
  defaultAvatar: boolean;
  userId: number;
}
export interface Songlist {
  coverImgUrl: string;
  creator: Creator;
  id: number;
  name: string;
  ordered: boolean;
  playCount: number;
  trackUpdateTime: number;
  updateTime: number;
  userId: number;
}

export interface Banner {
  pic: string;
  typeTitle: string;
  titleColor: string;
  url: string;
  song?: Song;
  bannerId: number;
}

export interface DragonBall {
  id: number;
  name: string;
  iconUrl: string;
  url: string;
  skinSupport: boolean;
}
export interface Tab {
  name: string;
  iconUrl: string;
  path: string;
}
export interface Comment {
  beReplied: Reply[];
  commentId: number;
  content: string;
  liked: boolean;
  likedCount: number;
  needDisplayTime: true;
  parentCommentId: number;
  time: number;
  timeStr: string;
  user: UserProfile;
}

export interface CommentRes {
  commentsTitle: string,
  comments: Comment[],
  currentCommentTitle: string,
  currentComment: null,
  totalCount: number,
  cursor: string,
  sortTypeList: { sortType: number, sortTypeName: string }[]
}
export interface Reply {
  beRepliedCommentId: number;
  content: string;
  user: UserProfile;
}

export type Mv = Record<'id' | 'status' | 'duration' | 'playCount' | 'subCount' | 'shareCount' | 'commentCount', number> &
  Record<'artistName' | 'publishTime' | 'imgurl' | 'imgurl16v9' | 'name', string> &
  Record<'artists', { id: number, name: string, img1v1Url: string, followed: boolean }[]>
let mv: Mv