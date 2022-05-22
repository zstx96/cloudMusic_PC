<template lang="pug">
div(v-for="comment in comments" class="flex gap-3 py-3 ")
    div(class="")
        div(class="relative inline-block")
            el-avatar(:src="comment.user.avatarUrl" class=" cursor-pointer" @click="$router.push({name:'user',params:{id:comment.user.userId}})" )
            img(v-if="comment.user.avatarDetail?.identityIconUrl" 
                :src="comment.user.avatarDetail?.identityIconUrl + '?param=30y30'"
                class="absolute w-4  left-[60%] top-[60%]"
            )
    div(class="border-b  pb-3  flex-1 ")
        div
            span(v-text="comment.user.nickname" class="text-blue-500")
            |:{{ comment.content }}
        div(v-if="comment.beReplied?.length" class=" bg-app-gray bg-opacity-30 p-2 gap-1 cursor-pointer")
            div(v-for="item in comment.beReplied")
                span(class=" text-blue-500" @click="$router.push({name:'user',params:{id:item.user.userId}})") @{{item.user.nickname}}:
                span() {{comment.beReplied[0].content}}
        div(class="flex justify-between my-2")
            span(class=" text-app-gray") {{ $dayjs(comment.time).format('YYYY[年]MM[月]DD[日] hh:mm') }}
            div(class="flex items-center gap-2")
                span 举报
                | |
                button-thumb-up(:width="20" :height="20" :liked="comment.liked" @thumb-up="thumbUpComment(comment.commentId,1)" @not-thumb-up="") 
                span {{ comment.likedCount }}
                | |
                el-icon()
                    i-ep-share 
                | |
               
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
</script>

<style scoped lang="less"></style>
