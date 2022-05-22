<template lang="pug">
div
    p(type="") fm
    div(class="flex items-center" v-if="curSong" :key="curSongIndex")
        div(class=" w-72  h-72 m-auto")
            el-image(:src="curSong.al.picUrl + '?param=500y500'")
            div(class="flex justify-between items-center mt-3 py-3 icon-group")
                //- TODO 处理列表， 当有更新时候 通知更新？
                button-heart(
                    :is-like="curSong.isLiked" 
                    @like="handleLike(curSong!,true)"
                    @dislike="handleLike(curSong!,false)" 
                    :key="curSong.id"
                )
                button-play(:is-paused="$player.isPaused" @play="$player.play" @pause="$player.pause")
                el-icon(@click="next" :size="40"  ) 
                    i-ep-caretRight
        div
            the-lyric-parser(:lyric="lyric" v-if="lyric !== undefined" :key="lyric")
</template>

<script lang="ts" setup>
import { getSongLyric, likeSong } from '@/api/song'
import { getPersonalFm } from '@/api/user'
import type { Song } from '@/interface'
import type { FMResponse } from '@/interface/fm'
import { usePlayerStore } from '@/store/playerStore'
import { useUserStore } from '@/store/userStore'
import { ElMessage } from 'element-plus'
const userStore = useUserStore()
type Fms = FMResponse['data']
const fms = ref<Fms>()
const playerStore = usePlayerStore()
getPersonalFm().then((res) => {
	fms.value = res.data
	curSongIndex.value = 0
})

const curSongIndex = ref()
const lyric = ref('')
watch(
	() => curSongIndex.value,
	(index) => {
		const fm = fms.value![index]
		// FIXME 数组的子元素好像没追踪
		const curSong = {
			id: fm.id,
			name: fm.name,
			al: fm.album,
			ar: fm.artists,
			reason: fm.reason,
			publishTime: +new Date(),
			dt: fm.duration,
			isLiked: userStore.likedIds?.includes(fm.id),
		} as unknown as Song
		playerStore.setCurrentSong(curSong)

		const id = fms.value![index].id
		getSongLyric(id).then((res) => {
			lyric.value = res
		})
	}
)

const curSong = computed(() => playerStore.currentSong)

const handleLike = async (song: Song, t: boolean) => {
	song.isLiked = t
	t ? userStore.addLikeSong(song.id) : userStore.removeLikeSong(song.id)
	const isSameWithCurrentSong = playerStore.currentSong?.id === song.id

	if (isSameWithCurrentSong) {
		playerStore.currentSong!.isLiked = t
	}

	const { code } = await likeSong(song.id, t)
	if (code !== 200) {
		ElMessage.error('网络发生了些错误,喜欢失败')
		song.isLiked = !t
		userStore.removeLikeSong(song.id)
		if (isSameWithCurrentSong) {
			playerStore.currentSong!.isLiked = !t
		}
	}
}
const next = () => {
	if (curSongIndex.value + 1 < (fms.value?.length || 1)) {
		curSongIndex.value++
	} else {
		ElMessage.error('已经是最后一首了')
	}
}
</script>

<style scoped lang="less">
.icon-group > * {
	width: 40px;
	height: 40px;
	cursor: pointer;
}
</style>
