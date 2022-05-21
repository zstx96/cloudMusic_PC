/// <reference types="vite/client" />
import { User } from './interface'
import { usePlayerStore } from '@/store/playerStore'
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
		$goto: (
			name: string,
			params?: {
				id?: number
				keyword?: string
			}
		) => void
		$user: User
		$player: ReturnType<typeof usePlayerStore>
	}
}

interface ImportMetaEnv {
	readonly VITE_BASE_URL: string
	// 更多环境变量...
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
