<template lang="pug">
div
    p 已下载
    div(v-if="localList.length")
        list-song-vue(:data="localList")
            template(#default)
                el-table-column(label="大小")
                    template(#default="{row}")
                        span {{transSize(row.size)}} 
                el-table-column(label="下载时间")
                    template(#default="{row}")
                        span {{$dayjs(row.downloadTime).format('YYYY-MM-DD')}}
    el-empty(v-else)
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
