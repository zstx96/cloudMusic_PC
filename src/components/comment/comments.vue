<template lang='pug'>
div(v-for="comment in comments" class="flex gap-3 py-3 ")
    div(class="")
        el-avatar(:src="comment.user.avatarUrl" )
    div(class="border-b  pb-3  flex-1 ")
        div
            span(v-text="comment.user.nickname" class="text-blue-500")
            |:{{comment.content}}
        div(class="flex justify-between my-2")
            span(class=" text-app-gray") {{dayjs(comment.timeStr).format('YYYY[年]MM[月]DD[日] hh:mm')}}
            div(class="flex items-center gap-2")
                span 举报
                | |
                span {{comment.likedCount}}
                | |
                el-icon()
                    el-icon-share 
                | |
                el-icon 
                    el-icon-chatLineRound
</template>

<script lang="ts" setup>
import type {Comment} from "@/interface"
import dayjs from "dayjs"

defineProps<{comments:Comment[]}>()

</script>

<style scoped lang="less">

</style>