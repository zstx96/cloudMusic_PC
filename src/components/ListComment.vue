<template>
	<div v-for="comment in comments" :key="comment.commentId" class="flex gap-3 py-3">
		<div>
			<div class="relative inline-block">
				<el-avatar
					class="cursor-pointer"
					:src="$resizeImg(comment.user.avatarUrl, 100)"
					@click="$router.push({ name: 'user', params: { id: comment.user.userId } })"
				></el-avatar
				><img
					v-if="comment.user.avatarDetail?.identityIconUrl"
					class="absolute left-[60%] top-[60%] w-4"
					:src="comment.user.avatarDetail?.identityIconUrl + '?param=30y30'"
				/>
			</div>
		</div>
		<div class="flex-1 border-b pb-3">
			<div><span class="text-blue-500" v-text="comment.user.nickname"></span>:{{ comment.content }}</div>
			<div v-if="comment.beReplied?.length" class="cursor-pointer gap-1 bg-app-gray bg-opacity-30 p-2">
				<div v-for="(item, index) in comment.beReplied" :key="index">
					<span
						class="text-blue-500"
						@click="$router.push({ name: 'user', params: { id: item.user.userId } })"
						>@{{ item.user.nickname }}:</span
					><span>{{ comment.beReplied[0].content }}</span>
				</div>
			</div>
			<div class="my-2 flex justify-between">
				<span class="text-app-gray">{{ $dayjs(comment.time).format('YYYY[年]MM[月]DD[日] hh:mm') }}</span>
				<div class="flex items-center gap-2">
					<span>举报</span>|<button-thumb-up
						:width="20"
						:height="20"
						:liked="comment.liked"
						@thumb-up="thumbUpComment(comment.commentId, 1)"
						@not-thumb-up="notThumbUpComment(comment.commentId, 0)"
					>
					</button-thumb-up
					><span>{{ comment.likedCount }}</span
					>|<el-icon><i-ep-share> </i-ep-share></el-icon>|
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import type { Comment } from '@/interface'
import { likeComment } from '@/api/song'

defineProps<{ comments: Comment[] }>()

// 如果超过规定时间还没有response,终止此次axios

const thumbUpComment = async (id: number, t: number | undefined, type = 0) => {
	likeComment(id, t, type).then((res) => {
		// TODO like
	})
}
const notThumbUpComment = async (id: number, t: number | undefined, type = 0) => {
	likeComment(id, t, type).then((res) => {
		// TODO like
	})
}
</script>

<style scoped lang="less"></style>
