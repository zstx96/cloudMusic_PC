import { SearchType } from '@/enum'
import { Album, Artist, Playlist } from '@/interface'
import Service from '@/utils/Service'


export function getSearchResult<T>(keywords: string, type: SearchType, offset = 0, limit = 30): Promise<T> {
	return Service.get<T>('/cloudsearch', {
		params: {
			keywords,
			type,
			offset,
			limit
		}
	})
}
export function getHotSearch() {
	return Service.get('/search/hot')
}
export function getSearchSuggest(keywords: string) {
	return Service.get('/search/suggest', { params: { keywords, type: 'mobile' } })
}
export function getHotSearchDetail() {
	return Service.get<{ data: { searchWord: string, score: number }[] }>('/search/hot/detail')
}
// FIXME 如何声明一个拥有多个可能字符串的 Array 类型？
export type MultiMatchOrders = 'album' | 'artist' | 'playlist'
export function getMultimatch(keywords: string) {
	return Service.get<{
        result: {
            album: Album[],
            artist: Artist[],
            new_mlog: any[],
            orders: MultiMatchOrders[],
            playlist: Playlist[]
        }
    }>(`/search/multimatch?keywords=${keywords}`)
}
export function getSearchDefault() {
	return Service.get<{
        data: {
            showKeyword: string,
            realkeyword: string
        }
    }>('/search/default')
}