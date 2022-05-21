<template lang="pug">
div
    img(:src="playPic"  v-show="isPaused" @click="$emit('play')")
    img(:src="pausePic" v-show="!isPaused" @click="$emit('pause')")
</template>

<script lang="ts" setup>
import playPic from '@/assets/icon/play.png'
import pausePic from '@/assets/icon/pause.png'

defineProps<{ isPaused: boolean }>()
</script>

<style scoped lang="less"></style>
