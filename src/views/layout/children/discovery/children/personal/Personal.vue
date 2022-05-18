<template lang="pug">
div()
    el-carousel( v-if="appStore.banners.length" type="card"  height="200px" indicator-position="none")
        el-carousel-item(v-for="item in appStore.banners" class="rounded overflow-hidden")
            img(:src="item.pic")
    div(v-if="recommendList")
        p(class=" font-bold text-xl") 推荐歌单>
        div(class="  xl:m-auto  grid  grid-cols-5  gap-2")
            div(class="flex flex-col break-words relative "  )
                the-daily-cover-vue(:daily-desc-visible="dailyDescVisible" :hover-el-index="hoverElIndex" @mouseover="hoverDaily" @mouseleave="handleMouseLeave()")
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
import coverVue from '@/components/Cover.vue'
import TheDailyCoverVue from '@/components/TheDailyCover.vue'

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
