<template>
	<div>
		<p>正在下载</p>
		<div v-if="downloadStore.downloadList.length" class="flex gap-2">
			<template v-for="item in downloadStore.downloadList" :key="item.id"
				><span>{{ item.name }}</span
				><el-progress :percentage="item.percentage"> </el-progress>
				<p>{{ item.percentage }}</p></template
			>
		</div>
		<el-empty v-else></el-empty>
	</div>
</template>

<script lang="ts" setup>
import { useDownloadStore } from '@/store/downloadStore'

const downloadStore = useDownloadStore()
</script>

<style scoped lang="less"></style>
