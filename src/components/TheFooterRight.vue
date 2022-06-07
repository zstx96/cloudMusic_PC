<template>
	<div class="flex items-center gap-2 pr-3 text-sm">
		<svg-volume></svg-volume>
		<span class="border border-app-red px-1 py-0.5 text-app-red" v-text="'极高'"></span>
		<el-icon v-show="$route.name !== 'fm'" :size="30" @click="recordVisible = !recordVisible">
			<i-ep-expand></i-ep-expand>
		</el-icon>
		<teleport to="#app">
			<box-play-record v-show="recordVisible && $route.name !== 'fm'" class="z-[2001]"></box-play-record>
		</teleport>
	</div>
</template>

<script lang="ts" setup>
const recordVisible = ref(false)
</script>

<style scoped lang="less"></style>
