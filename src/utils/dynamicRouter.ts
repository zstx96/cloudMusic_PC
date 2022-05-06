import type { Nav } from '@/interface'
import { RouteRecordRaw } from 'vue-router'
import type { Router } from 'vue-router'
import { notEmptyArray } from './help'

const modules = import.meta.glob('../views/**/*.vue')

const firstWordUpper = (str: string) =>
	str.replace(/^\S/, (s) => s.toUpperCase())

const useDynamicRouter = (navs: Nav, router: Router) => {
	const base = '../views'
	const addRouterWithData = (
		navs: Nav,
		nameArr: { name: string; options: { id: boolean } }[]
	) => {
		navs.forEach((navItem) => {
			const name = navItem.name
			let path = ''
			let moduleKey = base

			if (nameArr.length) {
				nameArr.forEach((v) => {
					moduleKey += `/${v.name}/children`
				})
				path = name
			} else {
				if (name === 'layout') {
					path = '/'
				} else {
					path = '/' + name
				}
			}
			path += navItem.params?.id ? '/:id' : ''
			moduleKey += `/${name}/${firstWordUpper(name)}.vue`

			const record: RouteRecordRaw = {
				name,
				path,
				component: modules[moduleKey],
				redirect: navItem.redirect && { name: navItem.redirect },
			}

			if (notEmptyArray(nameArr)) {
				const parentName = nameArr[nameArr.length - 1].name
				router.addRoute(parentName!, record)
			} else {
				router.addRoute(record)
			}
			if (navItem.children?.length) {
				addRouterWithData(navItem.children, [
					...nameArr,
					{
						name,
						options: {
							id: !!navItem.params?.id,
						},
					},
				])
			}
		})
	}
	addRouterWithData(navs, [])

	router.addRoute({
		path: '/:pathMatch(.*)*',
		component: () => import('../views/404.vue'),
	})
}

export { useDynamicRouter }
