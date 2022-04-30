import { SourceEnum } from '@/interface'
import { CommentRes, Song } from '@/interface/interface'
import Service from '@/utils/Service'
/*
 * @作者: zhao
 * @Date: 2021-12-05 13:31:57
 * @上次更新作者: your name
 * @上次更新时间: Do not edit
 * @描述: file content
 */
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
export function getSongLyric(id: number) {
	return Service.get<{ lrc: { lyric: string } }>(`/lyric?id=${id}`)
}
export function getSongDetail(id: number) {
	return Service.get<{ songs: [Song] }>('/song/detail', {
		params: {
			ids: id,
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
export function getHotComment(
	id: number,
	type = 0,
	limit?: any,
	offset?: any,
	before?: any
) {
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
