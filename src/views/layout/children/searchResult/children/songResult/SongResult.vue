<template lang='pug'>
playlist-display-vue(v-if="songs" :data="songs")
</template>

<script lang="ts" setup>
import { getSearchResult } from '@/api/search'
import playlistDisplayVue from '@/components/playlist/playlistDisplay.vue'
import { SearchType } from '@/enum'
import type { Song } from '@/interface'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const keyword = useRoute().query.keyword as string

const songs = ref<Song[]>()
getSearchResult<{ result: { songs: Song[] } }>(keyword!, SearchType.song).then(res => {
	songs.value = res.result.songs
})

</script>

<style scoped lang="less">
</style>