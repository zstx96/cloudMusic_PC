import { computed } from 'vue'
import { useRoute } from 'vue-router'

const useRouteParam = (key: string, { route = useRoute() } = {}) => {
	return computed(() => {
		const data = route.params[key]
		return data
	})
}

export { useRouteParam }
