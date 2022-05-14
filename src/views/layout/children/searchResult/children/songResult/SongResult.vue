<template lang="pug">
div(ref="loadingRef")
	playlist-display-vue(v-if="songs" :data="songs")
</template>

<script lang="ts" setup>
import { getSearchResult } from '@/api/search'
import playlistDisplayVue from '@/components/playlist/playlistDisplay.vue'
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
