<template lang="pug">
div
    div(class="relative cursor-pointer overflow-hidden" 
        @click="$router.push(`/dailyRecommendSongs`)"  
    )
        p(class="absolute w-full z-10 text-white bg-slate-500 px-1 py-2 bg-opacity-40  text-sm -translate-y-full transition-transform duration-300" 
            :class="[dailyDescVisible&&' translate-y-0']" 
        ) 根据你的音乐口味每日生成
        el-image(src="https://p2.music.126.net/6-ODonIQbSgK-h9TK-_jYw==/109951167191096963.jpg?imageView" 
            class="rounded blur-xl"  
        )
        div(class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-125")
            svg-date-vue(class="")
        play-inner-red-vue(class="absolute bottom-2 right-2 z-[1000] transition  duration-500" :class="[hoverElIndex === -1 ? '' : ' hidden']")
    p(v-text="'每日推荐歌曲'" class="text-sm") 
</template>

<script lang="ts" setup>
import playInnerRedVue from './iconButton/playInnerRed.vue'
import SvgDateVue from './iconButton/SvgDate.vue'
defineProps<{
	dailyDescVisible: boolean
	hoverElIndex: number
}>()
</script>

<style scoped lang="less"></style>
