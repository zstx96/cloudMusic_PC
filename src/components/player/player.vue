<template lang='pug'>
div( class=" absolute bottom-0 w-full h-[70px] px-3    flex justify-between items-center   z-[10000] bg-white border-t"  )
    div(v-if="curSong" class="flex gap-2")
        el-image(:src="curSong.al.picUrl + '?param=200y200'"  class="rounded w-10  h-10" @click="$router.push({ name: 'song', query: { id: curSong.id } })")
        div(class=" ")
            div(class="flex")
                span( v-text="curSong.name")
                heart-button-vue(:is-like="curSong.isLiked || false" )
            div(class="text-sm")
                span(v-for="item in curSong.ar"  v-text="item.name")
    div(class="h-full flex justify-between flex-col py-3")
        player-controller-vue(@play="play" @pause="pause" @pre="pre" @next="next" :isPaused="isPaused")
        div(class="flex gap-1 items-center mt-2")
            span() {{ dayjs(currentTimeInSeconds * 1000).format('mm:ss') }}
            div(class=" relative w-96 h-0.5 bg-slate-600")
                div(:style="{ 'width': `${percentage}%` }" class="rounded absolute  -top-[1px]  bg-app-red h-1")
            span(v-text="dayjs(curSong.dt).format('mm:ss')")
    div(class="flex items-center gap-4 relative")
        span( class=" px-1 py-0.5 text-app-red border-app-red border" v-text="'极高'")
        el-icon(:size="30" @click="recordVisible = !recordVisible")
            el-icon-fold
        teleport(to="#app")
            div(v-show="recordVisible" class="shadow absolute bottom-0 right-0 -translate-y-20 text-app-gray text-sm p-2  bg-white z-[10000] overflow-x-hidden overflow-y-scroll" :style="{ 'height': `${app_main_height - 80}px`, 'width': '400px' }")
                p(class=" font-bold text-xl text-black") 当前播放
                div(class="flex justify-between gap-4 border-b py-2")
                    span 共0首
                    span.flex-1
                    span
                    span(class=" text-blue-500") 清空列表
                div(v-if="recentSongs")
                    el-table(:data="recentSongs" 
                    :show-header="false" 
                    stripe
                    class="text-sm"
                    :row-class-name="computedRowClassName"
                    highlight-current-row
                    @row-click="handleRowClick")
                        el-table-column()
                            template(#default="{ row }")
                                span(class=" text-ellipsis w-44 whitespace-nowrap") {{ row.name }}
                        el-table-column()
                            template(#default="{ row }")
                                div(class="text-ellipsis w-44 whitespace-nowrap")
                                    span(v-for="ar in row.ar" v-text="ar.name" class="mr-1")
                        el-table-column()
                            template(#default="{ row }")
                                span(v-text="dayjs(row.dt).format('mm:ss')")
                div(v-else class="h-full flex flex-col justify-center items-center")
                    p.mb-4  你还没有添加任何歌曲!
                    div
                        span 去首页
                        router-link(to="/discovery" class=" text-blue-500") 发现音乐 


audio(ref="playerEl"  )
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, watch } from "vue"
import { usePlayerStore } from "@/store/playerStore"
import heartButtonVue from "../iconButton/heartButton.vue";
import playerControllerVue from "./playerController.vue";
import dayjs from "dayjs"
import type { Song } from "@/interface/interface";
import { getSongUrl } from "@/api/song";
import { app_main_height } from "@/config";
import { getRecentSong } from "@/api/record";
const playerStore = usePlayerStore()
const playerEl = ref<HTMLAudioElement>()

const curSong = computed(() => playerStore.currentSong)

const currentTimeInSeconds = ref(0)

// 处理事件按钮组
const isPaused = ref(true)
const play = () => {
    console.log('play');

    if (playerEl.value?.paused) {
        playerEl.value?.play()
        isPaused.value = false
    }
}
const pause = () => {
    console.log('pause');

    if (!playerEl.value?.paused) {
        playerEl.value?.pause()
        isPaused.value = true
    }
}
const pre = () => { }
const next = () => { }

// 进度条
const percentage = ref(0)

// 播放记录
const recordVisible = ref(false)
const recentSongs = ref<Song[]>()
getRecentSong().then(res => {
    recentSongs.value = res.data.list.map(v => v.data)
})
const selectRowIndex = ref(-1)
const computedRowClassName = ({ row, rowIndex }: { row: any, rowIndex: any }) => {
    return (selectRowIndex.value === rowIndex) ? 'select-row' : ''
}
const handleRowClick = (song: Song) => {
    playerStore.$patch({
        currentSong: song
    })
    selectRowIndex.value = recentSongs.value!.findIndex(v => v.id === song.id)!
}
onMounted(() => {
    playerStore.initPlayer(playerEl.value)
    const mp = playerEl.value!
    const duration = computed(() => curSong.value.dt)
    mp.ontimeupdate = (e) => {
        currentTimeInSeconds.value = mp.currentTime
        percentage.value = mp.currentTime * 1000 / duration.value * 100
    }
    const flag = ref(false) // 未经用户交互 浏览器禁止自动播放
    mp.oncanplay = () => {
        if(flag.value){
            mp.play()
            isPaused.value = false
            return
        }
         flag.value = true
    }
    watch(() => playerStore.currentSong, async (song: Song) => {
        const { data: [{ url }] } = await getSongUrl(curSong.value.id)
        mp.src = url
    }, { immediate: true })

})

</script>

<style scoped lang="less">
</style>