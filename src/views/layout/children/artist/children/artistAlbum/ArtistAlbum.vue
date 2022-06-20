<template>
	<div>
		<div v-if="topSong" class="flex gap-2">
			<div
				class="flex h-40 w-40 flex-shrink-0 flex-col items-center justify-center rounded bg-slate-500 text-center text-6xl font-extrabold text-white"
			>
				<p>TOP</p>
				<p>50</p>
			</div>
			<div>
				<p>热门50首</p>
				<list-song-vue :data="topSong.slice(0, 10)"></list-song-vue>
			</div>
		</div>
		<div v-if="albums">
			<div v-for="item in albums" :key="item.id" class="flex w-full items-center gap-3 py-3">
				<div>
					<el-image
						class="h-40 w-40 cursor-pointer rounded"
						:src="item.picUrl + '?param=400y400'"
						lazy
						@click="$router.push({ name: 'album', params: { id: item.id } })"
					></el-image>
				</div>
				<div class="h-40 flex-1 rounded bg-slate-300">
					<span>{{ item.name }}</span
					><span>{{ item.briefDesc }}</span
					><span>{{ item.description }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { getArtistAlbum, getArtistTopSong } from '@/api/artist'
import ListSongVue from '@/components/ListSong.vue'
import type { IHotAlbum, Song } from '@/interface'
import Service from '@/utils/Service'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = parseInt(route.params.id as string)

const albums = ref<IHotAlbum[]>()
const topSong = ref<Song[]>()
getArtistTopSong(id).then((res) => {
	topSong.value = res.songs
})

getArtistAlbum(id).then((res) => {
	albums.value = res.hotAlbums
	Service.get(`/album?id=${albums.value[0].id}`)
})
</script>

<style scoped lang="less"></style>
