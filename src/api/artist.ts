import type { ArtistType, AreaType, ArtistDetail, IArtist, IHotAlbum } from '@/interface'
import type { Artist, Mv, Song } from '@/interface/interface'
import Service from '@/utils/Service'

/**
 * @description: 获取歌手部分信息和热门歌曲
 * @param {number} id
 * @return {*}
 */
export function getArtistInfo(id: number) {
	return Service.get<{
		artist: Artist
		hotSongs: Song[]
		time: number
	}>(`/artists?id=${id}`)
}

export function getArtistTopSong(id: number) {
	return Service.get<{ code: number; more: boolean; songs: Song[] }>(`/artist/top/song?id=${id}`)
}

/**
 * @description: 获取歌手mv信息，具体mv播放地址调用 /mv 传入此接口获得的mvid
 * @param {number} id
 * @return {*}
 */
export function getArtistMv(id: number) {
	return Service.get<{
		hasMore: boolean
		mvs: Mv[]
	}>(`/artist/mv?id=${id}`)
}
type MvOrder = '上升最快' | '最热' | '最新'
export function getArtistAllMv(order: MvOrder = '上升最快', offset = 0, limit = 30) {
	return Service.get('/mv/all')
}
export function getArtistAlbum(id: number) {
	return Service.get<{
		artist: IArtist
		hotAlbums: IHotAlbum[]
		more: boolean
		code: number
	}>(`/artist/album?id=${id}`)
}
export function getArtistDesc(id: number) {
	return Service.get<{
		briefDesc: string
		count: number
		introduction: any[]
		topicData: any[]
	}>(`/artist/desc?id=${id}`)
}
export function getArtistDetail(id: number) {
	return Service.get<{ data: ArtistDetail }>(`/artist/detail?id=${id}`)
}
export function getArtistSimile(id: number) {
	return Service.get<{ artists: Artist[] }>(`/simi/artist?id=${id}`)
}
/**
 * @param  {ArtistEnum} type
 * @param  {AreaEnum} area
 * @param  {} initial 0=#,-1=all 排序 exp: initial=b  将以name字段为b开头排序队列
 * @param  {} limit=30
 * @param  {} offset=0
 */
export function getArtistList(type: ArtistType, area: AreaType, initial = -1, offset = 0, limit = 30) {
	return Service.get<{
		artists: Artist[]
	}>('/artist/list', {
		params: {
			type,
			area,
			initial,
			limit,
			offset,
		},
	})
}
