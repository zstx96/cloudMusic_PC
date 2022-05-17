<template lang="pug">
div(class="flex items-center justify-between" :style="{'height':'70px'}" )
	div(class="flex-1  pl-4")
		the-footer-left-vue(v-if="curSong" :cur-song="curSong")
	div
		music-player-vue(v-if="curSong" :cur-song="curSong")
		music-player-disable-vue(v-else class=" w-96")
	div(class="flex-1 flex items-center justify-end")
		the-footer-right-vue(v-if="curSong")
</template>

<script lang="ts" setup>
import MusicPlayerVue from './musicPlayer/MusicPlayer.vue'

import TheFooterLeftVue from './TheFooterLeft.vue'
import TheFooterRightVue from './TheFooterRight.vue'

import MusicPlayerDisableVue from './musicPlayer/MusicPlayerDisable.vue'

import { usePlayerStore } from '@/store/playerStore'
import { useRecordStore } from '@/store/recordStore'
import { computed, onMounted } from 'vue'

const playerStore = usePlayerStore()
const recordStore = useRecordStore()
const curSong = computed(() => playerStore.currentSong)
if (!playerStore.currentSong && recordStore.playRecord) {
	let index = recordStore.curSongIndex
	let song = recordStore.playRecord[index]
	if (!song) {
		song = recordStore.playRecord[0]
	}
	playerStore.setCurrentSong(song)
}

console.log('child setup')
onMounted(() => {
	console.log('child onMounted')
})
</script>

<style scoped lang="less"></style>
