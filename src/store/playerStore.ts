import { getSongUrl } from "@/api/song";
import { Song } from "@/interface/interface";
import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { ref } from "vue";



// const currentSong = useLocalStorage<Song>('lastSong',null)
const lastSong = JSON.parse(localStorage.getItem('lastSong') || 'null')
const currentSong = ref<Song>(lastSong)
window.onbeforeunload = () => {
    localStorage.setItem('lastSong', JSON.stringify(currentSong.value))
}

const usePlayerStore = defineStore('player', () => {
    const mp = ref<HTMLAudioElement>()
    const initPlayer = (value: HTMLAudioElement | undefined) => {
        mp.value = value
    }
    const currentTime = ref()
    const setCurrentTime = (v: any) => {
        currentTime.value = v
    }
    return {
        mp,
        currentSong,
        currentTime,
        setCurrentTime,
        initPlayer
    }
})
export { usePlayerStore }