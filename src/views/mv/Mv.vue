<template>
	<div>
		<teleport to="#app"><layout-header class="absolute top-0 h-[60px] w-full"></layout-header></teleport
		><!-- 占位符， -->
		<div class="h-[60px]"></div>
		<div :key="$route.fullPath" class="flex justify-around pt-6">
			<div v-if="mvDetail" class="flex justify-center">
				<div class="w-[630px]">
					<div class="py-3 text-2xl font-bold">⁢视频详情</div>
					<div><video class="h-[354px] w-[612px]" :src="mvUrl" controls></video></div>
					<div class="flex items-center gap-2">
						<el-avatar :src="mvDetail.artists[0].img1v1Url"></el-avatar
						><span v-for="ar in mvDetail.artists" :key="ar.name">{{ ar.name }} /</span>
					</div>
					<p class="text-2xl font-bold">{{ mvDetail.name }}</p>
					<div class="text-xs text-app-gray">
						<span>发布: {{ $dayjs(mvDetail.publishTime).format('YYYY-MM-DD') }}</span
						><span class="ml-3">播放：{{ mvDetail.playCount }}</span>
					</div>
					<div v-if="mvInfo" class="flex gap-3">
						<el-button v-if="mvInfo.liked" icon="i-ep-starFilled" round @click="likeMv(false)"
							>已赞({{ mvInfo.likedCount }})</el-button
						><el-button v-else icon="i-ep-star" round @click="likeMv(true)"
							>赞({{ mvInfo.likedCount }})</el-button
						><el-button icon="i-ep-folder-add" round>收藏({{ mvDetail.subCount }})</el-button
						><el-button round>分享({{ mvDetail.shareCount }})</el-button><el-button round>下载MV</el-button
						><span class="flex-1"></span><span>举报</span>
					</div>
					<div>
						<span class="text-2xl font-bold">评论</span
						><span class="text-sm text-app-gray">({{ mvDetail.commentCount }})</span>
					</div>
					<div><el-input type="textarea" placeholder="请在此输入评论" :row="4"></el-input></div>
					<div v-if="mvCommentRes" class="text-sm">
						<p class="text-xl font-bold text-black">精彩评论</p>
						<div><list-comment :comments="mvCommentRes.hotComments"></list-comment></div>
						<p class="text-xl font-bold text-black">最新评论</p>
						<div><list-comment :comments="mvCommentRes.comments"></list-comment></div>
					</div>
				</div>
			</div>
			<div class="w-96 shrink-0">
				<p>相关推荐</p>
				<div v-if="personalizedMv?.length">
					<div v-for="item in personalizedMv" :key="item.id" class="m-2 flex gap-4">
						<cover
							class="h-20 w-36 shrink-0 text-white"
							:pic-url="item.picUrl"
							:playcount="item.playCount"
							@click="$router.push({ name: 'mv', params: { id: item.id } })"
						></cover>
						<div class="flex flex-col justify-between py-2 text-sm">
							<p class="text-base">{{ item.name }}</p>
							<p class="text-app-gray">
								<span>by</span
								><!-- NOTE 实验性质的goto --><span
									class="cursor-pointer transition hover:text-black"
									@click="$goto('artist', { id: item.artistId })"
									>{{ item.artistName }}</span
								>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import type { Comment, Mv, PersonalizedMv } from '@/interface'
import Service from '@/utils/Service'
import { getPersonalizedMv } from '@/api/user'
import { resourceLike, LikeResourceType } from '@/api/app'
import { onBeforeRouteUpdate } from 'vue-router'

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
