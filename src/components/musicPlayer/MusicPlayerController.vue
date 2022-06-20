<template>
	<div class="flex w-full items-center justify-around">
		<img :src="stepPic" /><img :src="prePic" @click="$emit('prev')" /><img
			v-show="isPaused"
			class="scale-150"
			:src="playPic"
			@click="$player.play"
		/><img v-show="!isPaused" class="scale-150" :src="pausePic" @click="$player.pause" /><img
			:src="nextPic"
			title="下一首"
			@click="$player.next"
		/><player-mode-vue class="icon" :mode="mode" @click="changePlayMode"></player-mode-vue>
	</div>
</template>

<script lang="ts" setup>
import playPic from '@/assets/icon/play.png'
import pausePic from '@/assets/icon/pause.png'
import nextPic from '@/assets/icon/next.png'
import prePic from '@/assets/icon/pre.png'
import stepPic from '@/assets/icon/step.png'
import playerModeVue from '../iconButton/playerMode.vue'
import { ref } from 'vue'
import type { PlayMode } from '@/interface'

const props = defineProps<{ isPaused: boolean; mode: PlayMode; player: HTMLAudioElement; hasInteracted: boolean }>()
const emit = defineEmits<{
	(event: 'update:isPaused', flag: boolean): void
	(event: 'update:mode', mode: string): void
	(event: 'prev'): void
}>()

const toggleList: PlayMode[] = ['loop', 'shuffle', 'single']
const modeIndex = ref(toggleList.findIndex((v) => v === props.mode))
const changePlayMode = () => {
	modeIndex.value++
	emit('update:mode', toggleList[modeIndex.value % 3])
}
</script>

<style scoped lang="less">
.icon,
img {
	height: 24px;
	width: 24px;
}
</style>
