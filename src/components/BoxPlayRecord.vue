<template lang="pug">
div( 
    v-if="recentSongs" 
    class=" border  absolute bottom-0 right-0 -translate-y-20 text-app-gray text-sm p-2  bg-white z-[1000] overflow-x-hidden overflow-y-scroll" 
    :style="{ 'height': `${app_main_height - 80}px`, 'width': '400px' }"
)
    p(class=" font-bold text-xl text-black") 当前播放
    div(class="flex justify-between gap-4 border-b py-2")
        span 共{{ recentSongs.length }}首
        span.flex-1
        span
        span(class=" text-blue-500 cursor-pointer" @click="clearList") 清空列表
    div(v-if="recordStore.playRecord")
        el-table(:data="recordStore.playRecord" 
        :show-header="false" 
        stripe
        class="text-sm"
        :row-class-name="computedRowClassName"
        highlight-current-row
        @row-click="handleRowClick"
    )
            el-table-column(type="index")
            el-table-column()
                template(#default="{ row }")
                    span(class=" text-ellipsis w-44 whitespace-nowrap") {{ row.name }}
            el-table-column()
                template(#default="{ row }")
                    div(class="text-ellipsis w-44 whitespace-nowrap")
                        span(v-for="ar in row.ar" v-text="ar.name" class="mr-1")
            el-table-column()
                template(#default="{ row }")
                    span(v-text="dayjs(row.dt).format('mm:ss')")
    div(v-else class="h-full flex flex-col justify-center items-center")
        p.mb-4  你还没有添加任何歌曲!
        div
            span 去首页
            router-link(to="/discovery" class=" text-blue-500") 发现音乐 

</template>

<script lang="ts" setup>
import { app_main_height } from '@/config'
import type { Song } from '@/interface'
import { usePlayerStore } from '@/store/playerStore'
import { useRecordStore } from '@/store/recordStore'
import dayjs from 'dayjs'
import { ref } from 'vue'

const recordStore = useRecordStore()
const playerStore = usePlayerStore()

const recentSongs = ref<Song[]>()
// getRecentSong().then(res => {
//     recentSongs.value = res.data.list.map(v => v.data)
// })
recentSongs.value = recordStore.playRecord
const computedRowClassName = ({ rowIndex }: { rowIndex: number }) => {
	return recordStore.curSongIndex === rowIndex ? 'select-row' : ''
}
const handleRowClick = (song: Song) => {
	playerStore.$patch({
		currentSong: song,
	})
	recordStore.addPlayRecord([song])
}
const clearList = () => {
	recordStore.clearPlayRecord()
	recentSongs.value = []
	playerStore.setCurrentSong(undefined)
}
</script>

<style scoped lang="less"></style>
