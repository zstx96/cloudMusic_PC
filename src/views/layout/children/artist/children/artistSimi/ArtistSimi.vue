<template>
	<div v-if="artists">
		<p>similar</p>
		<div class="grid grid-cols-5 gap-4 overflow-auto">
			<div v-for="item in artists" :key="item.id">
				<el-image
					class="cursor-pointer rounded"
					:src="item.img1v1Url + '?param=500y500'"
					lazy
					@click="$router.push({ name: 'artistAlbum', params: { id: item.id } })"
					><template #placeholder
						><div class="h-full w-full"><span>isLoading ...</span></div></template
					></el-image
				><span>{{ item.name }}</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { getArtistSimile } from '@/api/artist'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const id = parseInt(route.params.id as string)

const artists = ref<Awaited<ReturnType<typeof getArtistSimile>>['artists']>()
getArtistSimile(id).then((res) => {
	artists.value = res.artists
})
</script>

<style scoped lang="less"></style>
