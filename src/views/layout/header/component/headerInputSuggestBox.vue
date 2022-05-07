<template lang="pug">
div(class="suggest-box text-black")
    div(class="flex gap-2 items-center text-sm text-app-gray")
        span 搜索历史
        el-icon(@click="deleteAll")
            el-icon-delete
        span.flex-1
        span 查看全部
    div(class="py-3 h-[120px] overflow-hidden") 
        //- FIXME 搜索历史框高度是固定的，应该是[0,max]
        el-button(v-for="word in searchRecord" round class="mb-1 border " size="small"  )
            span {{ word }}
            el-icon(@click="deleteSingle(word)")
                el-icon-close
    p(class="text-sm text-app-gray pb-3") 热搜榜
    div
        div(v-for="(item, index) in hotSearch" 
        @click="$emit('selectWord', item.searchWord)"
        class="w-[350px] -translate-x-5 px-5 hover:bg-[#f2f2f2] flex gap-3 py-2 cursor-pointer")  
            div.w-8( v-text="index + 1" :class="[index <= 2 && 'text-red-500']") 
            span.font-medium(v-text="item.searchWord")
            span(class="text-sm text-app-gray" v-text="item.score")

</template>

<script lang="ts" setup>
import { getHotSearchDetail } from '@/api/search'
import { useRecordStore } from '@/store/recordStore'
import { ref } from 'vue'

const recordStore = useRecordStore()

// 搜索历史 本地
const searchRecord = recordStore.searchRecord

const deleteAll = () => {
	recordStore.clearSearchRecord()
}
const deleteSingle = (v: string) => {
	recordStore.removeSearchRecord(v)
}
const hotSearch = ref<{ searchWord: string; score: number }[]>()
getHotSearchDetail().then((res) => {
	hotSearch.value = res.data
})
</script>

<style scoped lang="less"></style>
