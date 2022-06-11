<template>
	<div class="pt-2 text-[15px] font-normal">
		<div v-for="([groupTitle, group], index) in Object.entries(groups)" :key="index">
			<p class="py-2 text-sm text-app-gray">{{ groupTitle }}</p>
			<div
				v-for="navItem in group"
				:key="navItem.name"
				class="mb-1 flex items-center rounded py-1 hover:bg-app-gray hover:bg-opacity-30"
				:class="[navItem.name === focusNav ? 'bg-app-gray bg-opacity-30 text-xl  font-bold' : '']"
				@click="handelClick(groupTitle, navItem.name)"
			>
				<img v-if="navItem.iconUrl" class="h-5 w-5" :src="navItem.iconUrl" /><span
					class="pl-1"
					v-text="navItem.title"
				></span>
			</div>
		</div>
		<aside-playlist-item-vue
			v-if="createByMe"
			v-model:visible="createByMeVisible"
			v-model:active-nav="focusNav"
			title="创建的歌单"
			:list="createByMe"
		></aside-playlist-item-vue
		><aside-playlist-item-vue
			v-if="createByOthers"
			v-model:visible="createByOthersVisible"
			v-model:active-nav="focusNav"
			title="收藏的歌单"
			:list="createByOthers"
		></aside-playlist-item-vue>
	</div>
</template>

<script lang="ts" setup>
import { getPlaylist } from '@/api/songlist'
import type { Nav } from '@/interface'
import { useAppStore } from '@/store/appStore'
import { useUserStore } from '@/store/userStore'
import { computed, nextTick, onActivated, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import asidePlaylistItemVue from './asidePlaylistItem.vue'

const appStore = useAppStore()
const asideData = appStore.asideData[0].children!.filter((v) => v.title)

// 根据group分组
const groups = ref<Record<string, Nav>>({})
const tabSet = new Set()

asideData.forEach((v) => {
	if (v.group === undefined) v.group = ''
	if (!Object.hasOwn(groups.value, v.group as string)) {
		groups.value[v.group] = []
		groups.value[v.group].push(v)
	} else {
		groups.value[v.group].push(v)
	}
	tabSet.add(v.name)
})

const route = useRoute()

const focusNav = ref(route.path.split('/')[1])
onActivated(() => {
	focusNav.value = route.path.split('/')[1]
})

const router = useRouter()
const handelClick = (groupName: string, name: string) => {
	router.push({ name })
	focusNav.value = name
}

const userStore = useUserStore()
const createByMe = computed(() => userStore.playlist?.filter((v) => v.userId === userStore.user?.profile.userId))
const createByOthers = computed(() => userStore.playlist?.filter((v) => v.userId !== userStore.user?.profile.userId))
const createByMeVisible = ref(false)
const createByOthersVisible = ref(false)

watch(
	() => userStore.user,
	(user) => {
		if (user) {
			let id = user.profile.userId
			getPlaylist(id).then((res) => {
				// 我喜欢的音乐列表
				localStorage.setItem('favoriteId', res.playlist[0].id?.toString())
				userStore.$patch({
					playlist: res.playlist,
				})

				if (route.name === 'playlist') {
					let pid = route.params.id as string
					res.playlist.some((v) => {
						if (pid === v.id?.toString()) {
							if (id === v.creator.userId) {
								createByMeVisible.value = true
							} else {
								createByOthersVisible.value = true
							}
							focusNav.value = pid?.toString()
							nextTick(() => {
								const aside = document.querySelector('aside')!
								const target = document.querySelector(`p[data-pid="${pid}"]`) as HTMLElement
								aside.scrollBy({
									top: target.offsetTop,
								})
							})

							return true
						}
					})
				}
			})
		}
	},
	{ immediate: true }
)
</script>

<style scoped lang="less">
.active-nav {
	background: #f6f6f7;
}
</style>
