<template lang='pug'>
div(v-if="userDetail")
    div(class="flex gap-4 py-4")
        div()
            el-image(:src="userDetail.profile.avatarUrl" class="rounded-full w-52 h-52")
        div(class="flex-1 flex flex-col gap-2")
            p(class=" text-2xl font-bold")  {{ userDetail.profile.nickname }}
            div(class="flex justify-between items-center pb-2 border-b")
                div(class=" text-sm flex gap-x-1 items-center w-3/5 flex-wrap")
                    template(v-if="userDetail.profile.allAuthTypes?.length")
                        div(v-for="types in userDetail.profile.allAuthTypes" 
                        class="px-1 m-1 flex items-center gap-1 rounded-full tag ")
                            img(:src="userDetail.identify?.imageUrl" class="h-4 w-4")
                            span {{ types.desc }}
                            span(v-for="item in types.tags") 、{{ item }}
                    span(class="bg-app-gray px-2 rounded-full") Lv{{ userDetail.level }}
                    span(v-if="userDetail.profile.gender === 1" class=" font-medium rounded-full") ♂
                    span(v-if="userDetail.profile.gender === 2" class="h-5 w-5 flex justify-center items-center rotate-45  text-pink-600  font-bold rounded-full bg-pink-300" )  ♀
                div(v-if="true")
                    el-button( icon="el-icon-editPen" round @click="$router.push({name:'editSelf'})") 编辑个人资料    
                div(v-if="userDetail.profile.artistId")
                    el-button(round @click="$router.push(`/artist/${userDetail?.profile.artistId}`)" ) 歌手页
            div(class="flex")
                div(class="flex flex-col items-center w-14 border-r cursor-pointer" @click="$router.push({ name: 'follows', query: { id: userDetail?.profile.userId } })")
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
        div(v-if="playlist" class=" grid   grid-cols-5    gap-2     relative ")
            div(v-for="item in playlist"  )
                div(class=" ")
                    el-image(:src="item.coverImgUrl + '?param=360y360'" class="w-full cursor-pointer aspect-square" fit="cover"   @click="$router.push(`/playlist/${item.id}`)")
                    play-count-inner-vue(:count="item.playCount")
                p(class=" text-ellipsis w-40 overflow-hidden whitespace-nowrap") {{ item.name }}
                span(class=" text-sm text-app-gray") {{ item.trackCount }}首
                

</template>

<script lang="ts" setup>
import { getPlaylist } from '@/api/songlist'
import { getUserDetail } from '@/api/user'
import playCountInnerVue from '@/components/iconButton/playCountInner.vue'
import type { Playlist, User } from '@/interface'
import { ref } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'


const route = useRoute()
const id = parseInt(route.params.id as string)
const userDetail = ref<User>()
const playlist = ref<Playlist[]>()

const init = async (id: number) => {
	await getUserDetail(id).then(res => {
		userDetail.value = res
	})

	await getPlaylist(id).then(res => {
		playlist.value = res.playlist
	})

}
init(id)
onBeforeRouteUpdate((to) => {
	const id = parseInt(to.params.id as string)
	init(id)
})
</script>

<style scoped lang="less">
.tag {
    background-color: #fde4e2;
    color: #f36a84;
}
</style>