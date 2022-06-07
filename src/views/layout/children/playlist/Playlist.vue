<template>
	<div ref="playlistPage">
		<template v-if="detail"
			><div class="flex gap-4">
				<div>
					<el-image
						class="h-[185px] w-[185px] rounded"
						fit="cover"
						:src="$resizeImg(detail?.coverImgUrl, 400)"
						@click="$router.push({ name: 'editPlaylist', params: { detail: JSON.stringify(detail) } })"
					></el-image>
				</div>
				<div class="flex flex-1 flex-col gap-2 overflow-hidden text-sm">
					<div class="flex items-center">
						<span class="rounded border border-app-red px-1 text-app-red" v-text="'歌单'"> </span
						><span class="text-2xl font-bold" v-text="detail.name"></span>
					</div>
					<div class="flex items-center text-xs">
						<span class="text-blue-600" v-text="detail.creator.nickname"></span
						><span v-text="dayjs(detail.createTime).format('YYYY-MM-DD')"></span
						><span v-text="'创建'"></span>
					</div>
					<div class="flex gap-2">
						<button-play-all :songs="detail.tracks"></button-play-all
						><button-subscribe
							v-if="$user"
							:id="detail.id"
							v-model:subscribed="detail.subscribed"
							:count="detail.subscribedCount"
							:type="SubScribeType.playlist"
							:disabled="detail.userId == $user?.profile.userId"
						></button-subscribe
						><el-button class="bg-app-red" round>
							<template #icon><i-ep-share></i-ep-share></template>分享 </el-button
						><el-button class="bg-app-red" round @click="downloadAll">
							<template #icon><i-ep-download></i-ep-download></template>下载全部</el-button
						>
					</div>
					<div>
						<span>标签:</span
						><template v-if="detail.tags.length"
							><span
								v-for="tag in detail.tags"
								:key="tag"
								class="text-blue-500"
								v-text="tag"
							></span></template
						><span v-else class="cursor-pointer text-blue-700">添加标签</span>
					</div>
					<div>
						<span>歌曲: {{ formatNumber(detail.trackCount) }} </span
						><span>播放 : {{ formatNumber(detail.playCount) }}</span>
					</div>
					<div class="ellipsis">
						<span class="mr-2">简介:</span
						><span class="flex-1"
							><span v-if="detail.description" class="ellipsis h-[3rem]"> {{ detail.description }}</span
							><span v-else class="cursor-pointer text-blue-700">添加简介</span></span
						>
					</div>
				</div>
			</div>
			<div>
				<div class="flex gap-2 py-1">
					<span :class="[1 ? ' text-xl font-bold' : '']">歌曲列表</span><span>评论(0)</span
					><span>收藏者</span>
				</div>
			</div>
			<div :key="$route.fullPath">
				<list-song
					v-if="currentSongs?.length"
					:key="currentSongs[0].id"
					:data="currentSongs"
					:start-index="offset + 1"
				></list-song>
			</div>
			<div class="mt-8 flex justify-center">
				<el-pagination
					:key="$route.fullPath"
					v-model:currentPage="currentPage"
					:default-current-page="1"
					layout="total, prev, pager, next"
					:total="detail.trackCount"
					:page-size="pageSize"
					:background="true"
					:hide-on-single-page="true"
					@current-change="handleCurrentChange"
				></el-pagination></div
		></template>
	</div>
</template>

<script lang="ts" setup>
import { controller, getPlaylistDetail } from '@/api/songlist'
import type { PlaylistDetail, Song } from '@/interface'
import { SubScribeType } from '@/enum'

import { onBeforeRouteLeave, onBeforeRouteUpdate, useRoute } from 'vue-router'
import dayjs from 'dayjs'
import { formatNumber } from '@/utils/format'
import type { LoadingOptions } from 'element-plus'
import { withLoading } from '@/utils/withLoading'
import { download } from '@/utils/download'

const route = useRoute()
const id = parseInt(route.params.id as string)

const detail = ref<PlaylistDetail>()
const playlistPage = ref<HTMLElement>()
const reset = (id: number) => {
	const loadingOptions: LoadingOptions = {
		target: playlistPage.value,
		fullscreen: false,
	}
	withLoading(
		getPlaylistDetail,
		loadingOptions
	)(id)
		.then((res) => {
			detail.value = res.playlist
			offset.value = 0
			currentPage.value = 1
			handleCurrentChange(1)
		})
		.catch((err) => {
			throw new TypeError(err)
		})
}

const downloadAll = () => {
	detail.value?.tracks.forEach((song) => {
		download(song)
	})
}

const pageSize = 20
const currentPage = ref(1)
const offset = ref(0)

// 当前页面变化
const handleCurrentChange = (val: number) => {
	offset.value = pageSize * (val - 1)
	currentSongs.value = detail.value?.tracks.slice(offset.value, offset.value + 20)
}
const currentSongs = ref<Song[]>()
onBeforeRouteUpdate((to) => {
	controller.abort('切换页面销毁之前的请求')
	const id = parseInt(to.params.id as string)
	reset(id)
})
onBeforeRouteLeave(() => {
	controller.abort('切换页面销毁之前的请求')
})

onMounted(() => {
	const loadingOptions: LoadingOptions = {
		target: playlistPage.value,
		fullscreen: false,
	}
	withLoading(
		getPlaylistDetail,
		loadingOptions
	)(id).then((res) => {
		detail.value = res.playlist
	})
})

onActivated(() => {
	const id = parseInt(route.params.id as string)
	reset(id)
})
</script>

<style scoped lang="less">
span {
	margin-right: 6px;
}
</style>
