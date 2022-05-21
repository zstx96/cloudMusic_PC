<template lang="pug">
div(ref="playlistPage")
    template(v-if="detail")
        div(class="flex gap-4")
            div
                el-image(class="h-[185px] w-[185px] rounded" fit="cover" @click="$router.push({ name: 'editPlaylist', params: { detail: JSON.stringify(detail) } })" :src="detail?.coverImgUrl")
            div(class="flex-1 flex flex-col gap-2 text-sm overflow-hidden")
                div(class="flex items-center")
                    span(class=" text-app-red border-app-red border px-1 rounded" v-text="'歌单'") 
                    span(class=" text-2xl font-bold" v-text="detail.name")
                div(class="flex items-center text-xs")
                    span(v-text="detail.creator.nickname" class=" text-blue-600")
                    span(v-text="dayjs(detail.createTime).format('YYYY-MM-DD')")
                    span(v-text="'创建'")
                div(class=" flex gap-2")
                    play-all-button-vue(:songs="detail.tracks")
                    button-subscribe-vue(:id="detail.id" 
                        :type="SubScribeType.playlist" 
                        :count="detail.subscribedCount"
                        :subscribed="detail.subscribed"
                        :disabled="detail.userId ==  $user.profile.userId"
                    )
                    el-button( class="bg-app-red"   icon="el-icon-share" round) 分享 
                    el-button( class="bg-app-red" icon="el-icon-download" round @click="downloadAll") 下载全部
                div
                    span() 标签:
                    template(v-if="detail.tags.length")
                        span(v-for="tag in detail.tags" class=" text-blue-500" v-text="tag")
                    span(v-else class=" cursor-pointer text-blue-700") 添加标签
                div
                    span() 歌曲: {{ formatNumber(detail.trackCount) }}    
                    span 播放 : {{ formatNumber(detail.playCount) }}
                div(class=" ellipsis")
                    span(class="mr-2  ") 简介:
                    span(class="flex-1")
                        span(v-if="detail.description" class="h-[3rem] ellipsis")  {{ detail.description }}
                        span(v-else class="cursor-pointer text-blue-700") 添加简介
        div
            div(class="flex gap-2 py-1")
                span(:class="[(1) ? ' font-bold text-xl' : '']"   ) 歌曲列表
                span 评论(0)
                span 收藏者
                
        div(:key="$route.fullPath")
            list-song-vue(:data="currentSongs" 
                v-if="currentSongs?.length"
                :start-index="offset+1"
                :key="currentSongs[0].id" 
            )
        div(class="flex justify-center mt-8 ")
            el-pagination( 
                :key="$route.fullPath"
                v-model:currentPage="currentPage"
                :default-current-page="1"
                layout="total, prev, pager, next"
                :total="detail.trackCount"
                :page-size="pageSize"
                :background="true"
                :hide-on-single-page="true"
                @current-change="handleCurrentChange"
            )

</template>

<script lang="ts" setup>
import { controller, getPlaylistDetail } from '@/api/songlist'
import type { PlaylistDetail, Song } from '@/interface'
import { SubScribeType } from '@/enum'
import { onActivated, onMounted, ref } from 'vue'
import ListSongVue from '@/components/ListSong.vue'
import playAllButtonVue from '@/components/iconButton/playAllButton.vue'
import ButtonSubscribeVue from '@/components/ButtonSubscribe.vue'
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
