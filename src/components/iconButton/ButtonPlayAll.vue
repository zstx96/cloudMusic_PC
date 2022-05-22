<template lang="pug">
el-button-group(type="danger" class=" text-white")
    el-button(
        type="danger" round 
        @click="playAll(songs)"
    ) 
        i-ep-caretRight
        span 播放全部

    el-button(alt="wer" @click="playSong(songs)" round)
        i-ep-plus
el-dialog(:modelValue="false")
    
</template>

<script lang="ts" setup>
import type { Song } from '@/interface'
import { usePlayerStore } from '@/store/playerStore'
import { useRecordStore } from '@/store/recordStore'
import { useUserStore } from '@/store/userStore'

const recordStore = useRecordStore()
const playerStore = usePlayerStore()
const ids = useUserStore().likedIds
const playAll = (songs: Song[]) => {
	recordStore.clearPlayRecord()
	songs.forEach((song) => {
		song.isLiked = ids?.includes(song.id)
	})
	recordStore.addPlayRecord(songs)
	playerStore.setCurrentSong(songs[0])
}
const playSong = (songs: Song[]) => {
	recordStore.addPlayRecord(songs)
}

defineProps<{ songs: Song[] }>()
</script>

<style scoped lang="less"></style>
