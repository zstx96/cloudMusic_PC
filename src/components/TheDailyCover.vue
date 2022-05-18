<template lang="pug">
div
    div(class="relative cursor-pointer overflow-hidden" )
        p(class="absolute w-full z-10 text-white bg-slate-500 px-1 py-2 bg-opacity-40  text-sm -translate-y-full transition-transform duration-300" 
            :class="[dailyDescVisible&&' translate-y-0']" 
        ) 根据你的音乐口味每日生成
        el-image(src="https://p2.music.126.net/6-ODonIQbSgK-h9TK-_jYw==/109951167191096963.jpg?imageView" 
            class="rounded"  
            @click="$router.push(`/dailyRecommendSongs`)"  
        )
        play-inner-red-vue(class="absolute bottom-2 right-2 z-[1000] transition  duration-500" :class="[hoverElIndex === -1 ? '' : ' hidden']")
    p(v-text="'每日推荐歌曲'" class="text-sm") 
</template>

<script lang="ts" setup>
import playInnerRedVue from './iconButton/playInnerRed.vue'

defineProps<{
	dailyDescVisible: boolean
	hoverElIndex: number
}>()
</script>

<style scoped lang="less"></style>
