import { Song } from '@/interface/interface'
import { defineStore } from 'pinia'
import { ref } from 'vue'


// const currentSong = useLocalStorage<Song>('lastSong',null)
const lastSong = JSON.parse(localStorage.getItem('lastSong') || 'null')

const usePlayerStore = defineStore('player', () => {
	const currentSong = ref<Song>(lastSong)
	const mp = ref<HTMLAudioElement>()
	const initPlayer = (value: HTMLAudioElement | undefined) => {
		mp.value = value
	}
	const currentTime = ref()
	const setCurrentSong = (value: Song) => {
		currentSong.value = value
	}
	const setCurrentTime = (v: any) => {
		currentTime.value = v
	}
	return {
		mp,
		currentSong,
		currentTime,
		setCurrentTime,
		initPlayer,
		setCurrentSong

	}
})
export { usePlayerStore }