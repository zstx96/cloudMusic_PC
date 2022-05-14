import type { Artist, Playlist } from './interface'
export interface SearchMultiRes {
	artist: Artist[]
	new_mlog?: any[]
	orders?: []
	playlist?: Playlist[]
}
