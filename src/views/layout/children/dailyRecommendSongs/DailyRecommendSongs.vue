<template>
	<div>
		<div>
			<div class="mb-2 flex items-center gap-2">
				<svg-date color="#ff0000"></svg-date>
				<p class="py-1 text-2xl font-bold">每日歌曲推荐</p>
			</div>
			<div><p class="pb-3 text-sm text-app-gray">根据你的音乐口味生成,每日6:00更新</p></div>
		</div>
		<div v-if="songs"><list-song :data="songs"></list-song></div>
	</div>
</template>

<script lang="ts" setup>
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
