import Service from '@/utils/Service'
import { AreaType } from '@/enum/index'

export function getNewSongs(type: AreaType) {
	return Service.get('/top/song', {
		params: {
			type,
		},
	})
}
