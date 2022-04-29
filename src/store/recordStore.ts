import type { Song } from "@/interface";
import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";

const searchRecord = useLocalStorage<string[]>('searchRecord', [])
const playRecord = useLocalStorage<Song[]>('playRecord', [])

const useRecordStore = defineStore('record', () => {

    const addPlayRecord = (songs: Song[]) => {
        songs.filter(song=>!playRecord.value.find(v=>v.id===song.id)).forEach(song=>playRecord.value.push(song))
    }
    const clearPlayRecord = () => {
        playRecord.value = []
    }
    const removePlayRecord = (song: Song) => {
        playRecord.value = playRecord.value.filter(item => item.id !== song.id)
    }

    const clearSearchRecord = () => {
        searchRecord.value = []
    }
    const removeSearchRecord = (word: string) => {
        let index = searchRecord.value.findIndex(v => v === word)
        searchRecord.value.splice(index, 1)
    }
    const pushSearchRecord = (word: string) => {
        if (searchRecord.value.includes(word)) {
            searchRecord.value.splice(searchRecord.value.findIndex(v => v === word), 1)
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
        removePlayRecord

    }
})

export {
    useRecordStore
}