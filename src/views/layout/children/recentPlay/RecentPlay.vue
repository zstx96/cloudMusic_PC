<template lang='pug'>
div(v-if="songs")
    playlist-display-vue(:data="songs.map(v => v.data)" :show-play-time="true")
        template(#default="{ index }")
            span {{ dayjs(songs[index].playTime).from(dayjs()) }}
</template>

<script lang="ts" setup>import { getRecentSong } from '@/api/record'
import playlistDisplayVue from '@/components/playlist/playlistDisplay.vue'
import type { Song } from '@/interface'
import { ref } from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
import { withLoading } from '@/utils/withLoading'

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')
const songs = ref<{ data: Song, playTime: number, resourceId: string, resourceType: string }[]>()

withLoading(getRecentSong, { target: '#subApp', fullscreen: false })().then(({ data: { list } }) => {
    
	songs.value = list
})

</script>

<style scoped lang="less">
</style>