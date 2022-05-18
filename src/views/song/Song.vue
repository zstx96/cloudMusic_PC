<template lang="pug">
transition(name="scale")
	div(class="h-full flex flex-col relative")
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
			div(v-if="commentRes" class="w-1/2 m-auto")
				p(class=" text-xl font-bold") {{ commentRes.commentsTitle }}({{ commentRes.totalCount }})
				div
					div(class="text-sm")
						list-comment-vue(:comments="commentRes.comments")
					div(class="flex justify-center" v-if="commentRes.totalCount" )
						el-pagination(layout="prev, pager, next" :total="50" class="m-auto text-center")
					div(v-else)
						p(class=" text-blue-500 text-center cursor-pointer mt-6") 尚未有人评论,点击评论
		div(v-if="true" 
			class=" fixed w-full" 
			:style="{'transform':`translateY(${offsetY-40}px)`,'width':`${app_width}px`}"
		)  
			el-button(
				type="info" 
				icon="el-icon-edit" 
				round 
				@click="commentBoxVisible = true"
				class="absolute left-[75%] "
			) 写评论
		// TODO 还要写一套滚动发生时的ui
box-new-comment-vue(v-if="song" v-model:visible="commentBoxVisible" :title="song.name"  )
</template>

<script lang="ts" setup>
import BoxNewCommentVue from '@/components/BoxNewComment.vue'
import ListCommentVue from '@/components/ListComment.vue'
import headerVue from '@/views/layout/header/header.vue'
import { getComment, getSongDetail, getSongLyric } from '@/api/song'
import type { CommentRes, Song } from '@/interface/interface'
import { useRouteQuery } from '@vueuse/router'
import { computed, ref, watch } from 'vue'
import { usePlayerStore } from '@/store/playerStore'
import { withLoading } from '@/utils/withLoading'
import { useRecordStore } from '@/store/recordStore'
import { app_height, app_controller_height, app_width } from '@/config'

const offsetY = computed(() => app_height.value - app_controller_height)
const commentBoxVisible = ref(false)

const id = useRouteQuery<string>('id')
const playStore = usePlayerStore()
const recordStore = useRecordStore()

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
	recordStore.addPlayRecord([song.value])
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
			withLoading(initSong, { target: '#app' })(parseInt(v)).then((_) => {
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
