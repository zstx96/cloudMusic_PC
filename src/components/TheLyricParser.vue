<template>
	<div ref="lyricRef" class="h-80 w-96 overflow-y-auto scroll-smooth text-center">
		<p
			v-for="([, text], index) in lyric"
			:key="index"
			class="h-8 py-1"
			:class="[currentRow == index + 1 ? 'active-lyric-row font-bold text-black' : 'text-app-gray']"
		>
			{{ text !== '\n' ? text : '~~~~~~~~~~~~~~~~~' }}
		</p>
	</div>
</template>

<script lang="ts" setup>
import { usePlayerStore } from '@/store/playerStore'

const props = defineProps<{ lyric: string }>()
const playerStore = usePlayerStore()
const lyricRef = ref<HTMLDivElement>()
const lyric = ref()
const currentRow = ref(0)
// FIXME 暂时不用正则（不会）

const formatLyric = (lyric: string) => {
	const arr = lyric.split('[')
	arr.shift()
	return arr.map((str, index) => str.split(']')) as [time: string, word: string][]
}
lyric.value = formatLyric(props.lyric)
const timeArr: number[] = lyric.value.map(([time, word]) => {
	const [m, s] = time.split(':').map((v: string) => parseInt(v))

	return m * 60 + s
})
const startScrollRow = 6
const rowHeight = 32

const calcRow = (time: number) => {
	const index = timeArr.findIndex((v) => v > time)
	return index === -1 ? timeArr.length - 1 : index
}

watch(
	() => playerStore.currentTime,
	(t) => {
		if (!lyricRef.value) return
		const row = calcRow(t)
		const diff = row - currentRow.value
		if (diff > 0) {
			currentRow.value = row
			if (row >= startScrollRow) {
				lyricRef.value.scrollTop += diff * rowHeight
			}
		} else if (diff < 0) {
			currentRow.value = row
			lyricRef.value.scrollTop += diff * rowHeight
		}
	}
)
</script>

<style scoped lang="less"></style>
