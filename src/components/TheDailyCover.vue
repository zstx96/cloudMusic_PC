<template>
	<div>
		<div class="relative cursor-pointer overflow-hidden" @click="$router.push(`/dailyRecommendSongs`)">
			<p
				class="absolute z-10 w-full -translate-y-full bg-slate-500 bg-opacity-40 px-1 py-2 text-sm text-white transition-transform duration-300"
				:class="[dailyDescVisible && ' translate-y-0']"
			>
				根据你的音乐口味每日生成
			</p>
			<el-image
				class="rounded blur-xl"
				src="https://p2.music.126.net/6-ODonIQbSgK-h9TK-_jYw==/109951167191096963.jpg?imageView"
			></el-image>
			<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-125">
				<svg-date-vue></svg-date-vue>
			</div>
			<play-inner-red-vue
				class="absolute bottom-2 right-2 z-[1000] transition duration-500"
				:class="[hoverElIndex === -1 ? '' : ' hidden']"
			></play-inner-red-vue>
		</div>
		<p class="text-sm" v-text="'每日推荐歌曲'"></p>
	</div>
</template>

<script lang="ts" setup>
import playInnerRedVue from './iconButton/playInnerRed.vue'
import SvgDateVue from './iconButton/SvgDate.vue'
defineProps<{
	dailyDescVisible: boolean
	hoverElIndex: number
}>()
</script>

<style scoped lang="less"></style>
