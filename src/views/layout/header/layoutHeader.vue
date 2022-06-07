<template>
	<div
		class="app-header flex h-full items-center justify-between px-2.5"
		:style="{ 'background-color': 'var(--app-header-background-color)' }"
	>
		<div v-if="$route.path === '/song'" class="w-[200px] pl-6" @click="$router.push('/')">
			<el-icon><i-ep-arrowDown></i-ep-arrowDown></el-icon>
		</div>
		<div v-else class="w-[200px] cursor-pointer text-lg" @click="$router.push({ name: 'discovery' })">
			网易云音乐
		</div>
		<header-input-vue class="flex items-center gap-2"></header-input-vue
		><!--  flex 占位符  -->
		<div :class="[' flex-1']"></div>
		<div class="icon-groups flex w-[435px] items-center justify-between">
			<toggle-mode-vue> </toggle-mode-vue
			><!-- avatar -->
			<div class="relative">
				<el-avatar
					ref="avatarEl"
					class="relative"
					:src="userStore.user?.profile.avatarUrl"
					@click="clickAvatar"
				></el-avatar
				><el-card
					v-show="loginBoxVisible"
					class="absolute left-0 top-[60px] z-[1000] h-[500px] w-[350px] bg-white px-2"
					:body-style="{ height: '100%' }"
					><login-box-vue
						v-if="qrimg"
						:qrimg="qrimg"
						:qr-key="qrKey"
						@close-login-box="closeLoginBox"
					></login-box-vue
				></el-card>
			</div>
			<span v-if="!userStore.isLogin" class="text-sm text-app-gray">未登录</span
			><el-dropdown
				><span class="text-sm" v-text="userStore.user?.profile.nickname"></span
				><template #dropdown
					><el-dropdown-item @click="handleLogout">logout</el-dropdown-item></template
				></el-dropdown
			><span ref="nicknameEl"></span
			><!-- setting --><el-icon class="cursor-pointer" :size="25"><i-ep-setting></i-ep-setting></el-icon
			><el-icon class="cursor-pointer" :size="25"><i-ep-message></i-ep-message></el-icon>
			<div class="flex h-[25px] w-[25px] items-center px-[4px]">
				<div class="h-[2px] w-full bg-current"></div>
			</div>
			<div v-if="!isFullScreen" class="h-[25px] w-[25px] p-[4px]" @click="fullScreen">
				<div class="h-[16px] border border-current"></div>
			</div>
			<el-icon v-else class="cursor-pointer" :size="25" @click="restoreScreen"
				><i-ep-copyDocument></i-ep-copyDocument></el-icon
			><el-icon class="cursor-pointer" :size="28"><i-ep-close></i-ep-close></el-icon>
		</div>
	</div>
</template>

<script lang="ts" setup>
import headerInputVue from './component/headerInput.vue'
import { APP_BASE_HEIGHT, APP_BASE_WIDTH, app_height, app_width } from '@/config'
import { ref } from 'vue'
import loginBoxVue from './component/loginBox.vue'
import { ElMessage } from 'element-plus'
import { getQrimg, getQrKey } from '@/api/login'
import { useUserStore } from '@/store/userStore'
import { useRouter } from 'vue-router'
import { logout, refreshLogin } from '@/api/login'
import toggleModeVue from '@/components/iconButton/toggleMode.vue'
// 处理顶部按钮组事件
const userStore = useUserStore()

const handleLogout = () => {
	logout().then((_) => {
		refreshLogin()
	})
	userStore.$patch({ user: null })
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
