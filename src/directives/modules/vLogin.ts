import { useUserStore } from '@/store/userStore'
import type { App, Directive } from 'vue'

const useLoginDirective = (app: App) => {
	const userStore = useUserStore()
	const isLogin = !!userStore.user
	const directive: Directive = {
		created(el, bindings) {
			if (isLogin) {
				console.log('已经登陆了')
			}
		},
	}
	app.directive('login', directive)
}

export default useLoginDirective
