<template lang="pug">
div(v-if="curSong" class=" w-full h-[70px] px-3 overflow-hidden  flex justify-between items-center   z-[10000]  border-t"  )
	transition(name="swiper"   mode="out-in" class="w-80 justify-start" )
		div(v-if="$route.name !== 'song'" )
			div( class="flex gap-2 ")
				el-image(:src="curSong.al.picUrl + '?param=200y200'"  class="rounded w-10  h-10  cover" @click="$router.push({ name: 'song', query: { id: curSong.id } })")
				div(class="flex flex-col items-start")
					div.flex
						span( v-text="curSong.name")
						heart-button-vue(:is-like="curSong.isLiked || false" 
						@like="likeSong(curSong.id, true)"
						@dislike="likeSong(curSong.id, false)" )
					div(class="text-sm")
						span(v-for="item in curSong.ar"  v-text="item.name")
		div(v-else  class="flex  items-center gap-3" :data-is-song-page="true") 
			el-icon(class="mr-8   box-content p-2" @click="$router.push('/')" )
				el-icon-arrowDown
			el-icon(class="border rounded-full p-2  box-content hover:bg-slate-300 scale " :size="20")
				el-icon-arrowDown
			el-icon(class=" rounded-full p-2  box-content border  hover:bg-slate-300" :size="20")
				el-icon-foldAdd
			el-icon(class=" rounded-full p-2  box-content border  hover:bg-slate-300 " :size="20" @click="download")
				el-icon-download
			el-icon(class=" rounded-full p-2  box-content border  hover:bg-slate-300 " :size="20")
				el-icon-share
	div(class=" w-[440px] flex justify-between items-center flex-col py-6" )
		player-controller-vue(@play="play"  @pause="pause" @pre="pre" @next="next" class="py-2" :isPaused="isPaused")
		div(class="flex-1 flex gap-1 items-center ")
			span(class="") {{ dayjs(currentTimeInSeconds * 1000).format('mm:ss') }}
			div(class="h-6 flex items-center cursor-pointer relative" 
			@click="seek"  
			@mousemove="throttle(showTime, 100, { trailing: true })($event)"  
			@mouseout="timeTipVisible = false"
			)
				div(class="absolute bg-slate-400 rounded text-sm -top-4 left-2 transform   " v-show="timeTipVisible" :style="{ 'transform': `translateX(${timeTipOffsetX}px)` }" v-text="timeTipValue") 
				div(class=" relative w-96 h-0.5 bg-slate-600  "
				)
					div(:style="{ 'width': `${percentage}%` }" class="rounded absolute  -top-[1px]  bg-app-red h-1")
			span(v-text="dayjs(curSong.dt).format('mm:ss')")
	div(class="flex items-center justify-end gap-4 relative w-80")
		span( class=" px-1 py-0.5 text-app-red border-app-red border" v-text="'极高'")
		el-icon(:size="30" @click="recordVisible = !recordVisible")
			el-icon-fold
		teleport(to="#app")
			player-record-box-vue(v-show="recordVisible")

audio(ref="playerEl"    )
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, watch } from 'vue'
import { usePlayerStore } from '@/store/playerStore'
import heartButtonVue from '../iconButton/heartButton.vue'
import playerControllerVue from './playerController.vue'
import dayjs from 'dayjs'
import type { Song } from '@/interface/interface'
import { getSongDetail, getSongUrl, likeSong } from '@/api/song'
import { useRoute } from 'vue-router'
import { useRecordStore } from '@/store/recordStore'
import { throttle } from 'lodash'
import Service from '@/utils/Service'
import playerRecordBoxVue from './playerRecordBox.vue'

const route = useRoute()
const playerStore = usePlayerStore()
const recordStore = useRecordStore()

const playerEl = ref<HTMLAudioElement>()
const curSong = computed(() => playerStore.currentSong)
const currentTimeInSeconds = ref(0)

