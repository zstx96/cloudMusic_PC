import type { User } from "@/interface";
import { defineStore } from "pinia";
import { ref } from "vue";

const useUserStore = defineStore('user', () => {
    const user = ref<User>()
    const isLogin = ref(false)
    const likedIds = ref<number[]>()

    const setUser = (value: User) => {
        user.value = value
        isLogin.value = true
    }

    return {
        user,
        setUser,
        isLogin,
        likedIds
    }
})

export { useUserStore }