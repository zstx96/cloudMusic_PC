<template>
	<div>
		<p>正在下载</p>
		<div v-if="downloadStore.downloadList.length">
			<div v-for="item in downloadStore.downloadList" :key="item.id" class="flex gap-2">
				><el-progress :percentage="item.percentage"> </el-progress>
				<p>{{ item.percentage }}</p>
			</div>
		</div>
		<el-empty v-else></el-empty>
	</div>
</template>

<script lang="ts" setup>
import { useDownloadStore } from '@/store/downloadStore'

const downloadStore = useDownloadStore()
</script>

<style scoped lang="less"></style>
