<template lang='pug'>
div(v-if="detail")
    div(class="flex gap-4")
        div
            el-image(class="h-[185px] w-[185px] rounded" :src="detail?.coverImgUrl")
        div(class=" flex flex-col gap-2 text-sm")
            div
                span(class=" text-app-red border-app-red border p-1" v-text="'歌单'") 
                span(class=" text-2xl font-bold" v-text="detail.name")
            div(class="flex items-center text-xs")
                el-avatar(:src="detail.creator.avatarUrl" size="small")
                span(v-text="detail.creator.nickname" class=" text-blue-600")
                span(v-text="dayjs(detail.createTime).format('YYYY-MM-DD')")
                span(v-text="'创建'")
            div()
                button( class="flex px-4 py-1 text-white rounded-lg bg-app-red") 播放全部
            div
                span() 标签:
                span(v-for="tag in detail.tags" class=" text-blue-500" v-text="tag")
            div
                span() 歌曲: {{ detail.trackCount }}    
                span 播放 : {{ detail.playCount }}
            div
                span() 简介: {{ detail.description }}
    div
        div
            span 歌曲列表
    el-table(:data="detail.tracks" class="text-sm" stripe @row-dblclick="handleRowDblClick")
        el-table-column(type="index")
        el-table-column(label="操作" width="64")
            template(#default="{ row }")
                heart-button-vue(:is-like="row.isLiked" class=" w-5 h-5")
        el-table-column(label="标题" prop="name")
        el-table-column(label="歌手" :width="138" )
            template(#default="{ row }")
                div(class=" w-32  text-ellipsis  whitespace-nowrap ")
                    span(v-for="item in row.ar" class=" cursor-pointer text-blue-500") {{ item.name }}/
        el-table-column(label="专辑")
            template(#default="{ row }")
                span(v-text="row.al.name" class=" w-32  text-ellipsis  whitespace-nowrap ")
        el-table-column(label="时间" prop=" ")
            template(#default="{ row }")
                span(v-text="dayjs(row.dt).format('mm:ss')")
        


</template>

<script lang="ts" setup>
import { getPlaylistDetail } from '@/api/songlist';
import type { PlaylistDetail, Song } from '@/interface/interface';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import dayjs from "dayjs";
import heartButtonVue from '@/components/iconButton/heartButton.vue';
import { useUserStore } from '@/store/userStore';
import { useStorage } from '@vueuse/core';
import { usePlayerStore } from '@/store/playerStore';
import { getSongUrl } from '@/api/song';
const route = useRoute()
const id = parseInt(route.query.id as string)

const userStore = useUserStore()
const likedIds = userStore.likedIds
const detail = ref<PlaylistDetail>()
//FIXME 这里有异步问题
getPlaylistDetail(id).then(res => {
    res.playlist.tracks.forEach(song => {
        song.isLiked = likedIds?.includes(song.id) ? true : false
    })
    detail.value = res.playlist
})

const playerStore = usePlayerStore()
const handleRowDblClick = async (row: Song) => {
    playerStore.$patch({
        currentSong: row
    })
}
</script>

<style scoped lang="less">
span {
    margin-right: 6px;
}
</style>