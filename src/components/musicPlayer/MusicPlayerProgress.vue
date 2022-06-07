<template>
	<div class="flex items-center gap-1">
		<span>{{ $dayjs(currentTimeInSeconds * 1000).format('mm:ss') }}</span>
		<div
			class="relative flex h-6 cursor-pointer items-center"
			@click="handleClick"
			@mousemove="throttle(showTime, 100, { trailing: true })($event)"
			@mouseout="$emit('update:timeTipVisible', false)"
		>
			<div
				v-show="timeTipVisible"
				class="absolute -top-4 left-2 transform rounded bg-slate-400 text-sm"
				:style="{ transform: `translateX(${timeTipOffsetX}px)` }"
				v-text="timeTipValue"
			></div>
			<div class="relative h-0.5 bg-slate-600" :style="{ width: `${progressContainerLen}px` }">
				<div class="absolute -top-[1px] h-1 rounded bg-app-red" :style="{ width: `${percentage}%` }"></div>
			</div>
		</div>
		<span v-text="$dayjs(duration).format('mm:ss')"></span>
	</div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { throttle } from 'lodash'
import { computed, ref } from 'vue'
const props = defineProps<{
	currentTimeInSeconds: number
	duration: number
	timeTipVisible: boolean
}>()

// FIXME 切歌的一瞬间，会发生 当前时间是这首歌的，总时长是下首歌的
const percentage = computed(() => ((props.currentTimeInSeconds * 1000) / props.duration) * 100)

const emit = defineEmits<{
	(event: 'jumps', percentage: number): void
	(event: 'update:timeTipVisible', status: boolean): void
}>()

const handleClick = (e: MouseEvent) => {
	if (e.target instanceof HTMLSpanElement) return
	const { offsetX } = e
	const per = offsetX / progressContainerLen
	emit('jumps', per)
}

const progressContainerLen = 96 * 4
const timeTipOffsetX = ref(0)
const timeTipValue = ref()
const showTime = (e: MouseEvent) => {
	if (e.target instanceof HTMLSpanElement) return
	const { offsetX } = e
	emit('update:timeTipVisible', true)
	const per = offsetX / progressContainerLen
	timeTipOffsetX.value = offsetX
	timeTipValue.value = dayjs(props.duration * per).format('mm:ss')
}
</script>

<style scoped lang="less"></style>
