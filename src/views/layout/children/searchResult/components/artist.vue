<template lang='pug'>
div(v-if="artist" class="h-full px-2 flex gap-3 items-center " @click="$router.push({name:'artist',params:{id:artist.id}})" )
    el-avatar(:src="artist.img1v1Url")
    div
        div(class="text-sm")
            span 歌手:  
            span(v-for="item in artist.name") {{item}}
        p(class=" text-app-gray text-xs")  粉丝：{{artist.fansCount}}，歌曲：{{artist.musicSize}}
</template>

<script lang="ts" setup>
import type { Artist } from '@/interface';
const props = defineProps<{data:Artist[]}>()
const artist = props.data[0]
</script>

<style scoped lang="less">

</style>