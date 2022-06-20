import { Plugin } from 'vue'

const modules = import.meta.globEager('./directive/*.ts')

const directives: Plugin = {
	install(app) {
		Object.values(modules).forEach((v) => {
			app.use(v.default)
		})
	},
}

export { directives }
