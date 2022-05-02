<template lang="pug">
div(@click="$router.push({name:'playlist',params:{id:data[0].id}})" class='overflow-hidden' )
    el-image(:src="data[0].coverImgUrl+'?params=200y200'" class="w-14 h-14 shrink-0")
    div
        p(class="ellipsis") 歌单：
            span() {{data[0].name}}
        p(class="text-xs text-app-gray") 歌曲：{{formatNumber(data[0].trackCount)}}，播放：{{formatNumber(data[0].playCount)}}
</template>

<script lang="ts" setup>
import type { Playlist } from '@/interface'
import { formatNumber } from '@/utils/format'
defineProps<{ data: Playlist[] }>()
</script>

<style scoped lang="less"></style>
