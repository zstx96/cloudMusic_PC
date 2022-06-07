<template>
	<p class="cursor-pointer pt-2 text-sm text-app-gray" @click="$emit('update:visible', !visible)">
		<span>{{ title }}</span
		><el-icon v-if="!visible"><i-ep-caretRight></i-ep-caretRight></el-icon
		><el-icon v-else><i-ep-caretBottom></i-ep-caretBottom></el-icon>
	</p>
	<div v-if="list.length" v-show="visible" class="pl-1">
		<p
			v-for="(item, index) in list"
			:key="index"
			class="flex cursor-pointer items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap py-1 hover:bg-app-gray hover:bg-opacity-30"
			:data-pid="item.id"
			:class="[activeNav === item.id.toString() && 'bg-app-gray bg-opacity-30']"
			@click="
				$emit('update:activeNav', item.id.toString()),
					$router.push({ name: 'playlist', params: { id: item.id } })
			"
		>
			<el-icon><i-ep-headset></i-ep-headset></el-icon><span>{{ item.name }}</span>
		</p>
	</div>
</template>

<script lang="ts" setup>
import type { Playlist } from '@/interface'

defineProps<{
	visible: boolean
	list: Playlist[]
	title: string
	activeNav: string
}>()

defineEmits<{
	(event: 'update:visible', visible: boolean): void
	(event: 'update:activeNav', activeNav: string): void
}>()
</script>

<style scoped lang="less"></style>
