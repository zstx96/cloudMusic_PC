<template lang='pug'>
div(class="h-full flex flex-col pb-[70px]")
    header-vue(class="h-[70px]  bg-transparent text-black" :text-black="true")
    div( class="flex-1 px-[5vw]  h-full overflow-y-scroll")
        div(v-if="song" class=" flex gap-2 justify-around items-center")
            div()
                el-image(:src="song.al.picUrl" class=" w-[15vw] h-[15vw] rounded-full")
            div
            div(class=" text-center")
                p(v-text="song.name" class=" text-2xl font-bold")
                p(v-text="song.ar[0].name")
                div(class=" text-center h-80 w-96 overflow-y-scroll" v-if="lyric"   ref="lyricRef" )
            div
            | others
        div(v-if="commentRes" class="w-[50vw] m-auto")
            p(class=" text-xl font-bold") {{commentRes.commentsTitle }}({{commentRes.totalCount}})
            div(class="text-sm")
                div(v-for="comment in commentRes.comments" class="flex gap-3 py-3 ")
                    div(class="")
                        el-avatar(:src="comment.user.avatarUrl" )
                    div(class="border-b  pb-3  flex-1 ")
                        div
                            span(v-text="comment.user.nickname" class="text-blue-500")
                            |:{{comment.content}}
                        div(class="flex justify-between my-2")
                            span(class=" text-app-gray") {{dayjs(comment.timeStr).format('YYYY[年]MM[月]DD[日] hh:mm')}}
                            div(class="flex items-center gap-2")
                                span 举报
                                | |
                                span {{comment.likedCount}}
                                | |
                                span share 
                                | |
                                span message
            div(class="flex justify-center")
                el-pagination(layout="prev, pager, next" :total="50" class="m-auto text-center")

</template>

<script lang="ts" setup>
import { getComment, getSongDetail, getSongLyric } from '@/api/song';
import type { CommentRes, Song } from '@/interface/interface';
import headerVue from '@/layout/header/header.vue';
import { useRouteQuery } from '@vueuse/router'
import dayjs from 'dayjs';
import { reactive, ref } from 'vue';
import { onBeforeRouteUpdate } from 'vue-router';

const id = parseInt(useRouteQuery('id').value as unknown as string)
console.log(id);

const song = ref<Song>()
// lyric
const lyric = ref()
const lyricRef = ref<HTMLElement>()
const formatLyric = (lyric: string) => {
    if (lyric) {
        const fragment = new DocumentFragment()
        const arr = lyric.split('[')
        arr.shift()
        arr.forEach(str => {
            const [time, lyric] = str.split(']')
            const p = document.createElement('p')
            p.dataset['time'] = time
            p.textContent = lyric
            fragment.append(p)
        })
        const div = document.createElement('div')
        div.appendChild(fragment)
        lyricRef.value!.innerHTML = div.innerHTML
    }
}

// comment
const commentRes = ref<CommentRes>()


const initSong = async (id: number) => {
    const { songs: [songRes] } = await getSongDetail(id)
    const { lrc: { lyric: lyricRes } } = await getSongLyric(id)
    const { data: CommentsRes } = await getComment(id, 1)
    song.value = songRes
    lyric.value = lyricRes
    commentRes.value = CommentsRes

    setTimeout(() => {
        formatLyric(lyricRes)
    }, 0);

}
initSong(id)
onBeforeRouteUpdate((to) => {
    const id = (to.query as any).id
    initSong(id)
})

</script>

<style scoped lang="less">
</style>