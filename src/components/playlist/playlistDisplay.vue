<template lang='pug'>
el-table(
:data="processData" 
class="text-xs" 
class-name="text-sm" 
stripe 
@row-dblclick="handleRowDblClick")

    el-table-column(type="index" width="64")
    el-table-column(label="操作" width="64")
        template(#default="{ row }")
            heart-button-vue(:is-like="row.isLiked" @like="like(row.id)" @dislike="disLike(row.id)"  class=" w-5 h-5")
    el-table-column(label="标题" :min-width="300" prop="name")
    el-table-column(label="歌手" :width="138" )
        template(#default="{ row }")
            div(class=" w-32  text-ellipsis text-blue-500  whitespace-nowrap ")
                span(v-for="(item, index) in row.ar" class=" cursor-pointer" @click="$router.push(`/artist/${item.id}`)") {{ item.name }}
                    span(:class="[(index == row.ar.length - 1) && 'hidden']") /
    el-table-column(label="专辑")
        template(#default="{ row }")
            span(v-text="row.al.name" class=" w-32  text-ellipsis  whitespace-nowrap ")
    el-table-column(label="时长")
        template(#default="{ row }")
            span(v-text="dayjs(row.dt).format('mm:ss')")
    
    el-table-column(label="播放时间" v-if="showPlayTime")
        template(#default="{ row,column,$index}")
            slot( :index="$index")
           
    
    
</template>

<script lang="ts" setup>
import { likeSong } from "@/api/song";
import type { Song } from "@/interface";
import { usePlayerStore } from "@/store/playerStore";
import { useUserStore } from "@/store/userStore";
import dayjs from "dayjs"
import { ref } from "vue";
import heartButtonVue from "../iconButton/heartButton.vue";
const props =  defineProps<{ data: Song[],showPlayTime?:boolean}>()

const processData = ref()

const userStore = useUserStore()
const ids = userStore.likedIds
props.data.forEach(v=>{
    if(ids?.includes(v.id)){
        v.isLiked = true
    }
})
processData.value = props.data

const playerStore = usePlayerStore()
const handleRowDblClick = async (row: Song) => {
    playerStore.$patch({
        currentSong: row
    })
}
const like = (id: number) => {
    likeSong(id, true)
    userStore.addLikeSong(id)
    
}
const disLike = (id: number) => {
    likeSong(id, false)
    userStore.deleteLikeSong(id)
}


</script>

<style scoped lang="less">
</style>