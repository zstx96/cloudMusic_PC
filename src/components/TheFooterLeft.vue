<template>
	<transition class="w-80 justify-start" name="swiper" mode="out-in"
		><div v-if="$route.name !== 'song'">
			<div class="flex gap-2">
				<el-image
					class="cover h-10 w-10 shrink-0 rounded"
					:src="curSong.al.picUrl + '?param=200y200'"
					@click="$router.push({ name: 'song', query: { id: curSong.id } })"
				></el-image>
				<div class="flex flex-col items-start text-sm">
					<div class="flex items-center gap-2">
						<div class="max-w-60 overflow-hidden">
							<div
								class="whitespace-nowrap"
								:style="{
									animationDuration: `${animationDuration}s`,
									'transition-property': 'transform',
								}"
								@mouseover="handleTransitionstart($event)"
								@transitionend="handleTransitioned"
								v-text="curSong.name"
							></div>
						</div>
						<!-- FIXME :is-like="userStore.likedIds?.includes(curSong.id)"  --><button-heart
							:key="curSong.id"
							:is-like="curSong.isLiked"
							@like="likeSong(curSong.id, true)"
							@dislike="likeSong(curSong.id, false)"
						></button-heart>
					</div>
					<div><span v-for="item in curSong.ar" :key="item.id" v-text="item.name"></span></div>
				</div>
			</div>
		</div>
		<div v-else class="flex items-center gap-3" :data-is-song-page="true">
			<el-icon
				class="scale mr-12 box-content rounded-full border p-2 hover:bg-slate-300"
				:size="20"
				@click="$router.push('/')"
				><i-ep-arrowDown></i-ep-arrowDown></el-icon
			><el-icon class="box-content rounded-full border p-2 hover:bg-slate-300" :size="20"
				><i-ep-folder-add></i-ep-folder-add></el-icon
			><button-download :song="curSong"></button-download
			><el-icon class="box-content rounded-full border p-2 hover:bg-slate-300" :size="20"
				><i-ep-share></i-ep-share
			></el-icon></div
	></transition>
</template>

<script lang="ts" setup>
import { likeSong } from '@/api/song'
import type { Song } from '@/interface'

defineProps<{
	curSong: Song
}>()

// 滚动字幕
const scrolling = ref(false)
const animationDuration = ref(0)
const handleTransitionstart = (event: MouseEvent) => {
	if (!scrolling.value) {
		scrolling.value = true
		const el = event.target as HTMLElement
		el.style.transform = 'translateX(-80%)'
		el.style.transition = 'all 4s'
	}
}
const handleTransitioned = (event: TransitionEvent) => {
	const el = event.target as HTMLElement
	animationDuration.value = 0
	el.style.transitionDuration = '0s'
	setTimeout(() => {
		el.style.transform = 'translateX(0)'
		scrolling.value = false
	})
}
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
		pointer-events: none;
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