const recordVisible = ref(false)

// 左侧按钮

const download = async () => {
	Service.get(`/song/download/url?id=${curSong.value.id}`).then(async (res) => {
		const url = res.data.url
		if (url) {
			const response = await fetch(url)
			const data = await response.blob()
			const b = new Blob([data])
			const a = document.createElement('a')
			const downloadUrl = window.URL.createObjectURL(b)
			a.href = downloadUrl
			a.download = `${curSong.value.name}.mp3`
			a.click()
			window.URL.revokeObjectURL(downloadUrl)
		}
	})
}
// 处理事件按钮组
const isPaused = ref(true)
const play = () => {
	if (playerEl.value?.paused) {
		playerEl.value?.play()
		isPaused.value = false
	}
}
const pause = () => {
	if (!playerEl.value?.paused) {
		playerEl.value?.pause()
		isPaused.value = true
	}
}
const pre = () => {
	const index = recordStore.curSongIndex
	recordStore.setCurSongIndex(index - 1)
	const song = recordStore.playRecord[recordStore.curSongIndex]
	playerStore.setCurrentSong(song)
}
const next = () => {
	const index = recordStore.curSongIndex
	recordStore.setCurSongIndex(index + 1)
	const song = recordStore.playRecord[recordStore.curSongIndex]
	playerStore.setCurrentSong(song)
}

// 进度条
const percentage = ref(0)
const fullLength = 4 * 96
const timeTipVisible = ref(false)
const timeTipValue = ref<string>()
const timeTipOffsetX = ref<number>()
const seek = (e: MouseEvent) => {
	if (e.target instanceof HTMLSpanElement) return
	const { offsetX } = e
	const per = offsetX / fullLength
	playerEl.value!.currentTime = playerEl.value!.duration * per
}
const showTime = (e: MouseEvent) => {
	if (e.target instanceof HTMLSpanElement) return
	const { offsetX } = e
	const per = offsetX / fullLength
	timeTipVisible.value = true
	timeTipOffsetX.value = offsetX
	timeTipValue.value = dayjs(playerEl.value!.duration * per * 1000).format('mm:ss')
}
type LoopMode = 'loop' | 'next'
const loopMode = ref<LoopMode>('loop')
// 播放记录

onMounted(() => {
	setTimeout(() => {
		if (recordStore.playRecord.length) {
			if (recordStore.curSongIndex < 0) {
				recordStore.setCurSongIndex(0)
			}
			playerStore.setCurrentSong(recordStore.playRecord[recordStore.curSongIndex])
		} else if (route.name === 'song') {
			getSongDetail(parseInt(route.query.id as string)).then((res) => {
				recordStore.addPlayRecord(res.songs)
				playerStore.setCurrentSong(res.songs[0])
			})
		}
	}, 1000)

	playerStore.initPlayer(playerEl.value)
	const mp = playerEl.value!
	const duration = computed(() => curSong.value.dt)
	mp.ontimeupdate = (e) => {
		currentTimeInSeconds.value = mp.currentTime
		playerStore.setCurrentTime(mp.currentTime)
		percentage.value = ((mp.currentTime * 1000) / duration.value) * 100
	}
	// 未经用户交互 浏览器禁止自动播放
	const flag = ref(false)
	mp.oncanplay = () => {
		if (flag.value) {
			mp.play()
			isPaused.value = false
			return
		}
		flag.value = true
	}
	mp.onended = () => {
		// TODO 播放完毕，根据循环方式判断下一首
		isPaused.value = true
		if (loopMode.value === 'loop') {
			mp.currentTime = 0
			mp.play()
		}
	}
	watch(
		() => playerStore.currentSong,
		async (song: Song | undefined) => {
			if (song) {
				const {
					data: [{ url }],
				} = await getSongUrl(curSong.value.id)
				mp.src = url
			}
		},
		{ immediate: true }
	)
})
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
