<template>
	<div ref="playlistPage" class="relative h-full overflow-y-auto overflow-x-hidden">
		<template v-if="detail"
			><div class="flex gap-4">
				<div>
					<el-image
						class="h-[185px] w-[185px] rounded"
						fit="fill"
						:src="detail.album.picUrl"
						@click="$router.push({ name: 'editPlaylist', params: { detail: JSON.stringify(detail) } })"
					></el-image>
				</div>
				<div class="flex flex-col gap-3 text-sm">
					<div class="flex items-center">
						<span class="border border-app-red px-1 text-app-red" v-text="'专辑'"> </span
						><span class="text-2xl font-bold"
							>{{ detail.album.name
							}}<span v-if="detail.album.alias.length" class="text-app-gray"
								>(<span v-for="alias in detail.album.alias" :key="alias">{{ alias }}</span
								>)</span
							></span
						>
					</div>
					<div class="flex gap-2">
						<button-play-all :songs="detail.songs"></button-play-all
						><el-button class="bg-app-red" icon="i-ep-foldAdd" round
							>收藏({{ formatNumber(detail.album.size) }})</el-button
						><el-button class="bg-app-red" icon="i-ep-share" round>分享 </el-button
						><el-button class="bg-app-red" icon="i-ep-download" round>下载全部</el-button>
					</div>
					<div class="text-xs">
						<p>
							歌手<span
								class="cursor-pointer text-blue-600"
								@click="$router.push({ name: 'artist', params: { id: detail?.album.artist.id } })"
								v-text="detail.album.artist.name"
							></span>
						</p>
						<p>时间：<span v-text="$dayjs(detail.album.publishTime).format('YYYY-MM-DD')"></span></p>
					</div>
				</div>
			</div>
			<div>
				<div class="flex gap-2 py-1">
					<span :class="[1 ? ' text-xl font-bold' : '']">歌曲列表</span><span>评论(0)</span
					><span>收藏者</span>
				</div>
			</div>
			<list-song-vue :key="detail.album.id" :data="detail.songs"></list-song-vue
		></template>
	</div>
</template>

<script lang="ts" setup>
import ListSongVue from '@/components/ListSong.vue'
import { formatNumber } from '@/utils/format'
import type { LoadingOptions } from 'element-plus'
import { withLoading } from '@/utils/withLoading'
import { getAlbumDetail } from '@/api/song'
import { onBeforeRouteUpdate } from 'vue-router'

const route = useRoute()
const id = parseInt(route.params.id as string)
const detail = ref<Awaited<ReturnType<typeof getAlbumDetail>>>()

const playlistPage = ref<HTMLElement>()
onBeforeRouteUpdate((to) => {
	const id = parseInt(to.params.id as string)
	const loadingOptions: LoadingOptions = {
		target: playlistPage.value,
		fullscreen: false,
	}
	withLoading(
		getAlbumDetail,
		loadingOptions
	)(id).then((res) => {
		detail.value = res
	})
})

onMounted(() => {
	const loadingOptions: LoadingOptions = {
		target: playlistPage.value,
		fullscreen: false,
	}
	withLoading(
		getAlbumDetail,
		loadingOptions
	)(id).then((res) => {
		detail.value = res
	})
})
</script>

<style scoped lang="less">
span {
	margin-right: 6px;
}
</style>
