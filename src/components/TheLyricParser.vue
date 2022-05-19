<template lang="pug">
div(class=" text-center h-80 w-96 overflow-y-auto scroll-smooth " v-if="lyric"   ref="lyricRef" )
    p(v-for="([, text], index) in lyric" 
    class="py-1"
    :class="[(currentIndex == (index + 1)) ? 'font-bold text-black active-lyric-row' : 'text-app-gray']" 
    ) {{ text !== "\n" ? text : '~~~~~~~~~~~~~~~~~' }}  

</template>

<script lang="ts" setup>
import { usePlayerStore } from '@/store/playerStore'
import { ref, watch } from 'vue'

const props = defineProps<{ lyric: string }>()
const playerStore = usePlayerStore()
const lyricRef = ref<HTMLDivElement>()
const lyric = ref()
const currentIndex = ref(0)
// FIXME 暂时不用正则（不会）
const formatLyric = () => {
	const arr = props.lyric.split('[')
	arr.shift()
	lyric.value = arr.map((str, index) => str.split(']')) as [string, string][]
}
formatLyric()
const timeArr = lyric.value.map((v) => {
	const [m, s] = v[0].split(':')
	return +m * 60 + +s
})
watch(
	() => playerStore.currentTime,
	(t) => {
		if (t > +timeArr[currentIndex.value]) {
			currentIndex.value++
			const el = document.querySelector('.active-lyric-row') as HTMLElement
			if (el) {
				lyricRef.value?.scrollBy({ top: 32 })
			}
		}
	}
)
</script>

<style scoped lang="less"></style>
