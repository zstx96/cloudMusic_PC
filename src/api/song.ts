import { AreaType, IHotAlbum, SourceEnum } from '@/interface'
import type { CommentRes, Song } from '@/interface'
import Service from '@/utils/Service'
import { cacheLyric, cacheSong, getLyricFromCache, getSongDetailFromCache } from '@/utils/db'

export function getSongUrl(id: number) {
	return Service.get<{
		data: { url: string; size: number; type: string; md5: string }[]
	}>(`/song/url?id=${id}`)
}
export function getSongDownloadUrl(id: number) {
	return Service.get(`/song/download/url?id=${id}`)
}
export function checkSong(id: number) {
	return Service.get(`/check/music?id=${id}`)
}
export async function getSongLyric<
	T extends {
		lrc: { lyric: string }
	}
>(id: number): Promise<string> {
	const fetchLyric = async () => {
		const res = await Service.get<T>(`/lyric?id=${id}`)
		cacheLyric(id, res.lrc.lyric)
		return res.lrc.lyric
	}

	return getLyricFromCache(id).then((lyric) => {
		if (lyric) {
			return lyric
		} else {
			return fetchLyric()
		}
	})
}
export function getSongDetail<T extends { songs: Song[] }>(...ids: number[]) {
	const fetchSongDetail = async () => {
		const { songs } = await Service.get<T>('/song/detail', {
			params: {
				ids: ids.join(','),
			},
		})
		songs.forEach((song) => {
			cacheSong(song, null)
		})
		return { songs }
	}
	return getSongDetailFromCache(ids).then((songs) => {
		if (songs.length === ids.length) {
			return { songs }
		} else {
			return fetchSongDetail()
		}
	})
}
export function getAlbumDetail(id: number) {
	return Service.get<{
		album: IHotAlbum
		songs: Song[]
	}>(`/album?id=${id}`)
}

export function getNewSongs(type: AreaType) {
	return Service.get('/top/song', {
		params: {
			type,
		},
	})
}

/**
 * @param  {number} id
 * @param  {} sortType 排序方式, 1:按推荐排序, 2:按热度排序, 3:按时间排序
 * @param  {} pageNo 1
 * @param  {} pageSize 20
 * @param  {} type 0: 歌曲1: mv 2: 歌单 3: 专辑 4: 电台 5: 视频 6: 动态
 * @param  {} cursor 当sortType为 3 时且页数不是第一页时需传入,值为上一条数据的 time
 */
export function getComment(
	id: number,
	sortType = 1,
	type: SourceEnum = SourceEnum.song,
	pageNo = 1,
	pageSize = 20,
	cursor?: number
) {
	return Service.get<{
		data: CommentRes
	}>('/comment/new', {
		params: {
			type,
			id,
			sortType,
			cursor,
			pageSize,
			pageNo,
		},
	})
}
export function getHotComment(id: number, type = 0, limit?: any, offset?: any, before?: any) {
	return Service.get('/comment/hot', {
		params: { id, type, limit, offset, before },
	})
}
export function likeSong(id: number, like = true) {
	return Service.get('/like', {
		params: {
			id,
			like,
			timeStamp: +new Date(),
		},
	})
}
/**
 * @param  {number} cid commentId 评论id
 * @param  {number=1} t 1为点赞，0为取消
 * @param  {}  type 0: 歌曲1: mv 2: 歌单 3: 专辑 4: 电台 5: 视频 6: 动态
 */
export function likeComment(cid: number, t = 1, type = 0) {
	return Service.get('/comment/like', {
		params: {
			cid,
			t,
			type,
		},
	})
}
