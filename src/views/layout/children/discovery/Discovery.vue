<template>
	<div class="flex flex-col overflow-x-hidden">
		<el-tabs v-model="activeName" class="text-inherit" @tab-click="handelClick"
			><el-tab-pane
				v-for="subNav in subNavs"
				:key="subNav.name"
				:class="[activeName == subNav.name && 'is-active', 'text-inherit']"
				:name="subNav.name"
				:label="subNav.title"
			>
			</el-tab-pane
		></el-tabs>
		<div class="m-auto flex-1 overflow-y-auto" :style="{ width: `${contentWidht}px` }">
			<router-view v-slot="{ Component }"
				><transition name="fade"
					><keep-alive><component :is="Component"></component></keep-alive></transition
			></router-view>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { getBanners } from '@/api/app'
import { app_width } from '@/config'
import { useAppStore } from '@/store/appStore'

const appStore = useAppStore()
const subNavs = appStore.asideData![0].children![0].children!

getBanners().then((res) => {
	appStore.setBanners(res.banners)
})

const route = useRoute()

const activeName = ref(route.path.split('/').at(-1))

const router = useRouter()
interface Pane {
	uid: number
	slots: {
		[x: string]: import('vue').Slot | undefined
	}
	props: {
		readonly disabled: boolean
		readonly name: import('element-plus/es/utils').BuildPropType<
			readonly [StringConstructor, NumberConstructor],
			unknown,
			unknown
		>
		readonly label: string
		readonly closable: boolean
		readonly lazy: boolean
	}
	paneName: string | number | undefined
	active: boolean
	index: string | undefined
	isClosable: boolean
}
const handelClick = (pane: Pane) => {
	activeName.value = pane.paneName as string
	router.push({ name: pane.paneName as string })
}

const maxWidth = 1100

const padding = 40
const app_aside = 200
const scroll_width = 17
const contentWidht = computed(() => {
	if (app_width.value - app_aside - padding - scroll_width >= maxWidth) {
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
