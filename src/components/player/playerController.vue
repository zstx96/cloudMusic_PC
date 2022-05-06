<template lang="pug">
div(class="flex justify-around items-center w-full")
    img(:src="stepPic" @click="$emit('step')")
    img(:src="prePic" @click="$emit('pre')")
    img(:src="playPic" v-show="isPaused" class=" scale-150" @click="$emit('play')")
    img(:src="pausePic" v-show="!isPaused" class=" scale-150" @click="$emit('pause')")
    img(:src="nextPic" @click="$emit('next')")
    img(:src="randomPic" )

</template>

<script lang="ts" setup>
import playPic from '@/assets/icon/play.png'
import pausePic from '@/assets/icon/pause.png'
import nextPic from '@/assets/icon/next.png'
import prePic from '@/assets/icon/pre.png'
import stepPic from '@/assets/icon/step.png'
import randomPic from '@/assets/icon/random.png'

defineProps<{ isPaused: boolean }>()
</script>

<style scoped lang="less">
img {
	height: 24px;
	width: 24px;
}
.el-image {
	height: 24px;
	width: 24px;
}
</style>
