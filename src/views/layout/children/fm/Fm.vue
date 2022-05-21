<template lang="pug">
div
    p(type="") fm
    div(class="flex items-center" v-if="fm" :key="curSongIndex")
        div(class=" w-72  h-72 m-auto")
            el-image(:src="fm.album.picUrl + '?param=500y500'")
            div(class="flex justify-between items-center mt-3 py-3 icon-group")
                //- TODO 处理列表， 当有更新时候 通知更新？
                button-heart-vue(
                    :is-like="fm.isLike" 
                    @like="(likeSong(fm.id, true),userStore.addLikeSong(fm.id))"
                    @dislike="(likeSong(fm.id, false),userStore.removeLikeSong(fm.id))" 
                    :key="fm.id"
                )
                button-play-vue(:is-paused="$player.isPaused" @play="$player.play" @pause="$player.pause")
                el-icon(@click="next" :size="40"  ) 
                    el-icon-caretRight
        div
            the-lyric-parser-vue(:lyric="lyric")
</template>

<script lang="ts" setup>
import { getSongLyric, likeSong } from '@/api/song'
import { getPersonalFm } from '@/api/user'
import ButtonPlayVue from '@/components/ButtonPlay.vue'
import ButtonHeartVue from '@/components/iconButton/ButtonHeart.vue'
import TheLyricParserVue from '@/components/TheLyricParser.vue'
import type { Song } from '@/interface'
import type { FMResponse } from '@/interface/fm'
import { usePlayerStore } from '@/store/playerStore'
import { useUserStore } from '@/store/userStore'
import { computed, ref, watch } from 'vue'

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
			lyric.value = res.lrc.lyric
		})
	}
)

const fm = computed(() => (fms.value || [])[curSongIndex.value])

const next = () => {
	if (curSongIndex.value + 1 < (fms.value?.length || 1)) {
		curSongIndex.value++
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
