<template lang='pug'>
p follows
div(v-if="follows")
    p {{}}的关注
    div(class="flex flex-wrap justify-between  font-light text-sm")
        div(v-for="item in follows" class="w-[380px] flex gap-3 m-2 items-center el-card p-3")
            div(class="flex items-center w-[70px] h-[70px] relative")
                img(:src="item.avatarUrl" class=" rounded-full overflow-hidden" @click="$router.push(`/user?id=${item.userId}`)" )
                img(v-if="item.avatarDetail" :src="item.avatarDetail.identityIconUrl" class=" w-6 h-6 absolute top-[45px] left-[45px] "  )
            div
                p(class="py-2  font-normal text-base " ) {{item.nickname}}
                p(class="w-[180px] text-ellipsis overflow-hidden whitespace-nowrap") {{item.signature}} 
                div(class="flex gap-4")
                    span(class="" ) 歌单: {{item.playlistCount}}
                    span |
                    span 粉丝: {{item.follows}}
            div
                el-button(icon="el-icon-message" round) 私信

</template>

<script lang="ts" setup>
import { getFollows } from '@/api/user'
import type { Follower } from '@/interface'
import { useRouteQuery } from '@vueuse/router'
import { ref } from 'vue'

const id = parseInt(useRouteQuery('id').value as string)

const follows = ref<Follower[]>()
getFollows(id).then(res=>{
	follows.value = res.follow
})


</script>

<style scoped lang="less">

</style>