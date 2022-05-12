<template lang="pug">
div(class="flex items-center justify-between" :style="{'height':'70px'}" v-if="curSong")
	div(class="flex-1  pl-4")
		footer-left-vue(:cur-song="curSong")
	div
		music-player-vue(:song="curSong")
	div(class="flex-1 flex items-center justify-end")
		footer-right-vue
</template>

<script lang="ts" setup>
import MusicPlayerVue from './musicPlayer/MusicPlayer.vue'
import FooterLeftVue from './FooterLeft.vue'
import FooterRightVue from './FooterRight.vue'
import { usePlayerStore } from '@/store/playerStore'
import { useRecordStore } from '@/store/recordStore'
import { computed } from 'vue'

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
</script>

<style scoped lang="less"></style>
