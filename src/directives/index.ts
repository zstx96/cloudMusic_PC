import type { App } from 'vue'

const modules = import.meta.glob('./modules/*.ts')

const myDirectives = {
	install: (app: App) => {
		Object.keys(modules).forEach((v) => {
			console.log(v, modules[v])
		})

		console.log(modules)
	},
}

export { myDirectives }
