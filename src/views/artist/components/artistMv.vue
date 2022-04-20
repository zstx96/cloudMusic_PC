<template lang='pug'>
div(v-if="mvs" class=" flex flex-wrap   justify-between  text-sm "
v-infinite-scroll="load"
)
    div(v-for="item in mvs" class="w-[305px] flex-shrink-0 mb-3")
        div(class="relative")
            el-image(:src="item.imgurl" 
            fit="cover"
            lazy 
            class="w-[305px] h-[171px] cursor-pointer" 
            @click="$router.push(`/mv?id=${item.id}`)")
            span(class=" absolute bottom-2 right-2 text-white") {{dayjs(item.duration).format('mm:ss')}}
            play-count-inner-vue(:count="item.playCount")
        div(class="w-[305px] whitespace-nowrap text-ellipsis overflow-hidden")
            span()  {{ item.name }}

</template>

<script lang="ts" setup>
import { getArtistAllMv, getArtistMv } from '@/api/artist';
import playCountInnerVue from '@/components/iconButton/playCountInner.vue';
import type { Mv } from '@/interface';
import dayjs from 'dayjs';
import { ref } from 'vue';
dayjs

const props = defineProps<{ id: number }>()
const id = props.id

const hasMore = ref()
const mvs = ref<Mv[]>()
getArtistMv(id).then(res => {
    mvs.value = res.mvs
    hasMore.value = res.hasMore
})
// getArtistAllMv()

const load=()=>{

}
</script>

<style scoped lang="less">
</style>