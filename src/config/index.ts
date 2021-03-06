import { computed, ref, watchEffect } from 'vue'
export const APP_BASE_WIDTH = 1180
export const APP_BASE_HEIGHT = 670
const APP_HEADER_HEIGHT = 60
const APP_CONTROLLER_HEIGHT = 70

/**
 * @description app的高度
 */
export const app_height = ref(APP_BASE_HEIGHT)

/**
 * @description app的宽度
 */
export const app_width = ref(APP_BASE_WIDTH)

/**
 * @description app底部控制栏的高度
 */
export const app_controller_height = APP_CONTROLLER_HEIGHT
/**
 * @description app头部工具栏的高度
 */
export const app_header_height = APP_HEADER_HEIGHT
/**
 * @description app main区域的高度
 */
export const app_main_height = computed(() => app_height.value - app_header_height - app_controller_height)

export const resizeWindow = () => {
	watchEffect(() => {
		const app = document.getElementById('app')!
		app.style.width = app_width.value + 'px'
		app.style.height = app_height.value + 'px'
	})
}
