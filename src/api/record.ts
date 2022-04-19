import type { Song } from "@/interface/interface";
import Service from "@/utils/Service";

export function getRecentSong(limit = 100) {
    return Service.get<{
        data: {
            total: number,
            list: {
                resourceId: string,
                playTime: number,
                resourceType: "SONG",
                data: Song
            }[]
        }
    }>('/record/recent/song?limit=' + limit)
}
export function getRecentVideo(limit = 100) {
    return Service.get('/record/recent/video?limit=' + limit)
}
export function getRecentVoice(limit = 100) {
    return Service.get('/record/recent/voice?limit=' + limit)
}
export function getRecentPlaylist(limit = 100) {
    return Service.get('/record/recent/voice?limit=' + limit)
}
export function getRecentAlbum(limit = 100) {
    return Service.get('/record/recent/album?limit=' + limit)
}
export function getRecentDj(limit = 100) {
    return Service.get('/record/recent/dj?limit=' + limit)
}