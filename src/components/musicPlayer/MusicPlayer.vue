<template>
	<div class="inline-flex flex-col items-center gap-1">
		<music-player-controller-vue
			v-if="player"
			v-model:mode="mode"
			v-model:is-paused="isPaused"
			v-model:hasInteracted="hasInteracted"
			:player="player"
		></music-player-controller-vue
		><music-player-progress-vue
			v-model:timeTipVisible="timeTipVisible"
			:duration="curSong.dt"
			:current-time-in-seconds="currentTime"
			@jumps="handleJump"
		></music-player-progress-vue>
	</div>
	<audio ref="player"></audio>
</template>

<script lang="ts" setup>
import { getSongUrl } from '@/api/song'
import type { PlayMode, Song } from '@/interface'
import { usePlayerStore } from '@/store/playerStore'
import { useRecordStore } from '@/store/recordStore'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MusicPlayerControllerVue from './MusicPlayerController.vue'
import MusicPlayerProgressVue from './MusicPlayerProgress.vue'

const route = useRoute()
const router = useRouter()
const props = defineProps<{
	curSong: Song
}>()
const curSong = computed(() => props.curSong)
const playerStore = usePlayerStore()
const recordStore = useRecordStore()

const timeTipVisible = ref(false)
const player = ref<HTMLAudioElement>()

const handleJump = (per: number) => {
	player.value!.currentTime = (playerStore.currentSong!.dt * per) / 1000
}

const isPaused = computed(() => playerStore.isPaused) //音乐播放器是否是暂停状态
const hasInteracted = ref(false) //禁止自动播放媒体文件，必须交互一次后才能播放
setTimeout(() => {
	hasInteracted.value = true
}, 1000)
watch(
	() => isPaused.value,
	(isPaused) => {
		if (isPaused && player.value?.paused === false) {
			player.value.pause()
		} else if (!isPaused && player.value?.paused === true) {
			player.value.play()
		}
	}
)

const currentTime = ref(0)
const mode = ref<PlayMode>('loop')
onMounted(() => {
	const mp = player.value!
	playerStore.initPlayer(mp)
	mp.oncanplay = () => {
		if (hasInteracted.value) {
			mp.play()
			playerStore.$patch({
				isPaused: false,
			})
		}
	}
	mp.ontimeupdate = () => {
		currentTime.value = mp.currentTime
		playerStore.setCurrentTime(mp.currentTime)
	}
	mp.onended = () => {
		playerStore.$patch({
			isPaused: false,
		})
		mp.currentTime = 0

		switch (mode.value) {
			case 'single':
				mp.play()
				break
			case 'loop':
				recordStore.nextRecordIndex()
				playerStore.setCurrentSong(recordStore.playRecord[recordStore.curSongIndex])
				break
			case 'shuffle':
				recordStore.randomRecordIndex()
				playerStore.setCurrentSong(recordStore.playRecord[recordStore.curSongIndex])
		}
	}
	watch(
		() => curSong.value,
		async (song: Song | undefined) => {
			if (song) {
				const {
					data: [{ url }],
				} = await getSongUrl(song.id)
				player.value!.src = url
				if (route.name === 'song') {
					router.push({
						name: 'song',
						query: {
							id: song.id,
						},
					})
				}
			}
		},
		{ immediate: true }
	)
})
</script>

<style scoped lang="less"></style>
