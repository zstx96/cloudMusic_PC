<template lang='pug'>
el-carousel( v-if="appStore.banners.length" type="card"  height="200px" indicator-position="none")
    el-carousel-item(v-for="item in appStore.banners" class="rounded overflow-hidden")
        img(:src="item.pic")
div(class="" )
    p(class=" font-bold text-xl") 推荐歌单>
    div(class="flex gap-4 w-full  xl:m-auto  flex-wrap ")
        div(class="flex flex-col   w-[18%]   break-words" v-for="(item, index) in recommendList" )
            div(class="relative cursor-pointer" @mouseover="hoverList = index")
                img(:src="item.picUrl" class="rounded"  @click="$router.push(`/playlist?id=${item.id}`)"  )
                play-inner-red-vue(class="absolute bottom-2 right-2 z-[10000] transition  duration-500" :class="[hoverList === index ? '' : ' hidden']")
                play-count-inner-vue(:count="item.playcount" class="absolute top-1 right-2")
            p(v-text="item.name" class="text-sm") 


</template>

<script lang="ts" setup>
import { useAppStore } from '@/store/appStore';
import { getDailyPlaylist, getRecommendSongList } from "@/api/songlist"
import { computed, ref } from 'vue';
import type { Playlist } from '@/interface/interface';
import playInnerRedVue from '@/components/iconButton/playInnerRed.vue';
import playCountInnerVue from '@/components/iconButton/playCountInner.vue';
import { app_width } from '@/config';
const appStore = useAppStore()

const recommendList = ref<Playlist[]>()
const hoverList = ref()
getDailyPlaylist().then(res => {
    recommendList.value = res.recommend
})


</script>

<style scoped lang="less">
</style>