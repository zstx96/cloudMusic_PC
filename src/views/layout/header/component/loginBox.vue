<template lang="pug">
div(class=" text-right")
    el-icon
        el-icon-close(@click="$emit('closeLoginBox', false)")
div(class=" h-full flex flex-col items-center justify-between")
    div(class=" text-2xl font-bold") 扫码登录
    div(class="flex-1 flex items-center justify-center")
        el-image(:src="qrimg" class="h-60 w-60")
    p {{ message }}
    span(class=" text-sm text-app-gray") 选择其他登录方式>
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
