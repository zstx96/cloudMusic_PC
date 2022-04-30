<template lang='pug'>
div( v-if="artistDetail")
    div(class="flex gap-4")
        div
            el-image(:src="artistDetail.artist.cover + '?param=500y500'" class=" w-48")
        div
            p {{ artistDetail.artist.name }}
            div.my-3
                el-button(icon="el-icon-foldAdd" round) 收藏
                el-button(icon="el-icon-avatar" v-if="artistDetail.user?.userId" round @click="$router.push(`/user/${artistDetail?.user.userId}`)")  个人主页
            div(class=" text-sm flex gap-6")
                span() 单曲数:{{ artistDetail.artist.musicSize }}
                span() 专辑数:{{ artistDetail.artist.albumSize }}
                span() MV数:{{ artistDetail.artist.mvSize }}
    div
        el-tabs(@tab-change="handleTabClick" :active-name="activeName")
            el-tab-pane(label="专辑" name="Album")
            el-tab-pane(label="MV" name="Mv")
            el-tab-pane(label="歌手详情" name="Desc")
            el-tab-pane(label="相似歌手" name="Simi")
        div
            //- component(:is="currentComponent" :id="id")
            router-view(v-model:voidPage="voidPage"     v-if="!voidPage")
            el-empty(v-else)

</template>

<script lang="ts" setup>
import { getArtistDesc, getArtistDetail, getArtistInfo } from '@/api/artist'
import type { ArtistDetail } from '@/interface'
import type { TabPanelName } from 'element-plus'
import   { ElLoading,  } from 'element-plus'
import { ref, watchEffect } from 'vue'
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'

const route = useRoute()
const id = ref(parseInt(route.params.id as string))
const activeName = ref(route.path.split('/').at(-1)!.substring(6))
watchEffect(() => {
	getArtistDetail(id.value).then(res => {
		artistDetail.value = res.data
	})
	activeName.value = route.path.split('/').at(-1)!.substring(6)
})

const artistDetail = ref<ArtistDetail>()
const router = useRouter()
const handleTabClick = async (v: TabPanelName) => {
	voidPage.value = false
	router.push({
		name: 'artist' + v,
		params: {
			id: id.value
		}
	})
}

onBeforeRouteUpdate(async (to) => {
	if(to.params.id !== id.value.toString()){
		const i = ElLoading.service()
		id.value = parseInt(to.params.id as string)
		i.close()
	}
})

const voidPage = ref(false)
</script>

<style scoped lang="less">
</style>