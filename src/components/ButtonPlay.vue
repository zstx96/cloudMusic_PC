<template>
	<div>
		<img v-show="isPaused" :src="playPic" @click="$emit('play')" /><img
			v-show="!isPaused"
			:src="pausePic"
			@click="$emit('pause')"
		/>
	</div>
</template>

<script lang="ts" setup>
import playPic from '@/assets/icon/play.png'
import pausePic from '@/assets/icon/pause.png'

defineProps<{ isPaused: boolean }>()
defineEmits<{
	(event: 'play'): void
	(event: 'pause'): void
}>()
</script>

<style scoped lang="less"></style>
