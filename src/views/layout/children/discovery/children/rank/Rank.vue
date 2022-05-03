<template lang='pug'>
div(class="overflow-auto"  )
    p() 官方榜
    div(v-if="official")
        div(v-for="item in official" class="flex items-center justify-between gap-3 mb-2")
            div
                el-image(:src="item.coverImgUrl" :style="{ 'height': '175px', 'width': '175px' }")
            el-table(v-if="item.tracks" 
            :data="item.tracks" 
            :row-class-name="({row,rowIndex})=>(rowIndex%2===0)?'':'stripe'"
            :show-header="false")
                el-table-column(type="index" )
                el-table-column(prop="name" )
                el-table-column(prop="ar[0][name")
            el-skeleton(v-else :rows="5")
    p 全球榜
    div(class=" grid grid-cols-5 gap-3"  v-if="global")
        div(v-for="item in global")
            div(class="relative")
                el-image(:src="item.coverImgUrl" 
                lazy
                class=" rounded cursor-pointer"
                @click="$router.push(`/playlist/${item.id}`)"
                fit="fill")
                    template(#placeholder)
                        span isLoading ...
                play-count-inner-vue(:count="item.playCount")
            p(class="text-sm w-[138px]") {{ item.name }}

</template>

<script lang="ts" setup>
import { getPlaylistDetail, getTopList } from '@/api/songlist'
import playCountInnerVue from '@/components/iconButton/playCountInner.vue'
import type { Playlist, Song } from '@/interface/interface'
import { ref } from 'vue'
const official = ref<(Playlist & { tracks?: Song[] })[]>()
const global = ref<Playlist[]>()


const isLoading = ref(true)
getTopList().then(res => {
	official.value = res.list.slice(0, 3)
	official.value.forEach(v => {
		getPlaylistDetail(v.id).then(res => {
			v.tracks = res.playlist.tracks.slice(0, 5)
		})
	})
	global.value = res.list.slice(3)
	isLoading.value = false
})
</script>

<style scoped lang="less">

</style>