<template lang="pug">
div(class="flex items-center gap-2 pr-3 text-sm")
	svg-volume
	span(class=" px-1 py-0.5 text-app-red border-app-red border" v-text="'极高'")
	el-icon(:size="30" v-show="$route.name !=='fm'" @click="recordVisible = !recordVisible")
		i-ep-expand
	teleport(to="#app")
		box-play-record(v-show="recordVisible" class="z-[2001]")
</template>

<script lang="ts" setup>
const recordVisible = ref(false)
</script>

<style scoped lang="less"></style>
