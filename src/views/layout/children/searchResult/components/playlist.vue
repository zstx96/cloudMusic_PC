<template>
	<div class="overflow-hidden" @click="$router.push({ name: 'playlist', params: { id: data[0].id } })">
		<el-image class="h-14 w-14 shrink-0" :src="data[0].coverImgUrl + '?params=200y200'"></el-image>
		<div>
			<p class="ellipsis">
				歌单：<span>{{ data[0].name }}</span>
			</p>
			<p class="text-xs text-app-gray">
				歌曲：{{ formatNumber(data[0].trackCount) }}，播放：{{ formatNumber(data[0].playCount) }}
			</p>
		</div>
	</div>
</template>

<script lang="ts" setup>
import type { Playlist } from '@/interface'
import { formatNumber } from '@/utils/format'
defineProps<{ data: Playlist[] }>()
</script>

<style scoped lang="less"></style>
