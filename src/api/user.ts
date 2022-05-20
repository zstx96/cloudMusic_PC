import type { Follower, PersonalizedMv, User, UserProfile } from '@/interface'
import { FMResponse } from '@/interface/fm'
import Service from '@/utils/Service'

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
			account: unknown
			profile: UserProfile
		}
	}>('/login/status')
}
export function getUserDetail(uid: number) {
	return Service.get<User>(`/user/detail?uid=${uid}`)
}
export function getPersonalFm() {
	return Service.get<FMResponse>('/personal_fm')
}
export function getPersonalizedMv() {
	return Service.get<{
		code: number
		category: number
		result: PersonalizedMv[]
	}>('/personalized/mv')
}
