<template>
	<div class="suggest-box text-black">
		<div class="flex items-center gap-2 text-sm text-app-gray">
			<span>搜索历史</span><el-icon @click="deleteAll"><i-ep-delete></i-ep-delete></el-icon
			><span class="flex-1"></span><span>查看全部</span>
		</div>
		<div class="max-h-24 overflow-hidden py-3">
			<!--  FIXME 搜索历史框高度是固定的，应该是[0,max] --><el-button
				v-for="word in searchRecord"
				:key="word"
				class="mb-1 border"
				round
				size="small"
				><span @click="$emit('selectWord', word)">{{ word }}</span
				><el-icon @click="deleteSingle(word)"><i-ep-close></i-ep-close></el-icon
			></el-button>
		</div>
		<p class="pb-3 text-sm text-app-gray">热搜榜</p>
		<div>
			<div
				v-for="(item, index) in hotSearch"
				class="flex w-[350px] -translate-x-5 cursor-pointer gap-3 px-5 py-2 hover:bg-[#f2f2f2]"
				@click="$emit('selectWord', item.searchWord)"
			>
				<div class="w-8" :class="[index <= 2 && 'text-red-500']" v-text="index + 1"></div>
				<span class="font-medium" v-text="item.searchWord"></span
				><span class="text-sm text-app-gray" v-text="item.score"></span>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { getHotSearchDetail } from '@/api/search'
import { useRecordStore } from '@/store/recordStore'
import { ref } from 'vue'

defineEmits<{
	(event: 'selectWord', word: string): void
}>()

const recordStore = useRecordStore()

// 搜索历史 本地
const searchRecord = recordStore.searchRecord

const deleteAll = () => {
	recordStore.clearSearchRecord()
}
const deleteSingle = (v: string) => {
	recordStore.removeSearchRecord(v)
}
const hotSearch = ref<{ searchWord: string; score: number }[]>()
getHotSearchDetail().then((res) => {
	hotSearch.value = res.data
})
</script>

<style scoped lang="less"></style>
