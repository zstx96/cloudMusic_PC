<template>
	<div>
		<h1 class="text-xl font-bold">编辑歌单信息</h1>
		<div class="flex gap-4">
			<div class="flex-1">
				<el-form label-width="120px"
					><el-form-item label="歌单名:"><el-input v-model="detail.name"></el-input></el-form-item
					><el-form-item label="标签:"><el-input v-model="detail.tags"></el-input></el-form-item
					><el-form-item label="简介:"
						><el-input v-model="detail.description" type="textarea" :rows="5"></el-input></el-form-item
				></el-form>
			</div>
			<div class="mx-12 flex flex-col items-center gap-3">
				<el-image class="h-52 w-52" :src="detail.coverImgUrl"></el-image><el-button>编辑封面</el-button>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
const route = useRoute()

// FIXME 传参有问题
const detail = JSON.parse(useLocalStorage('editPlaylistDetail', (route.params.detail as string) || '{}').value)
</script>

<style scoped lang="less"></style>
