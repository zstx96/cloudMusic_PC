<template lang="pug">
div(class="pt-2 font-normal text-[15px]")
    div(v-for="[groupTitle, group] in Object.entries(groups)")
        p(class=" text-sm text-app-gray py-2") {{ groupTitle }}
        div(v-for="(navItem) in group" 
        class="flex items-center mb-1 py-1  hover:bg-app-gray hover:bg-opacity-30 rounded " 
        :class="[navItem.name === focusNav ? 'bg-app-gray bg-opacity-30 font-bold  text-xl' : '']"
        @click="handelClick(groupTitle, navItem.name)")
            img(v-if="navItem.iconUrl" class=" w-5 h-5 " :src="navItem.iconUrl")
            span(v-text="navItem.title" class="pl-1" )

    aside-playlist-item-vue(
    v-model:visible="createByMeVisible" 
    v-model:active-nav="focusNav"  
    title="创建的歌单"
    :list="createByMe")

    aside-playlist-item-vue(
    v-model:visible="createByOthersVisible" 
    title='收藏的歌单'  
    v-model:active-nav="focusNav"  
    :list="createByOthers")
</template>

<script lang="ts" setup>
import { getPlaylist } from '@/api/songlist'
import type { Nav, Playlist } from '@/interface'
import { useAppStore } from '@/store/appStore'
import { useUserStore } from '@/store/userStore'
import { nextTick, onActivated, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import asidePlaylistItemVue from './asidePlaylistItem.vue'

const appStore = useAppStore()
const asideData = appStore.asideData[0].children!.filter((v) => v.title)
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
const createByMe = ref<Playlist[]>([])
const createByOthers = ref<Playlist[]>([])
const createByMeVisible = ref(false)
const createByOthersVisible = ref(false)

watch(
	() => userStore.user,
	(user) => {
		if (user) {
			let id = user.profile.userId
			getPlaylist(id).then((res) => {
				res.playlist.forEach((v) => {
					if (id === v.creator.userId) {
						createByMe.value.push(v)
					} else {
						createByOthers.value.push(v)
					}
				})
				if (route.name === 'playlist') {
					let pid = route.params.id as string
					res.playlist.some((v) => {
						if (pid === v.id.toString()) {
							if (id === v.creator.userId) {
								createByMeVisible.value = true
							} else {
								createByOthersVisible.value = true
							}
							focusNav.value = pid.toString()
							nextTick(() => {
								const aside = document.querySelector('aside')!
								const target = document.querySelector(
									`p[data-pid="${pid}"]`
								) as HTMLElement
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
