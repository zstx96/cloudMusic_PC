<template>
	<div>
		<div class="navs-wrapper flex items-center justify-between">
			<el-button round>{{ activeTag }}></el-button>
			<div class="flex items-center gap-3 whitespace-nowrap text-sm">
				<span
					v-for="tag in tags"
					:key="tag.id"
					:class="[activeTag === tag.name && ' rounded-full bg-slate-200', 'cursor-pointer px-1']"
					@click="handleClick(tag.name)"
					>{{ tag.name }}</span
				>
			</div>
		</div>
		<div v-if="currentPlaylists" class="grid grid-cols-5 gap-2 py-2">
			<cover-vue
				v-for="(item, index) in currentPlaylists"
				:key="index"
				v-model:hover-el-index="hoverElIndex"
				:pic-url="$resizeImg(item.coverImgUrl, 400)"
				:playcount="item.playCount"
				:index="index"
				@click="$router.push({ name: 'playlist', params: { id: item.id } })"
			></cover-vue>
		</div>
	</div>
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
		currentPlaylists.value = res.playlists
	})
}
handleClick(activeTag.value)
</script>

<style scoped lang="less"></style>
