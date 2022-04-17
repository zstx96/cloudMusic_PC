import { AreaEnum, ArtistEnum } from "@/interface";
import Service from "@/utils/Service";
/*
 * @作者: zhao
 * @Date: 2021-12-07 11:07:21
 * @上次更新作者: your name
 * @上次更新时间: Do not edit
 * @描述: file content
 */

/**
 * @description: 获取歌手部分信息和热门歌曲
 * @param {number} id
 * @return {*}
 */
export function getArtistInfo(id: number) {
  return Service.get(`/artists?id=${id}`);
}
/**
 * @description: 获取歌手mv信息，具体mv播放地址调用 /mv 传入此接口获得的mvid
 * @param {number} id
 * @return {*}
 */
export function getArtistMv(id: number) {
  return Service.get(`/artist/mv?id=${id}`);
}
export function getArtistAlbum(id: number) {
  return Service.get(`/artist/album?id=${id}`);
}
export function getArtistDesc(id: number) {
  return Service.get(`/artist/desc?id=${id}`);
}
export function getArtistDetail(id: number) {
  return Service.get(`/artist/detail?id=${id}`);
}
export function getArtistSimile(id: number) {
  return Service.get(`/simi/artist?id=${id}`);
}
/**
 * @param  {ArtistEnum} type
 * @param  {AreaEnum} area
 * @param  {} initial 0=#,-1=all 排序 exp: initial=b  将以name字段为b开头排序队列
 * @param  {} limit=30
 * @param  {} offset=0
 */
export function getArtistList(
  type: number,
  area: number,
  initial = -1,
  offset = 0,
  limit = 30,
) {
  return Service.get("/artist/list", {
    params: {
      type,
      area,
      initial,
      limit,
      offset,
    },
  });
}
