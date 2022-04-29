<template lang='pug'>
div(v-if="mvs" class=" flex flex-wrap gap-2   text-sm "
)
    div(v-for="item in mvs" class="w-[305px] flex-shrink-0 mb-3 rounded")
        div(class="relative")
            el-image(:src="item.imgurl" 
            fit="cover"
            lazy 
            class="w-[305px] h-[171px] cursor-pointer" 
            @click="$router.push({name: 'mv',params:{id:item.id}})")
            span(class=" absolute bottom-2 right-2 text-white") {{ dayjs(item.duration).format('mm:ss') }}
            play-count-inner-vue(:count="item.playCount")
        div(class="w-[305px] whitespace-nowrap text-ellipsis overflow-hidden")
            span()  {{ item.name }}
</template>

<script lang="ts" setup>
import { getArtistMv } from '@/api/artist';
import playCountInnerVue from '@/components/iconButton/playCountInner.vue';
import type { Mv } from '@/interface';
import dayjs from 'dayjs';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
dayjs

const id = parseInt(useRoute().params.id as string)

const hasMore = ref()
const mvs = ref<Mv[]>()

const emit = defineEmits<{
    (event: 'update:voidPage', flag: boolean): void
}>()
// getArtistAllMv()
getArtistMv(id).then(res => {
    if (res.mvs.length) {
        mvs.value = res.mvs
        hasMore.value = res.hasMore
    } else {
        // debugger
        emit("update:voidPage", true)
    }
})

</script>

<style scoped lang="less">
</style>