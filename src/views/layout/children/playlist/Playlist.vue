<template lang="pug">
div(  class="overflow-x-hidden  overflow-y-auto relative h-full" ref="playlistPage")
    template(v-if="detail"  )
        div(class="flex gap-4")
            div
                el-image(class="h-[185px] w-[185px] rounded" fit="cover" @click="$router.push({ name: 'editPlaylist', params: { detail: JSON.stringify(detail) } })" :src="detail?.coverImgUrl")
            div(class="flex flex-col gap-2 text-sm")
                div(class="flex items-center")
                    span(class=" text-app-red border-app-red border px-1 rounded" v-text="'歌单'") 
                    span(class=" text-2xl font-bold" v-text="detail.name")
                div(class="flex items-center text-xs")
                    span(v-text="detail.creator.nickname" class=" text-blue-600")
                    span(v-text="dayjs(detail.createTime).format('YYYY-MM-DD')")
                    span(v-text="'创建'")
                div(class=" flex gap-2")
                    play-all-button-vue(:songs="detail.tracks")
                    el-button( class="bg-app-red" icon="el-icon-foldAdd"  round) 收藏({{ formatNumber(detail.subscribedCount) }})
                    el-button( class="bg-app-red"   icon="el-icon-share" round) 分享 
                    el-button( class="bg-app-red" icon="el-icon-download" round) 下载全部
                div
                    span() 标签:
                    template(v-if="detail.tags.length")
                        span(v-for="tag in detail.tags" class=" text-blue-500" v-text="tag")
                    span(v-else class=" cursor-pointer text-blue-700") 添加标签
                div
                    span() 歌曲: {{ formatNumber(detail.trackCount) }}    
                    span 播放 : {{ formatNumber(detail.playCount) }}
                div(class="flex w-full")
                    span(class="mr-2 flex-shrink-0") 简介:
                    span(class="flex-1")
                        span(v-if="detail.description" class="h-[3rem] ellipsis")  {{ detail.description }}
                        span(v-else class="cursor-pointer text-blue-700") 添加简介
        div
            div(class="flex gap-2 py-1")
                span(:class="[(1) ? ' font-bold text-xl' : '']"   ) 歌曲列表
                span 评论(0)
                span 收藏者
        playlist-display-vue(:data="detail.tracks" :key="detail.id")

</template>

<script lang="ts" setup>
import { controller, getPlaylistDetail } from '@/api/songlist'
import type { PlaylistDetail } from '@/interface/interface'
import { onActivated, onMounted, ref } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import dayjs from 'dayjs'
import playlistDisplayVue from '@/components/playlist/playlistDisplay.vue'
import { formatNumber } from '@/utils/format'
import type { LoadingOptions } from 'element-plus'
import { withLoading } from '@/utils/withLoading'
import playAllButtonVue from '@/components/iconButton/playAllButton.vue'

const route = useRoute()

const id = parseInt(route.params.id as string)
const detail = ref<PlaylistDetail>()
//FIXME 这里有异步问题

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
		})
		.catch((err) => {
			console.log(err)
		})
}

onBeforeRouteUpdate((to) => {
	controller.abort()
	const id = parseInt(to.params.id as string)
	reset(id)
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
