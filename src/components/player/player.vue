<template lang="pug">
div(v-if="curSong" class=" w-full h-[70px] px-3 overflow-hidden  flex justify-between items-center   z-[10000]  border-t"  )
    transition(name="swiper" 
    mode="out-in"
    class="w-80 justify-start"
    )
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
            el-icon(class="mr-8   box-content p-2" @click="$router.back()" )
                el-icon-arrowDown
            el-icon(class="border rounded-full p-2  box-content hover:bg-slate-300 scale " :size="20")
                el-icon-arrowDown
            el-icon(class=" rounded-full p-2  box-content border  hover:bg-slate-300" :size="20")
                el-icon-foldAdd
            el-icon(class=" rounded-full p-2  box-content border  hover:bg-slate-300 " :size="20" @click="download")
                el-icon-download
            el-icon(class=" rounded-full p-2  box-content border  hover:bg-slate-300 " :size="20")
                el-icon-share
    div(class=" w-[440px] flex justify-between items-center flex-col py-6")
        player-controller-vue(@play="play" @random="handRandom" @pause="pause" @pre="pre" @next="next" class="py-2" :isPaused="isPaused")
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
            div(v-show="recordVisible" v-if="recentSongs" class="shadow absolute bottom-0 right-0 -translate-y-20 text-app-gray text-sm p-2  bg-white z-[10000] overflow-x-hidden overflow-y-scroll" :style="{ 'height': `${app_main_height - 80}px`, 'width': '400px' }")
                p(class=" font-bold text-xl text-black") 当前播放
                div(class="flex justify-between gap-4 border-b py-2")
                    span 共{{ recentSongs.length }}首
                    span.flex-1
                    span
                    span(class=" text-blue-500") 清空列表
                div(v-if="recordStore.playRecord")
                    el-table(:data="recordStore.playRecord" 
                    :show-header="false" 
                    stripe
                    class="text-sm"
                    :row-class-name="computedRowClassName"
                    highlight-current-row
                    @row-click="handleRowClick")
                        el-table-column(type="index")
                        el-table-column()
                            template(#default="{ row }")
                                span(class=" text-ellipsis w-44 whitespace-nowrap") {{ row.name }}
                        el-table-column()
                            template(#default="{ row }")
                                div(class="text-ellipsis w-44 whitespace-nowrap")
                                    span(v-for="ar in row.ar" v-text="ar.name" class="mr-1")
                        el-table-column()
                            template(#default="{ row }")
                                span(v-text="dayjs(row.dt).format('mm:ss')")
                div(v-else class="h-full flex flex-col justify-center items-center")
                    p.mb-4  你还没有添加任何歌曲!
                    div
                        span 去首页
                        router-link(to="/discovery" class=" text-blue-500") 发现音乐 


audio(ref="playerEl"    )
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, watch } from 'vue'
import { usePlayerStore } from '@/store/playerStore'
import heartButtonVue from '../iconButton/heartButton.vue'
import playerControllerVue from './playerController.vue'
import dayjs from 'dayjs'
import type { Song } from '@/interface/interface'
import { getSongUrl, likeSong } from '@/api/song'
import { app_main_height } from '@/config'
import { useRoute, useRouter } from 'vue-router'
import { useRecordStore } from '@/store/recordStore'
import { throttle } from 'lodash'
import Service from '@/utils/Service'

const playerStore = usePlayerStore()
const recordStore = useRecordStore()

if (recordStore.playRecord.length) {
	playerStore.setCurrentSong(recordStore.playRecord[recordStore.curSongIndex])
}

const playerEl = ref<HTMLAudioElement>()
const curSong = computed(() => playerStore.currentSong)
const currentTimeInSeconds = ref(0)
const route = useRoute()
const router = useRouter()
// 左侧按钮

const download = async () => {
	Service.get(`/song/download/url?id=${curSong.value.id}`).then(
		async (res) => {
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
		}
	)
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
	console.log('next')

	const index = recordStore.curSongIndex
	recordStore.setCurSongIndex(index + 1)
	const song = recordStore.playRecord[recordStore.curSongIndex]
	playerStore.setCurrentSong(song)
}
const handRandom = () => {
	console.log('random')
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
	console.log(playerEl.value!.duration * per)
	playerEl.value!.currentTime = playerEl.value!.duration * per
}
const showTime = (e: MouseEvent) => {
	if (e.target instanceof HTMLSpanElement) return
	const { offsetX } = e
	const per = offsetX / fullLength
	timeTipVisible.value = true
	timeTipOffsetX.value = offsetX
	timeTipValue.value = dayjs(playerEl.value!.duration * per * 1000).format(
		'mm:ss'
	)
}

// 播放记录

const recordVisible = ref(false)
const recentSongs = ref<Song[]>()
// getRecentSong().then(res => {
//     recentSongs.value = res.data.list.map(v => v.data)
// })
recentSongs.value = recordStore.playRecord
const computedRowClassName = ({ rowIndex }: { rowIndex: number }) => {
	return recordStore.curSongIndex === rowIndex ? 'select-row' : ''
}
const handleRowClick = (song: Song) => {
	playerStore.$patch({
		currentSong: song,
	})
	const index = recentSongs.value!.findIndex((v) => v.id === song.id)!
	recordStore.setCurSongIndex(index)
	if (route.name === 'song') {
		router.push({
			name: 'song',
			query: {
				id: song.id,
			},
		})
	}
}
onMounted(() => {
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
		isPaused.value = true
	}
	watch(
		() => playerStore.currentSong,
		async (song: Song) => {
			const {
				data: [{ url }],
			} = await getSongUrl(curSong.value.id)
			mp.src = url
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
