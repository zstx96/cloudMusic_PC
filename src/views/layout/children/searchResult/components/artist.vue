<template>
	<div
		class="flex h-full items-center gap-3 px-2"
		@click="$router.push({ name: 'artist', params: { id: data[0].id } })"
	>
		<el-avatar :src="data[0].img1v1Url + '?param=200y200'"></el-avatar>
		<div>
			<div class="text-sm">
				<span>歌手: </span><span>{{ data[0].name }}</span>
			</div>
			<p class="text-xs text-app-gray">粉丝：{{ data[0].fansCount }}，歌曲：{{ data[0].musicSize }}</p>
		</div>
	</div>
</template>

<script lang="ts" setup>
import type { Artist } from '@/interface'
defineProps<{ data: Artist[] }>()
</script>

<style scoped lang="less"></style>
