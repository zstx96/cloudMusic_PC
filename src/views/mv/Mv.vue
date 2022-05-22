<template lang="pug">
div()
	teleport(to="#app")
		layout-header(class=" h-[60px] absolute top-0 w-full")
	//- 占位符，
	div(class="h-[60px]")
	div(class="flex justify-around pt-6"  :key="$route.fullPath")
		div(class="flex justify-center" v-if="mvDetail")
			div(class="w-[630px]")
				div(class=" font-bold text-2xl py-3")  &it;视频详情
				div()
					video(:src="mvUrl" controls class="w-[612px] h-[354px]" )
				div(class="flex  items-center gap-2")
					el-avatar(:src="mvDetail.artists[0].img1v1Url")
					span(v-for="ar in mvDetail.artists") {{ ar.name }} /
				p(class="text-2xl font-bold ") {{ mvDetail.name }}
				div(class=" text-xs text-app-gray" )
					span 发布: {{ $dayjs(mvDetail.publishTime).format('YYYY-MM-DD') }}
					span.ml-3 播放：{{ mvDetail.playCount }}
				div(class="flex gap-3" v-if="mvInfo")
					el-button(v-if="mvInfo.liked" icon="i-ep-starFilled" @click="likeMv(false)" round) 已赞({{ mvInfo.likedCount }}) 
					el-button(v-else icon="i-ep-star"  @click="likeMv(true)"  round)  赞({{ mvInfo.likedCount }}) 
					el-button(icon="i-ep-folder-add" round) 收藏({{ mvDetail.subCount }})
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
						list-comment(:comments="mvCommentRes.hotComments")
					p(class=" text-xl font-bold text-black") 最新评论
					div
						list-comment(:comments="mvCommentRes.comments")
		div(class="w-96 shrink-0")
			p 相关推荐
			div(v-if="personalizedMv?.length" )
				div(v-for="item in personalizedMv" class="flex m-2 gap-4")
					cover(:pic-url="item.picUrl" :playcount="item.playCount" class="w-36 h-20 text-white shrink-0" @click="$router.push({name:'mv',params:{id:item.id}})")
					div(class="flex flex-col justify-between py-2 text-sm")
						p(class="text-base") {{item.name}}
						p(class="text-app-gray") 
							span by 
							//- NOTE 实验性质的goto
							span(class="cursor-pointer hover:text-black transition" 
								@click="$goto('artist',{id:item.artistId})"
							) {{item.artistName}}
</template>

<script lang="ts" setup>
import type { Comment, Mv, PersonalizedMv } from '@/interface'
import ListCommentVue from '@/components/ListComment.vue'
import layoutHeaderVue from '@/views/layout/header/layoutHeader.vue'
import CoverVue from '@/components/Cover.vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import Service from '@/utils/Service'
import { getPersonalizedMv } from '@/api/user'
import { resourceLike, LikeResourceType } from '@/api/app'

const route = useRoute()
const id = parseInt(route.params.id as string)

// mv detail
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

// mv url
const mvUrl = ref()
const getMvUrl = async (id: number | string) => {
	return Service.get<{
		data: {
			url: string
		}
	}>(`/mv/url?id=${id}`)
}

// mv info
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

// mv comments
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
// mv personalized

const personalizedMv = ref<PersonalizedMv[]>()

// init
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
	const { result } = await getPersonalizedMv()
	personalizedMv.value = result
}

// 页面被缓存了

onActivated(() => {
	const id = parseInt(route.params.id as string)
	initMV(id)
})
onBeforeRouteUpdate((to) => {
	initMV(parseInt(to.params.id as string))
})
initMV(id)
</script>

<style scoped lang="less"></style>
