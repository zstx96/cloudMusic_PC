<template lang="pug">
div(class="flex justify-around items-center w-full")
    img(:src="stepPic"  )
    img(:src="prePic" @click="$emit('prev')")
    img(:src="playPic"  v-show="isPaused" class=" scale-150" @click="play")
    img(:src="pausePic" v-show="!isPaused" class=" scale-150" @click="pause")
    img(:src="nextPic" title="下一首" @click="$emit('next')")
    player-mode-vue.icon(:mode="mode" @click="changePlayMode")

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
	(event: 'update:hasInteracted', flag: boolean): void
	(event: 'next'): void
	(event: 'prev'): void
}>()

const toggleList: PlayMode[] = ['loop', 'shuffle', 'single']
const modeIndex = ref(toggleList.findIndex((v) => v === props.mode))
const changePlayMode = () => {
	modeIndex.value++
	emit('update:mode', toggleList[modeIndex.value % 3])
}

const play = () => {
	if (!props.hasInteracted) {
		emit('update:hasInteracted', true)
	}
	emit('update:isPaused', false)
}
const pause = () => {
	emit('update:isPaused', true)
}
</script>

<style scoped lang="less">
.icon,
img {
	height: 24px;
	width: 24px;
}
</style>
