<template lang="pug">
div
    teleport(to="#app")
        header-vue(class=" h-[60px] absolute top-0 w-full")
    div(class="flex justify-center pt-[70px]" v-if="mvDetail" :key="freshFlag")
        div(class="w-[630px]")
            div(class=" font-bold text-2xl py-3")  &it;视频详情
            div()
                video(:src="mvUrl" controls class="w-[612px] h-[354px]" )
            div(class="flex  items-center gap-2")
                el-avatar(:src="mvDetail.artists[0].img1v1Url")
                span(v-for="ar in mvDetail.artists") {{ ar.name }} /
            p(class="text-2xl font-bold ") {{ mvDetail.name }}
            div(class=" text-xs text-app-gray" )
                span 发布: {{ dayjs(mvDetail.publishTime).format('YYYY-MM-DD') }}
                span.ml-3 播放：{{ mvDetail.playCount }}
            div(class="flex gap-3" v-if="mvInfo")
                el-button(v-if="mvInfo.liked" icon="el-icon-starFilled" @click="likeMv(false)" round) 已赞({{ mvInfo.likedCount }}) 
                el-button(v-else icon="el-icon-star"  @click="likeMv(true)"  round)  赞({{ mvInfo.likedCount }}) 
                el-button(icon="el-icon-foldAdd" round) 收藏({{ mvDetail.subCount }})
                el-button(icon="" round) 分享({{ mvDetail.shareCount }})
                el-button(round) 下载MV
                span.flex-1
                span 举报
            div
                span(class=" text-2xl font-bold ") 评论
                span(class=" text-app-gray text-sm") ({{ mvDetail.commentCount }})
            div
                el-input(type="textarea" placeholder="请在此输入评论" :row="4")
            div(v-if="mvCommentRes" class="text-sm  ")
                p(class=" text-xl font-bold text-black") 精彩评论
                div 
                    comments-vue(:comments="mvCommentRes.hotComments")
                p 
                div
                    comments-vue(:comments="mvCommentRes.comments")

</template>

<script lang="ts" setup>
import { resourceLike, LikeResourceType } from '@/api/app'
import type { Comment, Mv } from '@/interface'
import Service from '@/utils/Service'
import dayjs from 'dayjs'
import { onActivated, ref } from 'vue'
import commentsVue from '@/components/comment/comments.vue'
import { useRoute } from 'vue-router'
import headerVue from '@/views/layout/header/header.vue'

const route = useRoute()
const id = parseInt(route.params.id as string)

const mvDetail = ref<Mv>()
const getMvDetail = (id: string | number) => {
	return Service.get<{
		data: Mv
	}>(`/mv/detail?mvid=${id}`)
}
const getMvDetailLocal = async (id: number) => {
	getMvDetail(id).then((res) => {
		mvDetail.value = res.data
	})
}

const mvUrl = ref()
const getMvUrl = async (id: number | string) => {
	return Service.get<{
		data: {
			url: string
		}
	}>(`/mv/url?id=${id}`)
}

type MvInfo = {
	commentCount: number
	liked: boolean
	likedCount: number
	shareCount: number
}
const mvInfo = ref<MvInfo>()
const getMvInfo = (id: any) => {
	return Service.get<MvInfo>(`/mv/detail/info?mvid=${id}`)
}

const likeMv = (t: boolean) => {
	resourceLike(id, t, LikeResourceType.mv)
	getMvInfo(id)
}

const mvCommentRes = ref<MvCommentRes>()
interface MvCommentRes {
	isMusician: boolean
	cnum: number
	userId: number
	topComments: void /* undefined */[]
	moreHot: boolean
	hotComments: Comment[]
	commentBanner: void /* 未知类型 */
	code: number
	comments: Comment[]
	total: number
	more: boolean
}
const getMvComment = (id: number) => {
	return Service.get<MvCommentRes>(`/comment/mv?id=${id}`)
}
const initMV = async (id: number) => {
	await getMvDetailLocal(id)
	const {
		data: { url },
	} = await getMvUrl(id)
	mvUrl.value = url
	const info = await getMvInfo(id)
	mvInfo.value = info
	const comments = await getMvComment(id)
	mvCommentRes.value = comments
}
initMV(id)
const freshFlag = ref()
// 页面被缓存了

onActivated(() => {
	const id = parseInt(route.params.id as string)
	initMV(id)
})
</script>

<style scoped lang="less"></style>
