import { getLikelist } from '@/api/songlist'
import { getUserDetail } from '@/api/user'
import type { Playlist, User } from '@/interface'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const useUserStore = defineStore('user', () => {
	const user = ref<User | null>()
	const isLogin = ref(false)
	const likedIds = ref<number[]>()
	const playlist = ref<Playlist[]>()

	const fetchUser = async (id: number) => {
		const userResponse = await getUserDetail(id)
		user.value = userResponse
		isLogin.value = true
	}
	const fetchLikeIds = async (id: number) => {
		const { ids } = await getLikelist(id)
		likedIds.value = ids
	}

	const addLikeSong = (id: number) => {
		if (likedIds.value!.includes(id)) return
		likedIds.value!.push(id)
	}

	const deleteLikeSong = (id: number) => {
		const index = likedIds.value!.findIndex((v) => v === id)
		likedIds.value!.splice(index, 1)
	}
	const removePlaylist = (id: number) => {
		const index = playlist.value!.findIndex((v) => v.id === id)
		playlist.value!.splice(index, 1)
	}

	return {
		user,
		fetchUser,
		fetchLikeIds,
		isLogin,
		likedIds,
		playlist,
		addLikeSong,
		deleteLikeSong,
		removePlaylist,
	}
})

export { useUserStore }
