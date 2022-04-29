<template lang='pug'>
div(v-if="result")
    p.text-xl.font-bold 搜索 {{ keyword }}
    h3(class=" text-app-gray text-sm py-2") 你可能感兴趣
    div(class="flex ")
        div(v-for="item in result.orders" class="bg-slate-200 h-16 m-4 rounded cursor-pointer  w-1/3") 
            component(:is="loadComponent(item)" :data="result[item]")
    el-tabs(:active-name="activeName" @tab-change="handleTabChange")
        el-tab-pane(v-for="item in tabs" :name="item.name" :label="item.label")
    div
        router-view(:key="JSON.stringify($route.query.keyword)")
</template>

<script lang="ts" setup>
import { getMultimatch, getSearchResult } from '@/api/search';
import { SearchType } from '@/enum';
import { useRouteQuery } from '@vueuse/router';
import type { TabPanelName } from 'element-plus';
import { defineAsyncComponent, ref, shallowRef } from 'vue';
import type { Ref } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';


const router = useRouter()
const route = useRoute()
const keyword = useRouteQuery('keyword') as Ref<string>

type SearchTypeKey = keyof typeof SearchType
const tabs: { label: string, name: `${SearchTypeKey}Result` }[] = [
    {
        label: "单曲",
        name: "songResult"
    },
    {
        label: "歌手",
        name: "artistResult"
    },
    {
        label: "专辑",
        name: "albumResult"
    },
    {
        label: "视频",
        name: "mvResult"
    },
    {
        label: "歌单",
        name: "playlistResult"
    },
    {
        label: "歌词",
        name: "lyricResult"
    },
    {
        label: "博客",
        name: "radioResult"
    },
    {
        label: "声音",
        name: "voiceResult"
    },
    {
        label: "user",
        name: "userResult"
    },
]
const activeName = ref(route.name as string)
const result = ref<Awaited<ReturnType<typeof getMultimatch>>["result"]>()
getMultimatch(keyword.value).then(res => {
    result.value = res.result
})

const handleTabChange = (name: TabPanelName) => {
    const path = router.getRoutes().find(v => v.name === name)?.path
    router.push(`${path}?keyword=${keyword.value}`)
    getSearchResult(keyword.value, SearchType[name as unknown as SearchTypeKey])
}
// vue component动态导入组件
const loadComponent =(name:string)=>defineAsyncComponent(()=>import(`./components/${name}.vue`))




</script>

<style scoped lang="less">
</style>