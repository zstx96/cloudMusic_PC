<template lang='pug'>
el-table(:data="data" class="text-sm" stripe @row-dblclick="handleRowDblClick")
    el-table-column(type="index")
    el-table-column(label="操作" width="64")
        template(#default="{ row }")
            heart-button-vue(:is-like="row.isLiked" class=" w-5 h-5")
    el-table-column(label="标题" prop="name")
    el-table-column(label="歌手" :width="138" )
        template(#default="{ row }")
            div(class=" w-32  text-ellipsis text-blue-500  whitespace-nowrap ")
                span(v-for="(item, index) in row.ar" class=" cursor-pointer" @click="$router.push(`/artist?id=${item.id}`)") {{ item.name }}
                    span(:class="[(index == row.ar.length - 1) && 'hidden']") /
    el-table-column(label="专辑")
        template(#default="{ row }")
            span(v-text="row.al.name" class=" w-32  text-ellipsis  whitespace-nowrap ")
    el-table-column(label="时间" prop=" ")
        template(#default="{ row }")
            span(v-text="dayjs(row.dt).format('mm:ss')")
</template>

<script lang="ts" setup>
import type { Song } from "@/interface";
import { usePlayerStore } from "@/store/playerStore";
import dayjs from "dayjs"
defineProps<{ data: Song[] }>()

const playerStore = usePlayerStore()
const handleRowDblClick = async (row: Song) => {
    console.log(row);

    playerStore.$patch({
        currentSong: row
    })
}
</script>

<style scoped lang="less">
</style>