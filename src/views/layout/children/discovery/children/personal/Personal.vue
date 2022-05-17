<template lang="pug">
div()
    el-carousel( v-if="appStore.banners.length" type="card"  height="200px" indicator-position="none")
        el-carousel-item(v-for="item in appStore.banners" class="rounded overflow-hidden")
            img(:src="item.pic")
    div(v-if="recommendList")
        p(class=" font-bold text-xl") 推荐歌单>
        div(class="  xl:m-auto  grid  grid-cols-5  gap-2")
            div(class="flex flex-col break-words relative "  )
                div(class="relative cursor-pointer overflow-hidden" 
                    @mouseover="hoverDaily"
                    @mouseleave="handleMouseLeave()"
                )
                    p(class="absolute z-10 text-white bg-slate-500 bg-opacity-40 p-2 text-sm -translate-y-full transition-transform duration-300" 
                    :class="[dailyDescVisible&&' translate-y-0  ']" ) 根据你的音乐口味每日生成
                    el-image(src="https://p2.music.126.net/6-ODonIQbSgK-h9TK-_jYw==/109951167191096963.jpg" 
                    class="rounded"  
                    @click="$router.push(`/dailyRecommendSongs`)"  )
                    play-inner-red-vue(class="absolute bottom-2 right-2 z-[10000] transition  duration-500" :class="[hoverElIndex === -1 ? '' : ' hidden']")
                p(v-text="'每日推荐歌曲'" class="text-sm") 
            div( v-for="(item, index) in recommendList")
                cover-vue(:pic-url="item.picUrl" 
                    v-model:hoverElIndex="hoverElIndex"
                    :playcount="item.playcount" 
                    :index="index"
                    @click="$router.push({name:'playlist',params:{id:item.id}})" 
                    @mouseleave="handleMouseLeave(index)"
                )
                p(v-text="item.name" class="text-sm") 
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store/appStore'
import { getDailyPlaylist } from '@/api/songlist'
import { ref } from 'vue'
import type { Playlist } from '@/interface/interface'
import playInnerRedVue from '@/components/iconButton/playInnerRed.vue'
import coverVue from '@/components/Cover.vue'
const appStore = useAppStore()

const recommendList = ref<Playlist[]>()
const hoverElIndex = ref(-2)
getDailyPlaylist().then((res) => {
	recommendList.value = res.recommend
})

const dailyDescVisible = ref(false)
const hoverDaily = () => {
	hoverElIndex.value = -1
	dailyDescVisible.value = true
}

const handleMouseLeave = (index?: number) => {
	if (index === undefined) {
		dailyDescVisible.value = false
	}
	hoverElIndex.value = -2
}
</script>

<style scoped lang="less"></style>
