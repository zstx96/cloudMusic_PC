<template>
	<div>
		<p>最新音乐</p>
		<div class="relative m-auto flex w-60 overflow-hidden rounded-full border text-center">
			<div
				class="absolute h-full w-1/2 transform overflow-hidden rounded-full bg-[#bbbbbb] opacity-50 transition"
				:class="[activeTab === '新碟上架' && ' translate-x-full']"
			></div>
			<div
				v-for="item in tabs"
				:key="item"
				class="flex-1 cursor-pointer py-1"
				@click="activeTab = item"
				v-text="item"
			></div>
		</div>
		<component :is="NewSongsComp"></component>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import NewSongsComp from './component/NewSongsComp.vue'

const tabs: ('新歌速递' | '新碟上架')[] = ['新歌速递', '新碟上架']
const activeTab = ref<'新歌速递' | '新碟上架'>('新歌速递')
</script>

<style scoped lang="less">
.active-tab {
	border-radius: 100px;
	overflow: hidden;
	background-color: #bbbbbb;
}
</style>
