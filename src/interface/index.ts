export * from './interface'
export * from './user'
export * from '../enum'
export * from './Artist'
export * from './Album'
export * from './mv'
export * from './video'

export type PlayMode = 'loop' | 'single' | 'shuffle'

export type AxiosReturnType<F extends () => Promise<any>> = Awaited<ReturnType<F>>
export interface NavItem {
	iconUrl?: string
	title?: string
	name: string
	children?: Nav
	isMainPage?: boolean
	component?: any

	redirect?: string
	params?: {
		id: boolean
	}
	group?: string
}
export interface NavGroup {
	title?: string
	children: NavItem[]
}
export type Nav = NavItem[]

export interface GotoParams {
	id?: number
	keyword?: string
}
