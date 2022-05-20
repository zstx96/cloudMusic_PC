<template lang="pug">
el-button( 
	:icon="subscribed?'el-icon-foldChecked':'el-icon-foldAdd'"  
	round 
	:disabled="disabled"
	@click="handleClick()"
) {{subscribed?'已收藏':'收藏'}}({{ formatNumber(count) }}) 
el-dialog(v-model="visible")  
	p(class="text-center text-lg font-medium") 确定不再收藏该歌单 
	template(#footer) 
		el-button(type="danger" @click="handleEnter") 确认
</template>

<script lang="ts" setup>
import { updateSubscribe } from '@/api/subscribe'
import { SubScribeType } from '@/enum'
import { useUserStore } from '@/store/userStore'
import { formatNumber } from '@/utils/format'
import { ref } from 'vue'

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
const visible = ref(false)
const handleEnter = () => {
	updateSubscribe(props.type, props.id, 2)
	emit('update:subscribed', false)
	visible.value = false
	userStore.removePlaylist(props.id)
}

const handleClick = () => {
	if (props.subscribed) {
		visible.value = true
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
