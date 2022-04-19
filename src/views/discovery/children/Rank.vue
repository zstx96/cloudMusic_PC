<template lang='pug'>
div(class="")
    p() 官方榜
    div(v-if="official")
        div(v-for="item in official" class="flex items-center justify-between gap-3 mb-2")
            div
                el-image(:src="item.coverImgUrl" :style="{ 'height': '175px', 'width': '175px' }")
            el-table(v-if="item.tracks" 
            :data="item.tracks" 
            class-name="el-card px-1"
            :row-class-name="({row,rowIndex})=>(rowIndex%2===0)?'':'stripe'"
            :show-header="false")
                el-table-column(type="index")
                el-table-column(prop="name" )
                el-table-column(prop="ar[0][name")
            el-skeleton(v-else :rows="5")
    el-skeleton(v-else :count="3")
    p 全球榜
    div(class=" flex gap-4 flex-wrap" v-if="global")
        div(v-for="item in global" class="")
            el-image(:src="item.coverImgUrl" 
            lazy
            :style="{ 'height': '138px', 'width': '138px' }" 
            fit="fill"  )
                play-count-inner-vue(:count="item.trackCount")
            p(class="text-sm w-[138px]") {{ item.name }}

</template>

<script lang="ts" setup>
import { getPlaylist, getPlaylistDetail, getTopList } from '@/api/songlist';
import playCountInnerVue from '@/components/iconButton/playCountInner.vue';
import type { Playlist, Song } from "@/interface/interface"
import { ref } from 'vue';
const official = ref<(Playlist & { tracks?: Song[] })[]>()
const global = ref<Playlist[]>()
const tableData = ref({})
getTopList().then(res => {
    official.value = res.list.slice(0, 3)
    official.value.forEach(v => {
        getPlaylistDetail(v.id).then(res => {
            v.tracks = res.playlist.tracks.slice(0, 5)
        })
    })
    global.value = res.list.slice(3)
})
</script>

<style scoped lang="less">

</style>