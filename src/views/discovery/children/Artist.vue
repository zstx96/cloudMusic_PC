<template lang='pug'>
div(class="flex flex-col gap-2 text-xs controller")
    div
        span() 语种：
        span(v-text="'全部'" @click="selectArea(AreaType.all)" ) 
        span(v-text="'华语'" @click="selectArea(AreaType.CN)" ) 
        span(v-text="'欧美'" @click="selectArea(AreaType.EU)" ) 
        span(v-text="'日本'" @click="selectArea(AreaType.JP)" ) 
        span(v-text="'韩国'" @click="selectArea(AreaType.KR)" ) 
        span(v-text="'其他'" @click="selectArea(AreaType.other)" ) 
    div
        span() 分类：
        span(v-text="'全部'" @click="selectClass(ArtistType.all)" ) 
        span(v-text="'男歌手'" @click="selectClass(ArtistType.male)" ) 
        span(v-text="'女歌手'" @click="selectClass(ArtistType.female)" ) 
        span(v-text="'乐队组合'" @click="selectClass(ArtistType.band)" ) 

    div
        span() 筛选：
        span(v-text="'热门'"   @click="selectInitial(-1)" )
        span(v-for="item in 26" @click="selectInitial(String.fromCharCode(item + 64))") {{ String.fromCharCode(item + 64) }}
        span(v-text="'#'"  @click="selectInitial(0)")
div(class="flex flex-wrap   gap-2 text-sm m-auto ")
    div(v-for="artist in artists" class="w-[15%]  ")
        el-image(:src="artist.picUrl + '?param=500y500'" 

        @click="$router.push(`/artist?id=${artist.id}`)" 
        class="rounded cursor-pointer  flex-shrink " )
        div {{ artist.name }}

</template>

<script lang="ts" setup>
import { getArtistList } from '@/api/artist';
import { AreaType, ArtistType } from '@/enum';
import type { Artist } from '@/interface/interface';
import { ref, watchEffect } from 'vue';


const selectedArea = ref(AreaType.all)
const selectedClass = ref(ArtistType.all)
const selectedInitial = ref('-1')

const artists = ref<Artist[]>()

watchEffect(() => {
    getArtistList(selectedClass.value, selectedArea.value).then((res) => {
        artists.value = res.artists
    })
})

const selectArea = (v: AreaType) => {
    selectedArea.value = v
}
const selectClass = (v: ArtistType) => {
    selectedClass.value = v
}
const selectInitial = (v: string | number) => {
    selectedInitial.value = v.toString()
}

</script>

<style scoped lang="less">
span {
    display: inline-block;
    width: 75px;
    text-align: center;
    padding: 5px;
}

.controller>* {}
</style>