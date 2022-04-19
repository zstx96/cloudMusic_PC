<template lang='pug'>
div(class="pt-2")
    div(v-for="(group, groupIndex) in asideData")
        div(v-if="group.title"  v-text="group.title")
        div()
            div(v-for="(navItem, navIndex) in group.children" 
            class="flex items-center mb-1 py-1  hover:bg-app-gray rounded " 
            :class="[groupIndex === focusGroup && navIndex === focusNav ? 'bg-app-gray font-bold  text-xl' : '']"
            @click="handelClick(navItem.path, groupIndex, navIndex)")
                img(v-if="navItem.iconUrl" class=" w-5 h-5 " :src="navItem.iconUrl")
                span(v-text="navItem.title" class="pl-1" )

</template>

<script lang="ts" setup>
import type { NavItem } from '@/interface';
import { ref } from 'vue';
import { useRouter } from 'vue-router';


type Aside = Array<{ title?: string, children: NavItem[] }>
const asideData: Aside = [
    {
        children: [
            {
                title: "发现音乐",
                path: "/discovery",
            },
            {
                title: "播客",
                path: "/djradio",
            },
            {
                title: "视频",
                path: "/video",
            },
            {
                title: "关注",
                path: "/follows",
            },
            {
                title: "直播",
                path: "/live",
            },
            {
                title: "私人FM",
                path: "/fm",
            },



        ]
    }
]

const focusGroup = ref(0)
const focusNav = ref(0)

const router = useRouter()
const handelClick = (path: string, group: number, nav: number) => {
    router.push(path)
    focusGroup.value = group
    focusNav.value = nav
}

</script>

<style scoped lang="less">
</style>