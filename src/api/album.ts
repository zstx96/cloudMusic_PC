import type { IHotAlbum, Song } from '@/interface'
import Service from '@/utils/Service'

export function getAlbumDetail(id: number) {
	return Service.get<{
		album: IHotAlbum
		songs: Song[]
	}>(`/album?id=${id}`)
}
