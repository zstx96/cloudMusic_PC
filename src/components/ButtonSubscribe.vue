<template>
	<el-button v-if="subscribed" round :disabled="disabled" @click="handleClick()">
		<template #icon><i-ep-folder-checked></i-ep-folder-checked></template
		><span>已收藏({{ formatNumber(count) }}) </span></el-button
	><el-button v-else round :disabled="disabled" @click="handleClick()">
		<template #icon><i-ep-folder-add> </i-ep-folder-add></template
		><span>收藏({{ formatNumber(count) }})</span></el-button
	><el-dialog v-model="dialogVisible">
		<p class="text-center text-lg font-medium">确定不再收藏该歌单</p>
		<template #footer> <el-button type="danger" @click="handleEnter">确认</el-button></template></el-dialog
	>
</template>

<script lang="ts" setup>
import { updateSubscribe } from '@/api/subscribe'
import { SubScribeType } from '@/enum'
import { useUserStore } from '@/store/userStore'
import { formatNumber } from '@/utils/format'

const userStore = useUserStore()
const props = defineProps<{
	type: SubScribeType
	id: number
	count: number
	disabled: boolean
	subscribed: boolean
}>()
const emit = defineEmits<{
	(event: 'unSub', id: number): void
	(event: 'update:subscribed', t: boolean): void
}>()
const dialogVisible = ref(false)
const handleEnter = () => {
	updateSubscribe(props.type, props.id, 2)
	emit('update:subscribed', false)
	dialogVisible.value = false
	userStore.removePlaylist(props.id)
}

const handleClick = () => {
	if (props.subscribed) {
		dialogVisible.value = true
	} else {
		updateSubscribe(props.type, props.id, 1)
	}
}
</script>

<style scoped lang="less">
:deep(.el-button [class*='el-icon'] svg) {
	color: white !important;
}
</style>
