<template lang="pug">
el-button-group(type="danger" class=" text-white")
    el-button(class="bg-app-red" 
		icon="el-icon-caretRight" 
		type="danger" round 
		@click="playAll(songs)"
	) 播放全部
    el-button(alt="wer" @click="playSong(songs)" round  icon="el-icon-plus")
el-dialog(:modelValue="false")
    
</template>

<script lang="ts" setup>
import type { Song } from '@/interface'
import { usePlayerStore } from '@/store/playerStore'
import { useRecordStore } from '@/store/recordStore'

const recordStore = useRecordStore()
const playerStore = usePlayerStore()
const playAll = (songs: Song[]) => {
	recordStore.clearPlayRecord()
	recordStore.addPlayRecord(songs)
	playerStore.setCurrentSong(songs[0])
}
const playSong = (songs: Song[]) => {
	recordStore.addPlayRecord(songs)
}

defineProps<{ songs: Song[] }>()
</script>

<style scoped lang="less">
:deep(.el-button [class*='el-icon'] svg) {
	color: white !important;
}
</style>
