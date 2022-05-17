<template lang="pug">
div
    div(v-if="topSong" class="flex gap-2")
        div(class="w-40 h-40  flex flex-col items-center justify-center rounded bg-slate-500 flex-shrink-0 text-6xl text-white text-center font-extrabold")
            p TOP 
            p 50
        div
            p 热门50首
            list-song-vue(:data="topSong.slice(0,10)")
    div(v-if="albums" ) 
        div(v-for="item in albums" class="flex w-full gap-3 py-3 items-center ")
            div
                el-image(:src="item.picUrl+'?param=400y400'" 
                lazy
                class="w-40 h-40 cursor-pointer rounded"
                @click="$router.push({name:'album',params:{id:item.id}})")
            div(class=" bg-slate-300 rounded flex-1 h-40 ")
               span() {{item.name}}
               span {{item.briefDesc}}
               span {{item.description}}
            
</template>

<script lang="ts" setup>
import { getArtistAlbum, getArtistTopSong } from '@/api/artist'
import ListSongVue from '@/components/ListSong.vue'
import type { IHotAlbum, Song } from '@/interface'
import Service from '@/utils/Service'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = parseInt(route.params.id as string)

const albums = ref<IHotAlbum[]>()
const topSong = ref<Song[]>()
getArtistTopSong(id).then((res) => {
	topSong.value = res.songs
})

getArtistAlbum(id).then((res) => {
	albums.value = res.hotAlbums
	Service.get(`/album?id=${albums.value[0].id}`)
})
</script>

<style scoped lang="less"></style>
