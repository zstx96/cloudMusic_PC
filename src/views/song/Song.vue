<template lang="pug">
transition(name="scale")
	div(class="h-full flex flex-col ")
		div(class="h-[60px]")
			header-vue(class="  bg-transparent " )
		div( class="flex-1 px-[5vw]  h-full overflow-y-auto")
			div(v-if="song" class=" flex gap-2 justify-around items-center")
				el-image(:src="song.al.picUrl+'?param=500y500'" class="w-[15vw] h-[15vw]  rounded-full  cursor-pointer" fit="cover")
				div(class="text-center")
					p(v-text="song.name" class=" text-2xl font-bold")
					p(v-text="song.ar[0].name" class="pb-3")
					div(class=" text-center h-80 w-96 overflow-y-auto scroll-smooth " v-if="lyric"   ref="lyricRef" )
						p(v-for="([, text], index) in lyric" 
						class="py-1"
						:class="[(currentIndex == (index + 1)) ? 'font-bold text-black active-lyric-row' : 'text-app-gray']" 
						) {{ text !== "\n" ? text : '~~~~~~~~~~~~~~~~~' }}  

				div(class=" font-bold text-3xl")
				| others
			div(v-if="commentRes" class="w-[50vw] m-auto")
				p(class=" text-xl font-bold") {{ commentRes.commentsTitle }}({{ commentRes.totalCount }})
				div
					div(class="text-sm")
						comments-vue(:comments="commentRes.comments")
					div(class="flex justify-center" v-if="commentRes.totalCount" )
						el-pagination(layout="prev, pager, next" :total="50" class="m-auto text-center")
					div(v-else)
						p(class=" text-blue-500 text-center cursor-pointer mt-6") 尚未有人评论,点击评论
</template>

<script lang="ts" setup>
import { getComment, getSongDetail, getSongLyric } from '@/api/song'
import type { CommentRes, Song } from '@/interface/interface'
import headerVue from '@/views/layout/header/header.vue'
import { useRouteQuery } from '@vueuse/router'
import { ref, watch } from 'vue'
import commentsVue from '@/components/comment/comments.vue'
import { usePlayerStore } from '@/store/playerStore'
import { withLoading } from '@/utils/withLoading'

const id = useRouteQuery<string>('id')
const playStore = usePlayerStore()

const song = ref<Song>()
// lyric
const lyric = ref<[string, string][]>()
const lyricRef = ref<HTMLElement>()
let timeArr: number[]
const currentIndex = ref(0)

// comment
const commentRes = ref<CommentRes>()

const initSong = async (id: number) => {
	const {
		songs: [songRes],
	} = await getSongDetail(id)
	song.value = songRes
	const {
		lrc: { lyric: lyricRes },
	} = await getSongLyric(id)
	const arr = lyricRes.split('[')
	arr.shift()
	lyric.value = arr.map((str, index) => str.split(']')) as [string, string][]
	timeArr = lyric.value.map((v) => {
		const [m, s] = v[0].split(':')
		return +m * 60 + +s
	})

	const { data: CommentsRes } = await getComment(id, 1)
	commentRes.value = CommentsRes
	const el = document.querySelector('.active-lyric-row') as HTMLElement
	watch(
		() => playStore.currentTime,
		(t) => {
			if (t > +timeArr[currentIndex.value]) {
				currentIndex.value++
				if (el) {
					lyricRef.value?.scrollBy({ top: 32 })
				}
			}
		}
	)
}
watch(
	() => id.value,
	(v, old) => {
		if (!isNaN(parseInt(v))) {
			withLoading(initSong)(parseInt(v)).then((_) => {
				currentIndex.value = 0
				lyricRef.value?.scroll({ top: 0 })
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
	transform: scale(0);
}
</style>
