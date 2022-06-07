<template>
	<div class="flex items-center justify-between" :style="{ height: '70px' }">
		<div class="flex-1 pl-4"><footer-left-vue v-if="curSong" :cur-song="curSong"></footer-left-vue></div>
		<div>
			<music-player-vue v-if="curSong" :cur-song="curSong"></music-player-vue
			><music-player-disable-vue v-else class="w-96"></music-player-disable-vue>
		</div>
		<div class="flex flex-1 items-center justify-end"><footer-right-vue v-if="curSong"></footer-right-vue></div>
	</div>
</template>

<script lang="ts" setup>
import MusicPlayerVue from './musicPlayer/MusicPlayer.vue'

import FooterLeftVue from './TheFooterLeft.vue'
import FooterRightVue from './TheFooterRight.vue'

import MusicPlayerDisableVue from './musicPlayer/MusicPlayerDisable.vue'

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
