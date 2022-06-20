<template>
	<div>
		<div class="controller flex flex-col gap-2 text-xs">
			<div>
				<strong>语种：</strong><span @click="selectArea(AreaType.all)" v-text="'全部'"> </span
				><span @click="selectArea(AreaType.CN)" v-text="'华语'"> </span
				><span @click="selectArea(AreaType.EU)" v-text="'欧美'"> </span
				><span @click="selectArea(AreaType.JP)" v-text="'日本'"> </span
				><span @click="selectArea(AreaType.KR)" v-text="'韩国'"> </span
				><span @click="selectArea(AreaType.other)" v-text="'其他'"> </span>
			</div>
			<div>
				<strong>分类：</strong><span @click="selectClass(ArtistType.all)" v-text="'全部'"> </span
				><span @click="selectClass(ArtistType.male)" v-text="'男歌手'"> </span
				><span @click="selectClass(ArtistType.female)" v-text="'女歌手'"> </span
				><span @click="selectClass(ArtistType.band)" v-text="'乐队组合'"> </span>
			</div>
			<div class="flex">
				<div><strong class="whitespace-nowrap">筛选：</strong></div>
				<div>
					<span @click="selectInitial(-1)" v-text="'热门'"></span
					><span v-for="item in 26" :key="item" @click="selectInitial(String.fromCharCode(item + 64))">{{
						String.fromCharCode(item + 64)
					}}</span
					><span @click="selectInitial(0)" v-text="'#'"></span>
				</div>
			</div>
		</div>
		<div class="m-auto flex flex-wrap gap-2 text-sm">
			<div v-for="(artist, index) in artists" :key="index" class="w-[15%]">
				<el-image
					class="flex-shrink cursor-pointer rounded"
					:src="$resizeImg(artist.picUrl, 300)"
					lazy
					@click="$router.push(`/artist/${artist.id}`)"
					><template #placeholder><img :src="placeholder" /></template
				></el-image>
				<div>{{ artist.name }}</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { getArtistList } from '@/api/artist'
import { AreaType, ArtistType } from '@/enum'
import type { Artist } from '@/interface/interface'
import { ref, watchEffect } from 'vue'
import placeholder from '@/assets/img/placeholder.png'

const selectedArea = ref(AreaType.all)
const selectedClass = ref(ArtistType.all)
const selectedInitial = ref('-1')

const artists = ref<Artist[]>()

watchEffect(() => {
	getArtistList(selectedClass.value, selectedArea.value).then((res) => {
		artists.value = res.artists
	})
})

const selectArea = (v: AreaType) => {
	selectedArea.value = v
}
const selectClass = (v: ArtistType) => {
	selectedClass.value = v
}
const selectInitial = (v: string | number) => {
	selectedInitial.value = v?.toString()
}
</script>

<style scoped lang="less">
span {
	display: inline-block;
	width: 75px;
	text-align: center;
	padding: 5px;
	cursor: pointer;
	&:hover {
		background-color: #afaaaa;
		border-radius: 20px;
	}
}
</style>
