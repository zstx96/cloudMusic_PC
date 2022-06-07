<template>
	<div>
		<el-carousel v-if="appStore.banners.length" type="card" height="200px" indicator-position="none"
			><el-carousel-item v-for="item in appStore.banners" :key="item.bannerId" class="overflow-hidden rounded"
				><img :src="item.pic" /></el-carousel-item
		></el-carousel>
		<div v-if="recommendList">
			<p class="text-xl font-bold">推荐歌单></p>
			<div class="grid grid-cols-5 gap-2 xl:m-auto">
				<div class="relative flex flex-col break-words">
					<the-daily-cover-vue
						:daily-desc-visible="dailyDescVisible"
						:hover-el-index="hoverElIndex"
						@mouseover="hoverDaily"
						@mouseleave="handleMouseLeave()"
					></the-daily-cover-vue>
				</div>
				<div v-for="(item, index) in recommendList" :key="index">
					<cover-vue
						v-model:hoverElIndex="hoverElIndex"
						:pic-url="item.picUrl"
						:playcount="item.playcount"
						:index="index"
						@click="$router.push({ name: 'playlist', params: { id: item.id } })"
						@mouseleave="handleMouseLeave(index)"
					></cover-vue>
					<p class="text-sm" v-text="item.name"></p>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store/appStore'
import { getDailyPlaylist } from '@/api/songlist'
import { ref } from 'vue'
import type { Playlist } from '@/interface/interface'
import coverVue from '@/components/Cover.vue'
import TheDailyCoverVue from '@/components/TheDailyCover.vue'

const appStore = useAppStore()

const recommendList = ref<Playlist[]>()
const hoverElIndex = ref(-2)
getDailyPlaylist().then((res) => {
	recommendList.value = res.recommend
})

const dailyDescVisible = ref(false)
const hoverDaily = () => {
	hoverElIndex.value = -1
	dailyDescVisible.value = true
}

const handleMouseLeave = (index?: number) => {
	if (index === undefined) {
		dailyDescVisible.value = false
	}
	hoverElIndex.value = -2
}
</script>

<style scoped lang="less"></style>
