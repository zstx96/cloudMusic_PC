<template>
	<div class="relative flex cursor-pointer flex-col" @mouseover="$emit('update:hoverElIndex', index)">
		<el-image
			class="w-full rounded"
			:class="[type === 'rect' ? 'aspect-video' : 'aspect-square']"
			:src="picUrl"
			fit="cover"
			lazy
			><template #placeholder><img :src="placeholder" /></template></el-image
		><play-inner-red-vue
			v-if="hoverElIndex"
			:class="[
				hoverElIndex === index ? ' opacity-100' : ' opacity-0',
				'   absolute bottom-2 right-2 z-[1000] transition  duration-500',
			]"
		></play-inner-red-vue
		><play-count-inner-vue class="absolute top-1 right-2" :count="playcount"></play-count-inner-vue>
	</div>
</template>

<script lang="ts" setup>
import playCountInnerVue from './iconButton/playCountInner.vue'
import playInnerRedVue from './iconButton/playInnerRed.vue'
import placeholder from '@/assets/img/placeholder.png'

defineProps<{
	picUrl: string
	playcount: number
	index?: number
	hoverElIndex?: number
	type?: 'square' | 'rect'
}>()
defineEmits<{
	(event: 'update:hoverElIndex', index?: number): void
}>()
</script>

<style scoped lang="less"></style>
