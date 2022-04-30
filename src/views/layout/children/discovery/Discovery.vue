<template lang='pug'>
div(class="flex overflow-x-hidden  flex-col")
    el-tabs( v-model="activeName"    @tab-click="handelClick")
        el-tab-pane(v-for="(subNav, index) in subNavs" 
        :class="[(activeName == subNav.name) && 'is-active']"
        :name="subNav.name"
        :label="subNav.title")  
    div(class="flex-1 overflow-y-auto  m-auto" :style="{ 'width': `${contentWidht}px` }")
        router-view(#default="{ Component }")
            transition(name="fade")
                keep-alive()
                    component(:is="Component" )
</template>

<script lang="ts" setup>
import { getBanners } from '@/api/app'
import { app_width } from '@/config'
import { useAppStore } from '@/store/appStore'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'


const appStore = useAppStore()
const subNavs = appStore.asideData![0].children![0].children!

getBanners().then(res => {
	appStore.setBanners(res.banners)
})

const route = useRoute()

const activeName = ref(route.path.split('/').at(-1))

const router = useRouter()
interface Pane {
    uid: number;
    instance: import('vue').ShallowReactive<import('vue').ComponentInternalInstance>;
    props: {
        readonly disabled: boolean;
        readonly name: import('element-plus/es/utils').BuildPropType<readonly [StringConstructor, NumberConstructor], unknown, unknown>;
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
	console.log(pane.paneName)
	activeName.value = pane.paneName as string
	router.push({ name: pane.paneName as string })
}

const maxWidth = 1100

const padding = 40
const app_aside = 200
const scroll_width = 17
const contentWidht = computed(() => {
	if ((app_width.value - app_aside - padding - scroll_width) >= maxWidth) {
		return maxWidth
	}
	return app_width.value - app_aside - padding - scroll_width
})

</script>

<style scoped lang="less">
:deep(.is-active) {
    font-weight: 500;
    font-size: x-large;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>