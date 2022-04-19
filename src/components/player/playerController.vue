<template lang='pug'>
div(class="flex justify-around items-center w-full")
    el-image(:src="stepPic" @click="$emit('step')")
    el-image(:src="prePic" @click="$emit('pre')")
    el-image(:src="playPic" v-show="isPaused" class=" scale-150" @click="$emit('play')")
    el-image(:src="pausePic" v-show="!isPaused" class=" scale-150" @click="$emit('pause')")
    el-image(:src="nextPic" @click="$emit('next')")
    el-image(:src="randomPic" @click="$emit('random')")

</template>

<script lang="ts" setup>
import playPic from "@/assets/icon/play.png"
import pausePic from "@/assets/icon/pause.png"
import nextPic from "@/assets/icon/next.png"
import prePic from "@/assets/icon/pre.png"
import stepPic from "@/assets/icon/step.png"
import singlePic from "@/assets/icon/single.png"
import randomPic from "@/assets/icon/random.png"

defineProps<{isPaused:boolean}>()
</script>

<style scoped lang="less">
.el-image{
    height: 24px;
    width: 24px;
}
</style>