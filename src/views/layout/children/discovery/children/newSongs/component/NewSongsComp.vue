<template>
	<div v-if="realData">
		<el-table :data="realData"
			><el-table-column type="index"></el-table-column
			><el-table-column
				><template #default="{ row }"
					><div class="relative h-14 w-14">
						<el-image :src="row.album.picUrl + '?param=200y200'"></el-image
						><play-inner-red-vue
							class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
						></play-inner-red-vue></div></template></el-table-column
			><el-table-column
				><template #default="{ row }"
					><p class="ellipsis">
						<span>{{ row.name }}</span
						><span>{{ row.album.alias[0] }}</span>
					</p></template
				></el-table-column
			><el-table-column
				><template #default="{ row }"
					><span
						class="cursor-pointer text-blue-600"
						@click="$router.push({ name: 'artist', params: { id: row.album.artists[0].id } })"
						>{{ row.album.artists[0].name }}</span
					></template
				></el-table-column
			><el-table-column
				><template #default="{ row }"
					><span class="ellipsis">{{ row.album.name }} ({{ row.album.alias[0] }})</span></template
				></el-table-column
			><el-table-column>
				<template #default="{ row }"
					><span>{{ $dayjs(row.duration).format('mm:ss') }}</span></template
				></el-table-column
			></el-table
		>
	</div>
</template>

<script lang="ts" setup>
import { getNewSongs } from '@/api/song'
import playInnerRedVue from '@/components/iconButton/playInnerRed.vue'
import { AreaType } from '@/enum'
import { ref } from 'vue'

const props = defineProps<{ type: AreaType }>()

const realData = ref()
const curPage = ref(0)
const size = 20
// 懒加载数据
const lazyLoad = async (page: number, list: any = []) => {
	realData.value = list.slice(0, (page + 1) * size)
	const raf = requestAnimationFrame(() => {
		page++
		if (page === list.length / size - 1) {
			window.cancelAnimationFrame(raf)
			return
		}
		lazyLoad(page, list)
	})
}

getNewSongs(props.type).then((res) => {
	requestAnimationFrame(() => {
		lazyLoad(curPage.value, res.data)
	})
})
</script>

<style scoped lang="less"></style>
