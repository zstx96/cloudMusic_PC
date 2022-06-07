import { Plugin } from 'vue'

const modules = import.meta.globEager('./directive/*.ts')
console.log(modules)

const directives: Plugin = {
	install(app) {
		Object.values(modules).forEach((v) => {
			app.use(v.default)
		})
	},
}

export { directives }
