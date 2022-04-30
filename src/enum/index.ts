/*
 * @作者: zhao
 * @Date: 2022-03-17 12:44:26
 * @上次更新作者: your name
 * @上次更新时间: Do not edit
 * @描述: file content
 */
export enum ArtistType {
  all = -1,
  male = 1,
  female = 2,
  band = 3,
} // 1.这样写奇奇怪怪的
// Object.values(ArtistEnum).filter((v) => typeof v !== "number"); // 2.无序
// 3.还是全手写
export enum AreaType {
  all = -1,
  CN = 7,
  EU = 96,
  JP = 8,
  KR = 16,
  other = 0,
}

export enum Fee {
  free = 0,
  vip = 1 << 0,
  album = 1 << 2,
  low = 1 << 3,
  sing = Fee.vip | Fee.low,
}

export enum SourceEnum {
  song = 0,
  mv,
  playlist,
  album,
  radio,
  video,
  dynamic,
}

export enum SearchType {
  song = 1,
  album = 10,
  artist = 100,
  playlist = 1000,
  user = 1002,
  mv = 1004,
  lyric = 1006,
  radio = 1009,
  video = 1014,
  all = 1018,
  voice = 2000
}