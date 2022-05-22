<template lang="pug">
transition(name="scale")
  .relative.flex.h-full.flex-col
    // header
    div(class="h-[60px]")
      layout-header(v-if="$route.name === 'song'")
    // main
    div(class="h-full flex-1 overflow-y-auto px-[5vw]")
      // cover & lyric
      .flex.items-center.justify-around.gap-2(v-if="song" :key="$route.query.id?.toString()")
        el-image(class="aspect-square max-w-xs shrink-0 animate-spin-slow cursor-pointer rounded-full border-[24px] border-black" :src="song.al.picUrl + '?param=500y500'" fit="cover")
        .text-center
          p.text-2xl.font-bold(v-text="song.name")
          p.pb-3(v-text="song.ar[0].name")
          the-lyric-parser(:key="song.lyric" :lyric="song.lyric")
        .text-3xl.font-bold
        | others
      // comments
      div(class="m-auto w-1/2" v-if="commentRes" v-loading="isLoading")
        p.text-xl.font-bold {{ commentRes.commentsTitle }}({{ commentRes.totalCount }})
        div
          .text-sm
            list-comment(:comments="commentRes.comments")
          .flex.justify-center(v-if="commentRes.totalCount")
            el-pagination.m-auto.text-center(layout="prev, pager, next" :total="50")
          div(v-else)
            p.mt-6.cursor-pointer.text-center.text-blue-500 尚未有人评论,点击评论
    .fixed.w-full(v-if="true" :style="{ transform: `translateY(${offsetY - 40}px)`, width: `${app_width}px` }")
      el-button(class="absolute left-[75%]" type="info" icon="i-ep-edit" round @click="commentBoxVisible = true")
        | 写评论
    // TODO 还要写一套滚动发生时的ui
box-new-comment(v-if="song" v-model:visible="commentBoxVisible" :title="song.name")
</template>

<script lang="ts" setup>
import layoutHeader from '../layout/header/layoutHeader.vue'

import { getComment, getSongDetail, getSongLyric } from '@/api/song'
import type { CommentRes, Song } from '@/interface/interface'
import { useRecordStore } from '@/store/recordStore'
import { app_height, app_controller_height, app_width } from '@/config'
import { useRouteQuery } from '@vueuse/router'

const offsetY = computed(() => app_height.value - app_controller_height)
const commentBoxVisible = ref(false)

const id = useRouteQuery<string>('id')
const recordStore = useRecordStore()

const song = ref<Song & { lyric: string }>()
// lyric
const lyricRef = ref<HTMLElement>()
// comment
const commentRes = ref<CommentRes>()
const isLoading = ref(false)

const initSong = async (id: number) => {
	const {
		songs: [songRes],
	} = await getSongDetail(id)
	recordStore.addPlayRecord([songRes])
	const lyricRes = await getSongLyric(id)
	song.value = {
		...songRes,
		lyric: lyricRes,
	}
	const { data: CommentsRes } = await getComment(id, 1)
	commentRes.value = CommentsRes
}
watch(
	() => id.value,
	(v, old) => {
		isLoading.value = true
		if (!isNaN(parseInt(v))) {
			initSong(parseInt(v)).then((_) => {
				lyricRef.value?.scroll({ top: 0 })
				isLoading.value = false
			})
		}
	},
	{
		immediate: true,
	}
)
</script>

<style scoped lang="less">
.scale-enter-active,
.scale-leave-active {
	transform-origin: 3% 105%;
	transition: transform 0.3s ease;
}

.scale-enter-from,
.scale-leave-to {
	transform: scale(0%);
}
</style>
