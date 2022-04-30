<template lang='pug'>
div(class="h-full px-2 flex gap-3 items-center " @click="$router.push({name:'artist',params:{id:data[0].id}})" )
    el-avatar(:src="data[0].img1v1Url")
    div
        div(class="text-sm")
            span 歌手:  
            span(v-for="item in data[0].name") {{item}}
        p(class=" text-app-gray text-xs")  粉丝：{{data[0].fansCount}}，歌曲：{{data[0].musicSize}}
</template>

<script lang="ts" setup>
import type { Artist } from '@/interface'
defineProps<{data:Artist[]}>()
</script>

<style scoped lang="less">

</style>