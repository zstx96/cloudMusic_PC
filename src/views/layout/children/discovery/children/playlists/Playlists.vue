<template lang="pug">
div
    div(class="navs-wrapper flex justify-between items-center")
        el-button(round ) {{activeTag}}>
        div(class="flex items-center gap-3 whitespace-nowrap text-sm")
            span(v-for="tag in tags" 
            :class="[activeTag === tag.name&&' rounded-full bg-slate-200','px-1 cursor-pointer']"
            @click="handleClick(tag.name)"
            ) {{tag.name}}
    div(v-if="currentPlaylists" class="grid grid-cols-5 gap-2 py-2")
        cover-vue(v-for="(item,index) in currentPlaylists" 
        v-model:hover-el-index="hoverElIndex"
        :pic-url="item.coverImgUrl" 
        :playcount="item.playCount" 
        :index="index" 
        @click="$router.push({name:'playlist',params:{id:item.id}})"
        )


</template>

<script lang="ts" setup>
import { getHighQualityTags, getHigQualityPlaylist } from '@/api/songlist'
import { ref } from 'vue'
import type { AxiosReturnType, Playlist } from '@/interface'
import coverVue from '@/components/Cover.vue'

const tags = ref<AxiosReturnType<typeof getHighQualityTags>['tags']>()
const activeTag = ref('华语')
const currentPlaylists = ref<Playlist[]>()
const hoverElIndex = ref(0)
getHighQualityTags().then((res) => {
	tags.value = res.tags.filter((v) => v.type === 0)
})
const handleClick = (tag: string) => {
	activeTag.value = tag
	getHigQualityPlaylist(tag).then((res) => {
		console.log(res)
		currentPlaylists.value = res.playlists
	})
}
handleClick(activeTag.value)
</script>

<style scoped lang="less"></style>
