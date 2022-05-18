<template lang="pug">
div
    div
        div(class="flex items-center gap-2 mb-2")
            svg-date-vue(color="#ff0000")
            p(class=" text-2xl font-bold py-1") 每日歌曲推荐
        div 
            p(class=" text-app-gray text-sm  pb-3") 根据你的音乐口味生成,每日6:00更新
    div(v-if="songs")
        list-song-vue(:data="songs")
</template>

<script lang="ts" setup>
import SvgDateVue from '@/components/iconButton/SvgDate.vue'
import ListSongVue from '@/components/ListSong.vue'
import type { Song } from '@/interface'
import Service from '@/utils/Service'
import { ref } from 'vue'

const songs = ref<Song[]>()
const getRecommendSongs = () => {
	return Service.get<{
		data: {
			dailySongs: Song[]
		}
	}>('/recommend/songs')
}
getRecommendSongs().then((res) => {
	songs.value = res.data.dailySongs
})
</script>

<style scoped lang="less"></style>
