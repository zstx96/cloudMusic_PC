<template>
	<el-icon class="box-content rounded-full border p-2 hover:bg-slate-300" :size="20" @click="download(song)"
		><i-ep-download></i-ep-download
	></el-icon>
</template>

<script lang="ts" setup>
import type { Song } from '@/interface'
import { download } from '@/utils/download'

defineProps<{
	song: Song
}>()
</script>

<style scoped lang="less">
:global(.loading-custom) {
	background: rgba(191, 94, 94, 0.292) !important;
	border-radius: 100% !important;
	width: 48px !important;
	height: 48px !important;
	left: 96px !important;
	bottom: 96px !important;
	top: auto !important;
	right: auto !important;

	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;

	position: relative;
}
</style>
