<template lang='pug'>
div(v-for="comment in comments" class="flex gap-3 py-3 ")
    div(class="")
        el-avatar(:src="comment.user.avatarUrl" class=" cursor-pointer" @click="$router.push({name:'user',params:{id:comment.user.userId}})" )
    div(class="border-b  pb-3  flex-1 ")
        div
            span(v-text="comment.user.nickname" class="text-blue-500")
            |:{{ comment.content }}
        div(v-if="comment.beReplied" class=" bg-app-gray bg-opacity-30 p-2 gap-1 cursor-pointer")
            span(class=" text-blue-500" @click="$router.push({name:'user',params:{id:comment.beReplied[0].user.userId}})") @{{comment.beReplied[0].user.nickname}}:
            span() {{comment.beReplied[0].content}}
        div(class="flex justify-between my-2")
            span(class=" text-app-gray") {{ dayjs(comment.timeStr).format('YYYY[年]MM[月]DD[日] hh:mm') }}
            div(class="flex items-center gap-2")
                span 举报
                | |
                thumb-up-button(:width="20" :height="20" :liked="comment.liked" @thumb-up="" @not-thumb-up="") 
                span {{ comment.likedCount }}
                | |
                el-icon()
                    el-icon-share 
                | |
                el-icon 
                    el-icon-chatLineRound
</template>

<script lang="ts" setup>
import type { Comment } from "@/interface"
import dayjs from "dayjs"
import thumbUpButton from "@/components/iconButton/thumbUpButton.vue"
import { likeComment } from "@/api/song";

defineProps<{ comments: Comment[] }>()
const waitTime = 2000

// 如果超过规定时间还没有response,终止此次axios 
const abortController = new AbortController()
const signal = abortController.signal




const thumbUpComment = async (id: number, t: number | undefined, type = 0) => {
    let flag = false
    likeComment(id, t, type).then(res=>{

    })
    setTimeout(() => {

    }, waitTime);
}
</script>

<style scoped lang="less">
</style>