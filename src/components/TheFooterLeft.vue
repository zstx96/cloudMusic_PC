<template lang="pug">
transition(name="swiper"   mode="out-in" class="w-80 justify-start" )
		div(v-if="$route.name !== 'song'" )
			div( class="flex gap-2 ")
				el-image(:src="curSong.al.picUrl + '?param=200y200'"  
					class="rounded w-10  h-10  cover" 
					@click="$router.push({ name: 'song', query: { id: curSong.id } })"
				)
				div(class="flex flex-col items-start")
					div.flex.items-center.gap-2
						span( v-text="curSong.name")
						heart-button-vue(:is-like="curSong.isLiked || false" 
							@like="likeSong(curSong.id, true)"
							@dislike="likeSong(curSong.id, false)" 
						)
					div(class="text-sm")
						span(v-for="item in curSong.ar"  v-text="item.name")
		div(v-else  class="flex  items-center gap-3" :data-is-song-page="true") 
			el-icon(
				class="border rounded-full p-2 mr-12  box-content hover:bg-slate-300 scale " 
				:size="20" 
				@click="$router.push('/')" 
			)
				el-icon-arrowDown
			el-icon(class=" rounded-full p-2  box-content border  hover:bg-slate-300" :size="20")
				el-icon-foldAdd
			button-download-vue( :song="curSong")
			el-icon(class=" rounded-full p-2  box-content border  hover:bg-slate-300 " :size="20")
				el-icon-share
</template>

<script lang="ts" setup>
import { likeSong } from '@/api/song'
import type { Song } from '@/interface'
import buttonDownloadVue from './iconButton/buttonDownload.vue'
import heartButtonVue from './iconButton/heartButton.vue'
defineProps<{
	curSong: Song
}>()
</script>

<style scoped lang="less">
.cover {
	cursor: pointer;
	position: relative;

	&:hover::after {
		content: '△';
		display: flex;
		width: 100%;
		height: 100%;
		background-color: rgba(117, 105, 105, 0.2);
		align-items: center;
		justify-content: center;
		font-size: 36px;
		color: white;
		position: absolute;
		top: 0;
		left: 0;
		backdrop-filter: blur(2px);
		animation: pulse infinite ease 1.5s;
	}
}
@keyframes pulse {
	50% {
		opacity: 0.7;
		scale: 1.1;
	}
}

.swiper-enter-active {
	transition: transform 0.3s ease;
}

.swiper-leave-active {
	transform: translateY(-60px);
	transition: transform 0.3s ease;
}

.swiper-enter-from {
	transform: translateY(60px);
}

.swiper-leave-from {
	transform: translateY(0);
}
</style>
