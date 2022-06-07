<template>
	<div ref="loadingRef"><list-song-vue v-if="songs" :data="songs"></list-song-vue></div>
</template>

<script lang="ts" setup>
import ListSongVue from '@/components/ListSong.vue'
import { getSearchResult } from '@/api/search'
import { SearchType } from '@/enum'
import type { Song } from '@/interface'
import { withLoading } from '@/utils/withLoading'
import { nextTick, ref } from 'vue'
import { useRoute } from 'vue-router'
const keyword = useRoute().query.keyword as string

const loadingRef = ref<HTMLElement>()

const songs = ref<Song[]>()
nextTick(() => {
	withLoading(getSearchResult as () => Promise<{ result: { songs: Song[] } }>, { target: loadingRef.value })(
		keyword,
		SearchType.song
	).then((res) => {
		songs.value = res.result.songs
	})
})
</script>

<style scoped lang="less"></style>
