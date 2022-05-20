<template lang="pug">
div(class="flex flex-col relative cursor-pointer " @mouseover="$emit('update:hoverElIndex',index)")
	el-image(:src="picUrl+'?param=500y500'" fit="cover" class="rounded w-full aspect-square" lazy)
		template(#placeholder)
			span isLoading ...
	play-inner-red-vue(
		v-if="hoverElIndex"
		:class="[hoverElIndex === index ? ' opacity-100' : ' opacity-0','   absolute bottom-2 right-2 z-[1000] transition  duration-500']"
	)
	play-count-inner-vue(:count="playcount" class="absolute top-1 right-2  ")
</template>

<script lang="ts" setup>
import playCountInnerVue from './iconButton/playCountInner.vue'
import playInnerRedVue from './iconButton/playInnerRed.vue'

defineProps<{
	picUrl: string
	playcount: number
	index?: number
	hoverElIndex?: number
}>()
</script>

<style scoped lang="less"></style>
