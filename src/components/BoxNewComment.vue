<template>
	<el-dialog v-model="visible" :before-close="handleClose">
		<template #header
			><p class="text-center">
				<span>当前歌曲:</span><span class="text-xl font-normal">{{ title }}</span>
			</p></template
		><el-input v-model="text" type="textarea" :rows="5" placeholder="发表评论"></el-input>
		<p class="text-xl font-normal">☺ @ #</p>
		<div class="text-right"><el-button type="primary">评论</el-button></div></el-dialog
	>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

defineProps<{ visible: boolean; title: string }>()
const emit = defineEmits<{
	(event: 'update:visible', arg1: boolean): void
}>()

const handleClose = () => {
	emit('update:visible', false)
}

const text = ref('')
</script>

<style scoped lang="less"></style>
