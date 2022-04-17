import { Service } from "@/utils/Service";

/*
 * @作者: zhao
 * @Date: 2022-03-23 23:26:59
 * @上次更新作者: your name
 * @上次更新时间: Do not edit
 * @描述: file content
 */
export function getRecentSong(limit=100){
    return Service.get('/record/recent/song?limit='+limit)
}
export function getRecentVideo(limit=100){
    return Service.get('/record/recent/video?limit='+limit)
}
export function getRecentVoice(limit=100){
    return Service.get('/record/recent/voice?limit='+limit)
}
export function getRecentPlaylist(limit=100){
    return Service.get('/record/recent/voice?limit='+limit)
}
export function getRecentAlbum(limit=100){
    return Service.get('/record/recent/album?limit='+limit)
}
export function getRecentDj(limit=100){
    return Service.get('/record/recent/dj?limit='+limit)
}