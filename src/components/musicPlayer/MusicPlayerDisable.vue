<template>
	<div class="inline-flex flex-col items-center gap-1">
		<div class="flex w-full items-center justify-around">
			<img :src="stepPic" /><img :src="prePic" @click="$emit('prev')" /><img
				class="scale-150"
				:src="playPic"
			/><img :src="nextPic" title="下一首" /><player-mode-vue class="icon" mode="single"></player-mode-vue>
		</div>
		<div></div>
	</div>
</template>

<script lang="ts" setup>
import playPic from '@/assets/icon/play.png'
import nextPic from '@/assets/icon/next.png'
import prePic from '@/assets/icon/pre.png'
import stepPic from '@/assets/icon/step.png'
import playerModeVue from '../iconButton/playerMode.vue'

defineEmits(['prev'])
</script>

<style scoped lang="less">
.icon,
img {
	height: 24px;
	width: 24px;
	opacity: 50%;
	cursor: not-allowed;
}
</style>
