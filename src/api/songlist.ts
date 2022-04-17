/*
 * @作者: zhao
 * @Date: 2021-12-04 11:47:04
 * @上次更新作者: your name
 * @上次更新时间: Do not edit
 * @描述: file content
 */
import { Service } from "@/utils/Service";
export function getPlaylist(uid: number) {
  return Service.get("/user/playlist", {
    params: {
      uid: uid,
    },
  });
}
export function getLikelist(uid: number) {
  return Service.get("/likelist?uid=" + uid);
}
export function recommendSongList() {
  return Service.get("/personalized");
}
export function getPlaylistDetail(id: number) {
  return Service.get(`/playlist/detail?id=${id}`);
}
export function getDailyPlaylist() {
  return Service.get("/recommend/resource");
}
export function getDailyPlaylistDynamic(id: number) {
  return Service.get(`/playlist/detail/dynamic?id=${id}`);
}
/**
 * @param  {number} id
 * @param  {number} limit=20
 * @param  {number} offset=1
 * @param  {number} before
 */
export function getPlaylistComment(
  id: number,
  limit = 20,
  offset = 1,
  before: number
) {
  return Service.get("/comment/playlist", {
    params: {
      id,
      offset,
      limit,
    },
  });
}
