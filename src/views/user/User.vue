<template lang='pug'>
div(v-if="userDetail")
    div(class="flex gap-4 py-4")
        div()
            el-image(:src="userDetail.profile.avatarUrl" class="rounded-full w-52 h-52")
        div(class="flex flex-col gap-2")
            p(class=" text-2xl font-bold")  {{ userDetail.profile.nickname }}
            div(class=" text-sm")
                span.font-bold() TAG
            div(class="flex")
                div(class="flex flex-col items-center w-14 border-r cursor-pointer" @click="$router.push({name:'follows',query:{id:userDetail?.profile.userId}})")
                    span(class=" font-bold") {{ userDetail.profile.follows }}
                    span(class="text-sm") 关注
                div(class="flex flex-col  items-center w-20 cursor-pointer")
                    span(class="font-bold") {{ userDetail.profile.followeds }}
                    span(class="text-sm") 粉丝
            p(class="text-sm") 所在地区: {{ userDetail.profile.city }}
            p 社交网络: qq 
            p 个人介绍: {{ userDetail.profile.signature || '暂无介绍' }}
    div
        el-tabs
            el-tab-pane(name="" label="创建的歌单")
            el-tab-pane(name="" label="收藏的歌单")
            el-tab-pane(name="" label="创建的播客")
            el-tab-pane(name="" label="收藏的歌单")
            el-tab-pane(name="" label="创建的音乐专栏")
        div(v-if="playlist" class="flex flex-wrap gap-2  justify-between w-full ")
            div(v-for="item in playlist" class=" aspect-square")
                div(class="relative")
                    el-image(:src="item.coverImgUrl" class="w-40 h-40 cursor-pointer" fit="cover" lazy @click="$router.push(`/playlist?id=${item.id}`)")
                    play-count-inner-vue(:count="item.playCount")
                p(class=" text-ellipsis w-40 overflow-hidden whitespace-nowrap") {{item.name}}
                span(class=" text-sm text-app-gray") {{item.trackCount}}首
                

</template>

<script lang="ts" setup>
import { getPlaylist } from '@/api/songlist';
import { getUserDetail } from '@/api/user';
import playCountInnerVue from '@/components/iconButton/playCountInner.vue';
import type { Playlist, User } from '@/interface';
import { useRouteQuery } from '@vueuse/router';
import { ref } from 'vue';

const id = parseInt(useRouteQuery('id').value as string)
const userDetail = ref<User>()
getUserDetail(id).then(res => {
    userDetail.value = res
})

const playlist = ref<Playlist[]>()
getPlaylist(id).then(res=>{
    playlist.value = res.playlist
})
</script>

<style scoped lang="less">
</style>