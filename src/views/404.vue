<template lang="pug">
el-empty(description="404")
    span {{ delay }}s后自动返回
</template>

<script lang="ts" setup>
import { onActivated, ref } from 'vue'
import { useRouter } from 'vue-router'

const delay = ref(3)
const router = useRouter()
const timeout = () => {
	const id = setTimeout(() => {
		delay.value--
		setTimeout(() => {
			delay.value--
			setTimeout(() => {
				delay.value--
				clearTimeout(id)
				router.back()
				setTimeout(() => {
					delay.value = 3
				})
			}, 1000)
		}, 1000)
	}, 1000)
}

onActivated(() => {
	timeout()
})
</script>

<style scoped lang="less"></style>
