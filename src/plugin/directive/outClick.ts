import { Directive, Plugin } from 'vue'

const outClick: Plugin = {
	install(app) {
		const outClick: Directive = {
			mounted(el: HTMLElement, binding, vnode, pre) {
				const handler = binding.value
				window.addEventListener('click', (event: MouseEvent) => {
					const target = event.target as HTMLElement
					if (!el.contains(target!)) {
						console.log('out click')

						handler()
					}
				})
			},
		}
		app.directive('out-click', outClick)
	},
}
export default outClick
