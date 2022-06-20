<template>
	<div class="text-right">
		<el-icon><i-ep-close @click="$emit('closeLoginBox', false)"></i-ep-close></el-icon>
	</div>
	<div class="flex h-full flex-col items-center justify-between">
		<div class="text-2xl font-bold">扫码登录</div>
		<div class="flex flex-1 items-center justify-center"><el-image class="h-60 w-60" :src="qrimg"></el-image></div>
		<p>{{ message }}</p>
		<span class="text-sm text-app-gray">选择其他登录方式></span>
	</div>
</template>

<script lang="ts" setup>
import { checkQr } from '@/api/login'
import { ref } from 'vue'
const props = defineProps<{ qrimg: string; qrKey: string }>()
defineEmits<{
	(event: 'closeLoginBox', value: boolean): void
}>()
// eslint-disable-next-line vue/no-setup-props-destructure
const qrKey = props.qrKey
const message = ref()
const timeoutId = setInterval(() => {
	checkQr(qrKey).then((res) => {
		message.value = res.message
		if (res.code === 803) {
			clearInterval(timeoutId)
			location.reload()
		}
	})
}, 1000)
</script>

<style scoped lang="less"></style>
