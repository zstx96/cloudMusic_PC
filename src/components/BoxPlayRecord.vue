<template>
	<div
		v-if="recentSongs"
		class="absolute bottom-0 right-0 z-[1000] -translate-y-20 overflow-x-hidden overflow-y-scroll border bg-white p-2 text-sm text-app-gray"
		:style="{ height: `${app_main_height - 80}px`, width: '400px' }"
	>
		<p class="text-xl font-bold text-black">当前播放</p>
		<div class="flex justify-between gap-4 border-b py-2">
			<span>共{{ recentSongs.length }}首</span>
			<p>curIndex {{ curSongIndex }}</p>
			<span class="flex-1"></span><span></span
			><span class="cursor-pointer text-blue-500" @click="clearList">清空列表</span>
		</div>
		<div v-if="playRecord" @mouseover="throttle(handleMouseover)">
			<el-table
				class="text-sm"
				:data="playRecord"
				:show-header="false"
				stripe
				:row-class-name="computedRowClassName"
				highlight-current-row
				@row-click="handleRowClick"
				><el-table-column type="index"></el-table-column
				><el-table-column
					><template #default="{ row }"
						><span class="w-44 text-ellipsis whitespace-nowrap">{{ row.name }}</span></template
					></el-table-column
				><el-table-column
					><template #default="{ row }"
						><div class="w-44 text-ellipsis whitespace-nowrap">
							<span
								v-for="ar in row.ar"
								:key="ar.id"
								class="mr-1"
								v-text="ar.name"
							></span></div></template></el-table-column
				><el-table-column
					><template #default="{ row }"
						><span v-text="$dayjs(row.dt).format('mm:ss')"></span></template></el-table-column
			></el-table>
		</div>
		<div v-else class="flex h-full flex-col items-center justify-center">
			<p class="mb-4">你还没有添加任何歌曲!</p>
			<div><span>去首页</span><router-link class="text-blue-500" to="/discovery">发现音乐 </router-link></div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { app_main_height } from '@/config'
import type { Song } from '@/interface'
import { usePlayerStore } from '@/store/playerStore'
import { useRecordStore } from '@/store/recordStore'
import { throttle } from 'lodash'
import { ref } from 'vue'

const userStore = useRecordStore()
const { playRecord, curSongIndex } = storeToRefs(userStore)
const { addPlayRecord, clearPlayRecord } = userStore
const playerStore = usePlayerStore()

const recentSongs = ref<Song[]>()
// getRecentSong().then(res => {
//     recentSongs.value = res.data.list.map(v => v.data)
// })
recentSongs.value = playRecord.value
const computedRowClassName = ({ rowIndex }: { rowIndex: number }) => {
	return curSongIndex.value === rowIndex ? 'select-row' : ''
}
const handleRowClick = (song: Song) => {
	playerStore.$patch({
		currentSong: song,
	})
	addPlayRecord([song])
}
const handleMouseover = (e: MouseEvent) => {
	// TODO 这里打算做1个列表上下拖拽滑动
}
const clearList = () => {
	clearPlayRecord()
	recentSongs.value = []
	playerStore.setCurrentSong(undefined)
}
</script>

<style scoped lang="less"></style>
