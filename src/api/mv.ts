import Service from '@/utils/Service'

export function getRecommendMv(offset = 0) {
	return Service.get('/video/timeline/recommend?offset=' + offset)
}
