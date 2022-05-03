<template lang="pug">
div(class="app-header h-full flex items-center justify-between px-2.5")
    div(v-if="$route.path === '/song'" class="w-[200px] pl-6" @click="$router.push('/')") 
        el-icon
            el-icon-arrowDown
    div(class=" text-lg cursor-pointer w-[200px] " v-else @click="$router.push({ 'name': 'discovery' })") 网易云音乐
    header-input-vue(class="flex items-center gap-2"  )
    div(:class="[' flex-1']")
    div(class="icon-groups w-[435px]  flex  justify-between items-center ")
        toggle-mode-vue 
        // avatar
        div(class="relative")
            el-avatar( @click="clickAvatar" :src="userStore.user?.profile.avatarUrl" ref="avatarEl" class="relative")
            el-card(:body-style="{ height: '100%' }" v-show="loginBoxVisible"  class="absolute left-0 top-[60px]  h-[500px] w-[350px] bg-white  z-[10000] px-2" )
                login-box-vue(v-if="qrimg" :qrimg="qrimg" :qr-key="qrKey" @close-login-box="closeLoginBox" )
        span(v-if="!userStore.user?.profile.nickname" class=" text-app-gray text-sm" ) 未登录
        el-dropdown()
            span(class=" text-sm" v-text="userStore.user?.profile.nickname")
            template(#dropdown)
                el-dropdown-item(@click="handleLogout") logout

        span(ref="nicknameEl")
        // setting
        el-icon(   class="cursor-pointer" :size="25"  )
            el-icon-setting
        el-icon(  class="cursor-pointer" :size="25" )
            el-icon-message
        div(class="h-[25px] w-[25px] px-[4px] flex items-center" )
            div(class=" h-[2px]  w-full   bg-white ")
        div(class="h-[25px] w-[25px] p-[4px]" v-if="!isFullScreen" @click="fullScreen")
            div(class="h-[16px]  border  border-white ")
        el-icon(v-else    class="cursor-pointer" @click="restoreScreen" :size="25")
            el-icon-copyDocument
        el-icon(  class="cursor-pointer"  :size="28")
            el-icon-close

</template>

<script lang="ts" setup>
import headerInputVue from './component/headerInput.vue'
import {
	APP_BASE_HEIGHT,
	APP_BASE_WIDTH,
	app_height,
	app_width,
} from '@/config'
import { ref } from 'vue'
import loginBoxVue from './component/loginBox.vue'
import { ElMessage } from 'element-plus'
import { getQrimg, getQrKey } from '@/api/login'
import { useUserStore } from '@/store/userStore'
import { useRouter } from 'vue-router'
import { logout, refresh } from '@/api/user'
import toggleModeVue from '@/components/iconButton/toggleMode.vue'
// 处理顶部按钮组事件
const userStore = useUserStore()

const handleLogout = () => {
	logout().then((_) => {
		refresh()
	})
	userStore.setUser(null)
}

/// 点击头像
const loginBoxVisible = ref(false)
const qrKey = ref()
const qrimg = ref()
const closeLoginBox = () => {
	loginBoxVisible.value = false
}

const router = useRouter()
const clickAvatar = async () => {
	if (userStore.user) {
		router.push(`/user/${userStore.user.profile.userId}`)
		return
	}

	const instance = ElMessage({
		duration: 0,
		message: '正在加载中,请稍后',
		appendTo: '#app',
	})
	const {
		data: { unikey },
	} = await getQrKey()
	qrKey.value = unikey
	const {
		data: { qrimg: qrPic },
	} = await getQrimg(unikey)
	qrimg.value = qrPic
	instance.close()
	loginBoxVisible.value = true
}

/// 全屏
const isFullScreen = ref(false)
const fullScreen = () => {
	document.fullscreenEnabled
	document
		.querySelector('#app')!
		.requestFullscreen()
		.then(() => {
			isFullScreen.value = true
			app_width.value = window.innerWidth
			app_height.value = window.innerHeight
		})
}
const restoreScreen = () => {
	document.exitFullscreen().then(() => {
		isFullScreen.value = false
		app_width.value = APP_BASE_WIDTH
		app_height.value = APP_BASE_HEIGHT
	})
}
</script>

<style scoped lang="less">
.icon-groups {
	& > * {
		cursor: pointer;
	}
}
.el-icon {
	cursor: pointer;
}
</style>
