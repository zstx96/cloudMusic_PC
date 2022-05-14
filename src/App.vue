<script setup lang="ts">
// 根据config设置#app的宽高

import { onMounted, ref } from 'vue'
import { resizeWindow } from '@/config'
import { useRouter } from 'vue-router'
import { getLoginStatus, getUserDetail } from './api/user'
import { useAppStore } from '@/store/appStore'

import { useUserStore } from './store/userStore'
import { getLikelist } from './api/songlist'

import { withLoading } from './utils/withLoading'
import { useDynamicRouter } from './utils/dynamicRouter'
import { useLocalStorage } from '@vueuse/core'
import FooterVue from '@/components/Footer.vue'
import { ElMessage } from 'element-plus'

const appStore = useAppStore()
const asideData = appStore.asideData
const userStore = useUserStore()

const router = useRouter()
useDynamicRouter(asideData, router)

const lastPage = useLocalStorage('lastPage', '/')
router.afterEach((to) => {
	lastPage.value = to.fullPath
})
router.beforeResolve((to) => {
	console.log(to.name)
})
onMounted(() => {
	resizeWindow()
})

const beforeEnterApp = async () => {
	return new Promise<void>((resolve, reject) => {
		const timer = setTimeout(() => {
			reject('请检查你的网络环境')
		}, 5000)
		getLoginStatus().then(({ data: { profile } }) => {
			if (profile) {
				const userId = profile.userId
				Promise.all([getUserDetail(userId), getLikelist(userId)]).then(([userInfo, res]) => {
					userStore.setUser(userInfo)
					userStore.$patch({
						likedIds: res.ids,
					})
					clearTimeout(timer)
					resolve()
				})
			} else {
				ElMessage.info('未登录，部分功能受限')
				reject('未登录，部分功能受限')
			}
		})
	})
}

const loaded = ref(false)
withLoading(beforeEnterApp)()
	.catch((reason) => {
		console.log(reason)
	})
	.finally(() => {
		router.replace(lastPage.value || '/')
		loaded.value = true
	})
</script>

<template lang="pug">
div(class=" flex-1 overflow-y-auto overflow-x-hidden font-light" )
  router-view(#default="{ Component }"  )
    keep-alive
      component(:is="Component")
div(v-if="loaded" )
    footer-vue
</template>

<style>
html,
body {
	height: 100%;
	width: 100%;
}

body {
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgb(126, 117, 81);
}

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	position: relative;
	display: flex;
	background: var(--el-bg-color);
	flex-direction: column;
	overflow: hidden;
	@apply antialiased;
}

.scale-enter-active,
.scale-leave-active {
	transform-origin: 5px 105%;
	transition: transform 0.3s ease;
}

.scale-enter-from,
.scale-leave-to {
	transform: scale(0);
}
</style>
