<template lang="pug">
div()
    div(class="flex gap-4" v-if="artistDetail")
        div
            el-image(:src="artistDetail.artist.cover + '?param=500y500'" class=" w-48")
        div
            p {{ artistDetail.artist.name }}
            div(class="my-3")
                el-button(icon="el-icon-foldAdd" round) 收藏
                el-button(icon="el-icon-avatar" 
                v-if="artistDetail.user" 
                round
                @click="$router.push(`/user/${artistDetail?.user?.userId}`)"
                )  个人主页
            div(class=" text-sm flex gap-6")
                span() 单曲数:{{ artistDetail.artist.musicSize }}
                span() 专辑数:{{ artistDetail.artist.albumSize }}
                span() MV数:{{ artistDetail.artist.mvSize }}
    div
        el-tabs(@tab-change="handleTabClick" :active-name="activeName")
            el-tab-pane(label="专辑" name="artistAlbum")
            el-tab-pane(label="MV" name="artistMv")
            el-tab-pane(label="歌手详情" name="artistDesc")
            el-tab-pane(label="相似歌手" name="artistSimi")
        div
            router-view(v-model:voidPage="voidPage" #default="{Component}" :key="$route.params.id"    v-if="!voidPage")
                keep-alive
                    component(:is="Component")
            el-empty(v-else)

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
