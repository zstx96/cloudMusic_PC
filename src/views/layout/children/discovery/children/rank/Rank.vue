<template>
	<div class="overflow-auto">
		<p>官方榜</p>
		<div v-if="official">
			<div v-for="item in official" :key="item.id" class="mb-2 flex items-center justify-between gap-3">
				<div><el-image :src="item.coverImgUrl" :style="{ height: '175px', width: '175px' }"></el-image></div>
				<el-table
					v-if="item.tracks"
					:data="item.tracks"
					:row-class-name="({ rowIndex }) => (rowIndex % 2 === 0 ? '' : 'stripe')"
					:show-header="false"
					><el-table-column type="index"></el-table-column><el-table-column prop="name"></el-table-column
					><el-table-column prop="ar[0][name]"></el-table-column></el-table
				><el-skeleton v-else :rows="5"></el-skeleton>
			</div>
		</div>
		<p>全球榜</p>
		<div v-if="global" class="grid grid-cols-5 gap-3">
			<div v-for="item in global" :key="item.id">
				<div class="relative">
					<cover
						:playcount="item.playCount"
						:pic-url="$resizeImg(item.coverImgUrl, 400)"
						@click="$router.push(`/playlist/${item.id}`)"
					></cover>
				</div>
				<p class="w-[138px] text-sm">{{ item.name }}</p>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { getPlaylistDetail, getTopList } from '@/api/songlist'
import type { Playlist, Song } from '@/interface/interface'

const official = ref<(Playlist & { tracks?: Song[] })[]>()
const global = ref<Playlist[]>()

const isLoading = ref(true)
getTopList().then((res) => {
	official.value = res.list.slice(0, 3)
	official.value.forEach((v) => {
		getPlaylistDetail(v.id).then((res) => {
			v.tracks = res.playlist.tracks.slice(0, 5)
		})
	})
	global.value = res.list.slice(3)
	isLoading.value = false
})
</script>

<style scoped lang="less"></style>
