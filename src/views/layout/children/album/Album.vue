<template lang="pug">
div(  class="overflow-y-auto overflow-x-hidden relative h-full" ref="playlistPage")
    template(v-if="detail"  )
        div(class="flex gap-4")
            div
                el-image(class="h-[185px] w-[185px] rounded" 
                fit="fill" 
                @click="$router.push({ name: 'editPlaylist', params: { detail: JSON.stringify(detail) } })" 
                :src="detail.album.picUrl")
            div(class="flex flex-col gap-3 text-sm")
                div(class="flex items-center")
                    span(class=" text-app-red border-app-red border px-1" v-text="'专辑'") 
                    span(class=" text-2xl font-bold" ) {{detail.album.name}}
                        span(v-if="detail.album.alias.length" class=" text-app-gray") (
                                span(v-for="alias in detail.album.alias") {{alias}}
                                | )
                div(class=" flex gap-2")
                    play-all-button-vue(:songs="detail.songs")
                    el-button( class="bg-app-red" icon="el-icon-foldAdd"  round) 收藏({{ formatNumber(detail.album.size) }})
                    el-button( class="bg-app-red"   icon="el-icon-share" round) 分享 
                    el-button( class="bg-app-red" icon="el-icon-download" round) 下载全部
                div(class=" text-xs")
                    p  歌手
                        span(v-text="detail.album.artist.name" class=" text-blue-600 cursor-pointer" @click="$router.push({name:'artist',params:{id:detail?.album.artist.id}})")
                    p 时间：
                        span(v-text="$dayjs(detail.album.publishTime).format('YYYY-MM-DD')")
        div
            div(class="flex gap-2 py-1")
                span(:class="[(1) ? ' font-bold text-xl' : '']"   ) 歌曲列表
                span 评论(0)
                span 收藏者
        list-song-vue(:data="detail.songs" :key="detail.album.id")

</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import ListSongVue from '@/components/ListSong.vue'
import { formatNumber } from '@/utils/format'
import type { LoadingOptions } from 'element-plus'
import { withLoading } from '@/utils/withLoading'
import playAllButtonVue from '@/components/iconButton/playAllButton.vue'
import { getAlbumDetail } from '@/api/album'

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
