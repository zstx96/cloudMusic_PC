import type { User } from '@/interface'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const useUserStore = defineStore('user', () => {
	const user = ref<User | null>()
	const isLogin = ref(false)
	const likedIds = ref<number[]>()

	const setUser = (value: User | null) => {
		user.value = value
		isLogin.value = true
	}
	const addLikeSong = (id: number) => {
		if (likedIds.value!.includes(id)) return
		likedIds.value!.push(id)
	}

	const deleteLikeSong = (id: number) => {
		const index = likedIds.value!.findIndex((v) => v === id)

		likedIds.value!.splice(index, 1)
	}
	return {
		user,
		setUser,
		isLogin,
		likedIds,
		addLikeSong,
		deleteLikeSong,
	}
})

export { useUserStore }
