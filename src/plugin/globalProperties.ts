import { App, Plugin } from 'vue'
import dayjs from 'dayjs'
import { useUserStore } from '@/store/userStore'
import type { GotoParams } from '@/interface'
import { useRouter } from 'vue-router'
import { watchOnce } from '@vueuse/core'

const configDayjs = (app: App) => {
	app.config.globalProperties.$dayjs = dayjs
}

const configUser = (app: App) => {
	watchOnce(
		() => useUserStore().user,
		(user) => {
			app.config.globalProperties.$user = user
		}
	)
}
const configGoto = (app: App) => {
	const router = useRouter()
	const goto = (name: string, params?: GotoParams) => {
		if (!params) {
			router.push({ name })
		} else if (name === 'song') {
			router.push({ name, query: { id: params.id } })
		} else if (params.keyword) {
			router.push({ name, query: { keyword: params.keyword } })
		} else if (params.id) {
			router.push({ name, params: { id: params.id } })
		}
	}
	app.config.globalProperties.$goto = goto
}

const globalProperties: Plugin = {
	install(app) {
		;[configDayjs, configUser, configGoto].forEach((fn) => {
			fn(app)
		})
	},
}

export { globalProperties }
