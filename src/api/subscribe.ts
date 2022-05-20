import { SubScribeType } from '@/enum'
import Service from '@/utils/Service'

/**
 *@param {1|2} t 1是收藏，2是取消收藏
 */
export function updateSubscribe(type: SubScribeType, id: number, t: 1 | 2 = 1) {
	switch (type) {
		case SubScribeType.playlist:
			return Service.get('/playlist/subscribe', { params: { id, t } })
		case SubScribeType.mv:
			return Service.get('/mv/sub', { params: { id, t } })
	}
}
