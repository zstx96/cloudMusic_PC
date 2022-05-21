import type { Song } from '@/interface'
import Dexie from 'dexie'

interface DBTableSong {
	id: number
	detail: Song
	privileges: Song['privilege']
	updateTime: number
}
interface DBTableLyric {
	id: number
	lyric: string
	updateTime: number
}

export class MusicDb extends Dexie {
	public songs!: Dexie.Table<DBTableSong, number>
	public lyric!: Dexie.Table<DBTableLyric, number>

	constructor() {
		super('MusicDb')
		this.version(2).stores({
			songs: '&id,updateTime',
			lyric: '&id,updateTime',
		})
		this.songs = this.table('songs')
		this.lyric = this.table('lyric')
	}
}

const db = new MusicDb()

// song cache
export function cacheSong(song: Song, privilege: any) {
	db.songs.put({
		id: song.id,
		detail: song,
		privileges: privilege,
		updateTime: Date.now(),
	})
}
export function getSongDetailFromCache(ids: number[]): Promise<Song[]> {
	return new Promise((resolve, reject) => {
		db.songs
			.filter((song) => ids.includes(song.id))
			.toArray()
			.then((songs) => {
				resolve(songs.map((song) => song.detail))
			})
	})
}

// lyric cache
export function cacheLyric(id: number, lyric: string) {
	db.lyric.put({
		id,
		lyric,
		updateTime: Date.now(),
	})
}
export function getLyricFromCache(id: number): Promise<string | undefined> {
	return new Promise((resolve, reject) => {
		db.lyric.get(id).then((lyric) => resolve(lyric?.lyric))
	})
}

// clear cache
export function clearDB() {
	return new Promise<void>((resolve) => {
		db.tables.forEach(function (table) {
			table.clear()
		})
		resolve()
	})
}
