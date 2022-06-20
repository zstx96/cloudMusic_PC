import { Song } from '@/interface/interface'
import { useToggle } from '@vueuse/core'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRecordStore } from './recordStore'

// const currentSong = useLocalStorage<Song>('lastSong',null)
const lastSong = JSON.parse(localStorage.getItem('lastSong') || 'null')

const usePlayerStore = defineStore('player', () => {
	const recordStore = useRecordStore()

	const currentSong = ref<Song | undefined>(lastSong)
	const mp = ref<HTMLAudioElement>()
	const currentTime = ref()
	const isPaused = ref(true)

	const togglePaused = useToggle(isPaused)

	const play = () => {
		if (mp.value?.paused) {
			mp.value.play()
			togglePaused()
		}
	}
	const pause = () => {
		if (!mp.value?.paused) {
			mp.value?.pause()
			togglePaused()
		}
	}
	const next = () => {
		const index = recordStore.curSongIndex + 1
		const song = recordStore.playRecord[index]
		if (song) {
			setCurrentSong(song)
			recordStore.setCurSongIndex(index)
		} else {
			ElMessage.info('到底了')
		}
	}

	const initPlayer = (value: HTMLAudioElement | undefined) => {
		mp.value = value
	}
	const setCurrentSong = (value: Song | undefined) => {
		currentSong.value = value
	}
	const setCurrentTime = (v: number) => {
		currentTime.value = v
	}
	return {
		mp,
		currentSong,
		currentTime,
		setCurrentTime,
		initPlayer,
		setCurrentSong,
		isPaused,
		play,
		pause,
		next,
	}
})
export { usePlayerStore }
