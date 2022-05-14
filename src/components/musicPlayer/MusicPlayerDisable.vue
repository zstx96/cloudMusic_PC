<template lang="pug">
div(class="inline-flex flex-col gap-1 items-center")
    div(class="flex justify-around items-center w-full")
        img(:src="stepPic"  )
        img(:src="prePic" @click="$emit('prev')")
        img(:src="playPic"   class=" scale-150" )
        img(:src="nextPic" title="下一首"  )
        player-mode-vue.icon(mode="single" )
    div()
</template>

<script lang="ts" setup>
import playPic from '@/assets/icon/play.png'
import nextPic from '@/assets/icon/next.png'
import prePic from '@/assets/icon/pre.png'
import stepPic from '@/assets/icon/step.png'
import playerModeVue from '../iconButton/playerMode.vue'
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
