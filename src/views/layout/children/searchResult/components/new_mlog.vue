<template>
	<div
		v-if="data[0]"
		class="flex h-full items-center gap-2"
		@click="$router.push({ name: 'mv', params: { id: data[0].baseInfo.id } })"
	>
		<div>
			<el-image
				class="h-10 w-20 rounded"
				:src="data[0].baseInfo.resource.mlogBaseData.coverUrl + '?param=200y100'"
				fit="cover"
			></el-image>
		</div>
		<div class="ellipsis flex-1 items-center py-2">
			<span>视频:</span><span v-text="data[0].baseInfo.resource.mlogBaseData.text"></span>
		</div>
	</div>
</template>

<script lang="ts" setup>
interface New_mlog {
	baseInfo: {
		id: string
		resource: {
			mlogBaseData: {
				coverUrl: string
				text: string
			}
			mlogExtVO: {
				likeCount: number
				playCount: number
				canCollect: boolean
				commentCount: number
			}
		}
	}
	resourceId: string
}
defineProps<{ data: New_mlog[] }>()
</script>

<style scoped lang="less"></style>
