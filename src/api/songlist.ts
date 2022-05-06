import type { Playlist, PlaylistDetail } from '@/interface/interface'
import Service from '@/utils/Service'
export function getPlaylist(uid: number) {
	return Service.get<{
		playlist: Playlist[]
		more: boolean
	}>('/user/playlist', {
		params: {
			uid: uid,
		},
	})
}
export function getLikelist(uid: number) {
	return Service.get<{ ids: number[] }>(
		'/likelist?uid=' + uid + '?timeStamp=' + Date().valueOf()
	)
}
export function getRecommendSongList() {
	return Service.get('/personalized')
}
let controller: AbortController
export { controller }
export function getPlaylistDetail(id: number) {
	controller = new AbortController()
	return Service.get<{ playlist: PlaylistDetail }>(
		`/playlist/detail?id=${id}`,
		{ signal: controller.signal }
	)
}
export function getDailyPlaylist() {
	return Service.get<{ recommend: Playlist[] }>('/recommend/resource')
}
export function getDailyPlaylistDynamic(id: number) {
	return Service.get(`/playlist/detail/dynamic?id=${id}`)
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
	return Service.get('/comment/playlist', {
		params: {
			id,
			offset,
			limit,
		},
	})
}

export function getTopList() {
	return Service.get<{ list: Playlist[] }>('/toplist')
}
export function getHighQualityTags() {
	return Service.get<{
		tags: {
			name: string
			id: number
			hot: boolean
			category: number
			type: number
		}[]
	}>('/playlist/highquality/tags')
}
export function getHigQualityPlaylist(
	cat: string,
	before?: number,
	limit?: number
) {
	return Service.get<{
		lasttime: number
		more: boolean
		playlists: Playlist[]
		total: number
	}>('/top/playlist/highquality', {
		params: {
			cat,
			before,
			limit,
		},
	})
}
export function getPlaylistCategory() {
	return Service.get('/playlist/catlist')
}
