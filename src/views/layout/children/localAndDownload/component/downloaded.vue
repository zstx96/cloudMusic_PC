<template>
	<div>
		<p>已下载</p>
		<div v-if="localList.length">
			<list-song-vue :data="localList"
				><template #default
					><el-table-column label="大小"
						><template #default="{ row }"
							><span>{{ transSize(row.size) }} </span></template
						></el-table-column
					><el-table-column label="下载时间"
						><template #default="{ row }"
							><span>{{ $dayjs(row.downloadTime).format('YYYY-MM-DD') }}</span></template
						></el-table-column
					></template
				></list-song-vue
			>
		</div>
		<el-empty v-else></el-empty>
	</div>
</template>

<script lang="ts" setup>
import ListSongVue from '@/components/ListSong.vue'
import { useDownloadStore } from '@/store/downloadStore'
import { computed } from 'vue'

const downloadStore = useDownloadStore()

const localList = computed(() => downloadStore.downloadedList)

const transSize = (size: number) => {
	return `${(size / 1e6).toFixed(1)}mb`
}
</script>

<style scoped lang="less"></style>
