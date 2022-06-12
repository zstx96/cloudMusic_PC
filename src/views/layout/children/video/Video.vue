<template>
	<div class="flex flex-col gap-4">
		<!-- title tabs -->
		<div class="text-2xl font-semibold">视频</div>
		<!-- tags -->
		<div class="flex items-center justify-between text-sm">
			<el-button round>
				全部视频
				<i-ep-arrow-right></i-ep-arrow-right>
			</el-button>
			<span class="flex-1"></span>
			<span
				v-for="({ name, id }, index) in cates"
				:class="[
					activeTab === index && ' rounded-full  bg-[#fcebeb] text-[#ec4141]',
					'ml-5 cursor-pointer py-0.5 px-3',
				]"
				@click="handleClickTab(id, index)"
				v-text="name"
			>
			</span>
		</div>
		<!-- list -->
		<div v-if="recommendVideos?.length" class="m-auto grid max-w-6xl grid-cols-4 gap-2">
			<cover
				v-for="item in recommendVideos"
				:key="item.vid"
				:pic-url="$resizeImg(item.coverUrl, 800, 400)"
				:playcount="item.commentCount"
				type="rect"
			>
			</cover>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { getAllVideo, getVideoCategory } from '@/api/video'
import { Video } from '@/interface'

const activeTab = ref(-1)

const handleClickTab = (id: number, index: number) => {
	activeTab.value = index
}
const recommendVideos = ref<Video[]>([])
const offset = ref(0)
const loadMore = (o = 0) => {
	getAllVideo(o).then((res) => {
		recommendVideos.value.push(...res.datas.map((v) => v.data))
		// recommendVideos.value = res.data
		offset.value += res.datas.length
		if (offset.value >= 50) return
		if (res.hasmore) {
			loadMore(offset.value)
		}
	})
}

const cates = ref<{ name: string; id: number }[]>()
getVideoCategory().then((res) => {
	console.log(res)
	cates.value = res.data.map((v) => ({
		name: v.name,
		id: v.id,
	}))
})

loadMore()
</script>

<style scoped lang="less"></style>
