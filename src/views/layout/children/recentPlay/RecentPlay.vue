<template lang="pug">
div(v-if="songs")
    list-song-vue(:data="recentSong" :show-play-time="true")
        template(#playtime="{ index }")
            span {{ dayjs(songs[index].playTime).from(dayjs()) }}
</template>

<script lang="ts" setup>
import { getRecentSong } from '@/api/record'
import ListSongVue from '@/components/ListSong.vue'
import type { Song } from '@/interface'
import { computed, ref } from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
import { withLoading } from '@/utils/withLoading'

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')
const songs = ref<
	{
		data: Song
		playTime: number
		resourceId: string
		resourceType: string
	}[]
>()

const recentSong = computed(() => (songs.value || []).map((v) => v.data))

const loadingOps = { target: '#subApp', fullscreen: false }
withLoading(getRecentSong, loadingOps)().then(({ data: { list } }) => {
	songs.value = list
})
</script>

<style scoped lang="less"></style>
