/// <reference types="vite/client" />

import dayjs from 'dayjs'

declare module '*.vue' {
	import type { DefineComponent } from 'vue'
	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
	const component: DefineComponent<{}, {}, any>
	export default component
}
declare module 'vue' {
	interface ComponentCustomProperties {
		$dayjs: typeof dayjs
	}
}

interface ImportMetaEnv {
	readonly VITE_BASE_URL: string
	// 更多环境变量...
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
