<template lang='pug'>
div(class="flex gap-4" v-if="artistDetail")
    div
        el-image(:src="artistDetail.artist.cover + '?param=500y500'" class=" w-48")
    div
        p {{ artistDetail.artist.name }}
        div.my-3
            el-button(icon="el-icon-foldAdd" round) 收藏
            el-button(icon="el-icon-avatar" round)  个人主页
        div(class=" text-sm flex gap-6")
            span() 单曲数:{{ artistDetail.artist.musicSize }}
            span() 专辑数:{{ artistDetail.artist.albumSize }}
            span() Mv数:{{ artistDetail.artist.mvSize }}
div
    el-tabs(@tab-change="handleTabClick" :active-name="activeName")
        el-tab-pane(label="专辑" name="Album")
        el-tab-pane(label="MV" name="Mv")
        el-tab-pane(label="歌手详情" name="Desc")
        el-tab-pane(label="相似歌手" name="Simi")
    div
        component(:is="currentComponent" :id="id")

</template>

<script lang="ts" setup>
import { getArtistAlbum, getArtistDesc, getArtistDetail, getArtistInfo } from '@/api/artist';
import type { ArtistDetail } from '@/interface';
import { useRouteQuery } from '@vueuse/router';
import type { TabPanelName, TabsPaneContext } from 'element-plus';
import { ref, shallowRef } from 'vue';
import artistAlbumVue from './components/artistAlbum.vue';

const id = parseInt(useRouteQuery('id').value as unknown as string)
getArtistInfo(id)
getArtistDesc(id)
getArtistDetail(id).then(res => {
    artistDetail.value = res.data
})

const artistDetail = ref<ArtistDetail>()
const currentComponent = shallowRef()
const activeName = ref('Album')
currentComponent.value = artistAlbumVue
const handleTabClick = async (v:TabPanelName) => {
    const name = 'artist' + v
    const module = await import(`./components/${name}.vue`)
    currentComponent.value = module.default
}

</script>

<style scoped lang="less">
</style>