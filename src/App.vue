<script setup lang="ts">
// 根据config设置#app的宽高

import { onMounted, ref } from 'vue'
import { resizeWindow } from '@/config'
import { useRouter } from 'vue-router'
import { getLoginStatus } from './api/user'
import { useAppStore } from '@/store/appStore'
import { useUserStore } from '@/store/userStore'

import { withLoading } from './utils/withLoading'
import { useDynamicRouter } from './utils/dynamicRouter'
import { useLocalStorage } from '@vueuse/core'
import FooterVue from '@/components/TheFooter.vue'
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

onMounted(() => {
	resizeWindow()
})

// 开场加载（user，ids） 最多等5s
const beforeEnterApp = async () => {
	return new Promise<void>((resolve, reject) => {
		const timer = setTimeout(() => {
			reject('请检查你的网络环境')
		}, 5000)
		getLoginStatus().then(async ({ data: { profile } }) => {
			if (profile) {
				const userId = profile.userId
				await Promise.all([userStore.fetchUser(userId), userStore.fetchLikeIds(userId)])
				clearTimeout(timer)
				resolve()
			} else {
				ElMessage.info('未登录，部分功能受限')
				reject('未登录，部分功能受限')
			}
		})
	})
}
// Service.get('/login/refresh', { params: { timestamps: +new Date() } })
const loaded = ref(false)
withLoading(beforeEnterApp, { target: '#app' })()
	.catch((reason) => {
		throw new TypeError(reason)
	})
	.finally(() => {
		router.replace(lastPage.value || '/')
		loaded.value = true
	})
</script>

<template lang="pug">
div(class=" flex-1 overflow-y-auto overflow-x-hidden font-light"  v-if="loaded")
  router-view(#default="{ Component }"  )
    keep-alive
      component(:is="Component")
div(class="footer")
    footer-vue(v-if="$route.name !== 'mv'")
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
