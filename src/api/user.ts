import type { Follower, User, UserProfile } from '@/interface'
import Service from '@/utils/Service'

/*
 * @作者: zhao
 * @Date: 2021-12-04 17:22:28
 * @上次更新作者: your name
 * @上次更新时间: Do not edit
 * @描述: file content
 */

export function getFollows(id: number, limit?: number, offset?: number) {
	return Service.get<{
		follow: Follower[]
		more: boolean
		touchCount: number
	}>('/user/follows', {
		params: {
			uid: id,
			limit,
			offset,
		},
	})
}

export function logout() {
	return Service.get('/logout')
}
export function refresh() {
	return Service.get('/login/refresh')
}
export function getUserAccount() {
	return Service.get('/user/account')
}
export function getLoginStatus() {
	return Service.get<{
		data: {
			code: number
			account: any
			profile: UserProfile
		}
	}>('/login/status')
}
export function getUserDetail(uid: number) {
	return Service.get<User>(`/user/detail?uid=${uid}`)
}
