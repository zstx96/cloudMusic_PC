import type { Song } from '@/interface'
import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

const searchRecord = useLocalStorage<string[]>('searchRecord', [])
const playRecord = useLocalStorage<Song[]>('playRecord', [])

const curSongIndex = useLocalStorage('curSongIndex', 0)
const useRecordStore = defineStore('record', () => {
	const isInPlayRecord = (song: Song) => {
		return playRecord.value.some((item) => item.id === song.id)
	}
	const addPlayRecord = (songs: Song[]) => {
		if (songs.length === 1) {
			if (isInPlayRecord(songs[0])) {
				const index = playRecord.value.findIndex(
					(item) => item.id === songs[0].id
				)
				playRecord.value.splice(index, 1)
			}
			playRecord.value.unshift(songs[0])
			setCurSongIndex(0)
		} else {
			songs
				.filter(
					(song) => !playRecord.value.find((v) => v.id === song.id)
				)
				.forEach((song) => playRecord.value.push(song))
		}
	}
	const clearPlayRecord = () => {
		playRecord.value = []
	}
	const removePlayRecord = (song: Song) => {
		playRecord.value = playRecord.value.filter(
			(item) => item.id !== song.id
		)
	}
	const setCurSongIndex = (index: number) => {
		curSongIndex.value = index
	}

	const clearSearchRecord = () => {
		searchRecord.value = []
		curSongIndex.value = 0
	}
	const removeSearchRecord = (word: string) => {
		const index = searchRecord.value.findIndex((v) => v === word)
		searchRecord.value.splice(index, 1)
	}
	const pushSearchRecord = (word: string) => {
		if (searchRecord.value.includes(word)) {
			searchRecord.value.splice(
				searchRecord.value.findIndex((v) => v === word),
				1
			)
			searchRecord.value.push(word)
		} else {
			searchRecord.value.push(word)
		}
	}

	return {
		searchRecord,
		clearSearchRecord,
		removeSearchRecord,
		pushSearchRecord,
		playRecord,
		addPlayRecord,
		clearPlayRecord,
		removePlayRecord,
		curSongIndex,
		setCurSongIndex,
	}
})

export { useRecordStore }
