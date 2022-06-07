<template>
	<div>
		<div v-if="artistDetail" class="flex gap-4">
			<div><el-image class="w-48" :src="artistDetail.artist.cover + '?param=500y500'"></el-image></div>
			<div>
				<p>{{ artistDetail.artist.name }}</p>
				<div class="my-3">
					<el-button icon="i-ep-foldAdd" round>收藏</el-button
					><el-button
						v-if="artistDetail.user"
						icon="i-ep-avatar"
						round
						@click="$router.push(`/user/${artistDetail?.user?.userId}`)"
					>
						个人主页</el-button
					>
				</div>
				<div class="flex gap-6 text-sm">
					<span>单曲数:{{ artistDetail.artist.musicSize }}</span
					><span>专辑数:{{ artistDetail.artist.albumSize }}</span
					><span>MV数:{{ artistDetail.artist.mvSize }}</span>
				</div>
			</div>
		</div>
		<div>
			<el-tabs :active-name="activeName" @tab-change="handleTabClick"
				><el-tab-pane label="专辑" name="artistAlbum"></el-tab-pane
				><el-tab-pane label="MV" name="artistMv"></el-tab-pane
				><el-tab-pane label="歌手详情" name="artistDesc"></el-tab-pane
				><el-tab-pane label="相似歌手" name="artistSimi"></el-tab-pane
			></el-tabs>
			<div>
				<router-view
					v-if="!voidPage"
					v-slot="{ Component }"
					:key="$route.params.id.toString()"
					v-model:voidPage="voidPage"
					><keep-alive><component :is="Component"></component></keep-alive></router-view
				><el-empty v-else></el-empty>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { getArtistDetail } from '@/api/artist'
import type { ArtistDetail } from '@/interface'
import { withLoading } from '@/utils/withLoading'
import type { TabPanelName } from 'element-plus'
import { onActivated, ref } from 'vue'
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'

const route = useRoute()
let id = parseInt(route.params.id as string)
const activeName = ref(route.name as string)

const artistDetail = ref<ArtistDetail>()
const resetArtist = async (id: number) => {
	withLoading(getArtistDetail)(id).then((res) => {
		artistDetail.value = res.data
	})
}

const router = useRouter()
const handleTabClick = async (name: TabPanelName) => {
	voidPage.value = false
	router.push({
		name: name as string,
		params: {
			id,
		},
	})
}

onBeforeRouteUpdate((to) => {
	activeName.value = to.name as string
	if (to.name === 'artistAlbum' && to.params.id !== route.params.id) {
		activeName.value = to.name as string
		if (to.params.id !== id.toString()) {
			id = parseInt(to.params.id as string)
			resetArtist(id)
		}
	}
})
onActivated(() => {
	activeName.value = route.name as string
	if (route.params.id !== id.toString()) {
		id = parseInt(route.params.id as string)
		resetArtist(id)
	}
})

resetArtist(id)

const voidPage = ref(false)
</script>

<style scoped lang="less"></style>
