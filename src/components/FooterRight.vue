<template lang="pug">
div(class="flex items-center gap-2 text-sm")
	span(class=" px-1 py-0.5 text-app-red border-app-red border" v-text="'极高'")
	el-icon(:size="30" @click="recordVisible = !recordVisible")
		el-icon-fold
	teleport(to="#app")
		box-play-record-vue(v-show="recordVisible")
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import BoxPlayRecordVue from './BoxPlayRecord.vue'
const recordVisible = ref(false)
</script>

<style scoped lang="less"></style>
