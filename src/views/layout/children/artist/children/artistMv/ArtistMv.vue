<template>
	<div v-if="mvs" class="flex flex-wrap gap-2 text-sm">
		<div v-for="item in mvs" :key="item.id" class="mb-3 w-[305px] flex-shrink-0 rounded">
			<div class="relative">
				<el-image
					class="h-[171px] w-[305px] cursor-pointer"
					:src="item.imgurl"
					fit="cover"
					lazy
					@click="$router.push({ name: 'mv', params: { id: item.id } })"
				></el-image
				><span class="absolute bottom-2 right-2 text-white">{{ $dayjs(item.duration).format('mm:ss') }}</span
				><play-count-inner-vue :count="item.playCount"></play-count-inner-vue>
			</div>
			<div class="w-[305px] overflow-hidden text-ellipsis whitespace-nowrap">
				<span> {{ item.name }}</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { getArtistMv } from '@/api/artist'
import playCountInnerVue from '@/components/iconButton/playCountInner.vue'
import type { Mv } from '@/interface'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const id = parseInt(useRoute().params.id as string)

const hasMore = ref()
const mvs = ref<Mv[]>()

const emit = defineEmits<{
	(event: 'update:voidPage', flag: boolean): void
}>()
// getArtistAllMv()
getArtistMv(id).then((res) => {
	if (res.mvs.length) {
		mvs.value = res.mvs
		hasMore.value = res.hasMore
	} else {
		// debugger
		emit('update:voidPage', true)
	}
})
</script>

<style scoped lang="less"></style>
