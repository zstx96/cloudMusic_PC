<template>
	<div v-if="userDetail">
		<div class="flex gap-4 py-4">
			<div><el-image class="h-52 w-52 rounded-full" :src="userDetail.profile.avatarUrl"></el-image></div>
			<div class="flex flex-1 flex-col gap-2">
				<p class="text-2xl font-bold">{{ userDetail.profile.nickname }}</p>
				<div class="flex items-center justify-between border-b pb-2">
					<div class="flex w-3/5 flex-wrap items-center gap-x-1 text-sm">
						<template v-if="userDetail.profile.allAuthTypes?.length"
							><div
								v-for="(types, index) in userDetail.profile.allAuthTypes"
								:key="index"
								class="tag m-1 flex items-center gap-1 rounded-full px-1"
							>
								<img class="h-4 w-4" :src="userDetail.identify?.imageUrl" /><span>{{ types.desc }}</span
								><span v-for="item in types.tags" :key="item">、{{ item }}</span>
							</div></template
						><span class="rounded-full bg-app-gray px-2">Lv{{ userDetail.level }}</span
						><span v-if="userDetail.profile.gender === 1" class="rounded-full font-medium">♂</span
						><span
							v-if="userDetail.profile.gender === 2"
							class="flex h-5 w-5 rotate-45 items-center justify-center rounded-full bg-pink-300 font-bold text-pink-600"
						>
							♀</span
						>
					</div>
					<div v-if="userDetail.profile.userId === userStore.user?.profile.userId">
						<el-button round @click="$router.push({ name: 'editSelf' })">
							<i-ep-edit></i-ep-edit>
							编辑个人资料
						</el-button>
					</div>
					<div v-if="userDetail.profile.artistId">
						<el-button round @click="$router.push(`/artist/${userDetail?.profile.artistId}`)">
							<template #icon>
								<i-ep-mic></i-ep-mic>
							</template>
							歌手页</el-button
						>
					</div>
				</div>
				<div class="flex">
					<div
						class="flex w-14 cursor-pointer flex-col items-center border-r"
						@click="
							$router.push({
								name: 'follows',
								query: { name: userDetail?.profile.nickname },
								params: { id: userDetail?.profile.userId },
							})
						"
					>
						<span class="font-bold">{{ userDetail.profile.follows }}</span
						><span class="text-sm">关注</span>
					</div>
					<div class="flex w-20 cursor-pointer flex-col items-center">
						<span class="font-bold">{{ userDetail.profile.followeds }}</span
						><span class="text-sm">粉丝</span>
					</div>
				</div>
				<p class="text-sm">所在地区: {{ userDetail.profile.city }}</p>
				<p>社交网络: qq</p>
				<p>个人介绍: {{ userDetail.profile.signature || '暂无介绍' }}</p>
			</div>
		</div>
		<div>
			<el-tabs
				><el-tab-pane name="" label="创建的歌单"></el-tab-pane
				><el-tab-pane name="" label="收藏的歌单"></el-tab-pane
				><el-tab-pane name="" label="创建的播客"></el-tab-pane
				><el-tab-pane name="" label="收藏的歌单"></el-tab-pane
				><el-tab-pane name="" label="创建的音乐专栏"></el-tab-pane
			></el-tabs>
			<div v-if="playlist" class="relative grid grid-cols-4 gap-2 lg:grid-cols-5">
				<div v-for="(item, index) in playlist" :key="index">
					<cover-vue
						v-model:hoverElIndex="hoverElIndex"
						:pic-url="item.coverImgUrl + '?param=500y500'"
						:playcount="item.playCount"
						:index="index"
						@click="$router.push({ name: 'playlist', params: { id: item.id } })"
					></cover-vue>
					<p class="w-40 overflow-hidden text-ellipsis whitespace-nowrap">{{ item.name }}</p>
					<span class="text-sm text-app-gray">{{ item.trackCount }}首</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { getPlaylist } from '@/api/songlist'
import { getUserDetail } from '@/api/user'
import type { Playlist, User } from '@/interface'
import { useUserStore } from '@/store/userStore'
import { onActivated, ref } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import coverVue from '@/components/Cover.vue'

const userStore = useUserStore()
const route = useRoute()
const id = parseInt(route.params.id as string)
const userDetail = ref<User>()
const playlist = ref<Playlist[]>()
const hoverElIndex = ref(-2)

const init = async (id: number) => {
	await getUserDetail(id).then((res) => {
		userDetail.value = res
	})

	await getPlaylist(id).then((res) => {
		playlist.value = res.playlist
	})
}
init(id)
onActivated(() => {
	const id = parseInt(route.params.id as string)
	init(id)
})
onBeforeRouteUpdate((to) => {
	const id = parseInt(to.params.id as string)
	init(id)
})
</script>

<style scoped lang="less">
.tag {
	background-color: #fde4e2;
	color: #f36a84;
}
</style>
