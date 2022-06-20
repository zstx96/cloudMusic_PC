import { VideoProfile } from '@/interface'
import Service from '@/utils/Service'

export function getRecommendVideo(offset = 0) {
	return Service.get('/video/timeline/recommend?offset=' + offset)
}

export function getAllVideo(offset = 0) {
	return Service.get<{
		datas: VideoProfile[]
		msg: string
		hasmore: boolean
		rcmdLimit: number
		code: number
	}>('/video/timeline/all?offset=' + offset)
}

export function getVideoCategory(offset = 0) {
	return Service.get<{
		data: { name: string; id: number }[]
	}>('/video/category/list?offset=' + offset)
}
