import { Banner } from '@/interface/interface'
import Service from '@/utils/Service'

export function homePage() {
	;('')
}

export function getBanners() {
	return Service.get<{ banners: Banner[] }>('/banner?type=2')
}
export function getDragonBalls() {
	return Service.get('/homepage/dragon/ball')
}
export enum LikeResourceType {
	mv = 1,
	电台 = 4,
	视频 = 5,
	动态 = 6,
}
export function resourceLike(id: number, t: boolean, type: LikeResourceType) {
	return Service.get('/resource/like', {
		params: {
			id: id,
			t: t,
			type: 1,
			timestamp: +new Date(),
		},
	})
}
