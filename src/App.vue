<script setup lang="ts">
// 根据config设置#app的宽高

import { onMounted } from 'vue'
import { resizeWindow } from '@/config'
import { useRouter } from 'vue-router'
import { getLoginStatus, getUserDetail } from './api/user'
import { useAppStore } from '@/store/appStore'

import type { Nav } from './interface'
import type { RouteRecordRaw } from 'vue-router'
import { useUserStore } from './store/userStore'
import { getLikelist } from './api/songlist'
import playerVue from './components/player/player.vue'
import { useLocalStorage } from '@vueuse/core'
import { withLoading } from './utils/withLoading'
import { ElMessage } from 'element-plus'

const appStore = useAppStore()
const asideData = appStore.asideData
const router = useRouter()
const userStore = useUserStore()

const firstWordUpper = (str: string) =>
	str.replace(/^\S/, (s) => s.toUpperCase())

const modules = import.meta.glob('./views/**/*.vue')

const addRecordToRouter = (parentPath: string, navs: Nav, needId = false) => {
	navs.forEach((nav) => {
		let routeName
		if (parentPath === '') {
			routeName = '/'
		} else {
			routeName = parentPath
				.split('/')
				.at(parentPath.includes('/:id') ? -3 : -2)
		}

		const path =
			parentPath.replaceAll('/children', '') +
			'/' +
			nav.name +
			(nav.params?.id ? '/:id' : '')
		const name = nav.name === '/' ? 'layout' : nav.name
		const url = `./views${parentPath.replace('/:id', '')}/${
			nav.name
		}/${firstWordUpper(name)}.vue`

		const record: RouteRecordRaw = {
			path: path.replace('/layout', ''),
			name,
			component: modules[url],
		}
		if (nav.children) {
			record.redirect = { name: nav.children[0].name }
		}
		router.addRoute(routeName || 'layout', record)
		if (nav.children) {
			addRecordToRouter(
				parentPath +
					'/' +
					nav.name +
					'/children' +
					(nav.params?.id ? '/:id' : ''),
				nav.children,
				Boolean(nav.params?.id)
			)
		}
	})
}

addRecordToRouter('', asideData)
router.addRoute('/', {
	redirect: 'layout',
	path: '/',
})
router.addRoute('/', {
	path: '/:pathMatch(.*)*',
	component: () => import('../src/views/404.vue'),
})

const lastPage = useLocalStorage('lastPage', '')
router.replace(lastPage.value)

router.afterEach((to) => {
	lastPage.value = to.fullPath
})
onMounted(() => {
	resizeWindow()
})

const beforeEnterApp = async () => {
	const timer = setTimeout(() => {
		return Promise.reject('请检查你的网络环境')
	}, 5000)
	try {
		const {
			data: { profile },
		} = await getLoginStatus()
		if (profile) {
			const userId = profile.userId
			Promise.all([getUserDetail(userId), getLikelist(userId)]).then(
				([userInfo, res]) => {
					userStore.setUser(userInfo)
					userStore.$patch({
						likedIds: res.ids,
					})
					clearTimeout(timer)
					return Promise.resolve()
				}
			)
		}
	} catch (err) {
		return Promise.reject(err)
	}
}

withLoading(beforeEnterApp)().catch((err) => {
	ElMessage.error(err)
})
</script>

<template lang="pug">
div(class=" flex-1 overflow-y-auto overflow-x-hidden font-light" )
  router-view(#default="{ Component }"  )
    keep-alive
      component(:is="Component")
div( )
  player-vue
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
	color: var(--app-text);
	position: relative;
	display: flex;
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
