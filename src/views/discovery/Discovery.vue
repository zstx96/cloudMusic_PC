<template lang='pug'>
div(class="flex flex-col")
    el-affix
        el-tabs(v-model="activeName"    @tab-click="handelClick")
            el-tab-pane(v-for="(subNav, index) in subNavs" 
            :class="[(activeName == subNav.path) && 'is-active']"
            :name="subNav.path"
            :label="subNav.title")  
    div( class="flex-1 overflow-x-hidden  overflow-y-scroll  m-auto" :style="{'width':`${contentWidht}px`}")
        router-view(#default="{Component}")
            keep-alive()
                component(:is="Component")
</template>

<script lang="ts" setup>
import { getBanners } from '@/api/app';
import { app_width } from '@/config';
import { useAppStore } from '@/store/appStore';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';


const appStore = useAppStore()
const subNavs = appStore.asideData.find(item => item.path === 'discovery')?.children

getBanners().then(res => {
    appStore.setBanners(res.banners)
})
const activeName = ref("personal")

const router = useRouter()
interface Pane {
    uid: number;
    instance: import("vue").ShallowReactive<import("vue").ComponentInternalInstance>;
    props: {
        readonly disabled: boolean;
        readonly name: import("element-plus/es/utils").BuildPropType<readonly [StringConstructor, NumberConstructor], unknown, unknown>;
        readonly label: string;
        readonly closable: boolean;
        readonly lazy: boolean;
    };
    paneName: string | number | undefined;
    active: boolean;
    index: string | undefined;
    isClosable: boolean;
}

const handelClick = (pane: Pane) => {
    console.log(pane.index)
    activeName.value = pane.paneName as string

    router.push(`/discovery/${pane.paneName}`)
}

const maxWidth = 1100
const contentWidht = computed(() => {
    if ((app_width.value - 200) >= maxWidth) {
        return maxWidth
    }
    return app_width.value - 200
})

</script>

<style scoped lang="less">
:deep(.is-active) {
    font-weight: 500;
    font-size: x-large;
}
</style>