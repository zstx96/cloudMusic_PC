<template>
	<div class="relative">
		<el-icon
			class="animate-pulse cursor-pointer rounded-full bg-black bg-opacity-20 p-1"
			:size="28"
			color="white"
			@click="$router.back()"
			><i-ep-arrowLeft></i-ep-arrowLeft></el-icon
		><el-icon
			class="animation-delay animate-pulse cursor-pointer rounded-full bg-black bg-opacity-20 p-1"
			:size="28"
			color="white"
			@click="$router.forward()"
			><i-ep-arrowRight></i-ep-arrowRight></el-icon
		><el-input
			ref="searchEl"
			v-model="realKeyword"
			class="z-[1002]"
			:placeholder="showKeyword"
			@focus="handleFocus"
			@change="handleSelectWord"
			@keyup.enter="handleSelectWord(realKeyword)"
		></el-input
		><teleport to="#app">
			<div v-show="suggestionVisible" class="absolute top-0 left-0 z-[1001] h-full w-full" @click.self="closeBox">
				<div
					class="absolute left-[268px] top-[60px] h-[500px] w-[350px] overflow-y-auto overflow-x-hidden bg-slate-200 p-5"
				>
					<header-input-suggest-box-vue @select-word="handleSelectWord"></header-input-suggest-box-vue>
				</div></div
		></teleport>
	</div>
</template>

<script lang="ts" setup>
import { getSearchDefault } from '@/api/search'
import { useRecordStore } from '@/store/recordStore'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import headerInputSuggestBoxVue from './headerInputSuggestBox.vue'

const recordStore = useRecordStore()
const router = useRouter()
const searchEl = ref()
const showKeyword = ref('')
const realKeyword = ref('')
let baseKeyword = ''

getSearchDefault().then((res) => {
	showKeyword.value = res.data.showKeyword
	baseKeyword = res.data.realkeyword
})

const suggestionVisible = ref(false)
const handleFocus = () => {
	suggestionVisible.value = true
}
const closeBox = () => {
	suggestionVisible.value = false
}
const handleChange = (v: string | undefined) => {
	if (v) {
		recordStore.pushSearchRecord(v)
	}
}
const handleSelectWord = (word: string) => {
	realKeyword.value = word
	if (realKeyword.value === '') {
		realKeyword.value = baseKeyword
	}
	handleChange(word)
	router.push(`/searchResult?keyword=${realKeyword.value}`)
	suggestionVisible.value = false
}
</script>

<style scoped lang="less">
.animation-delay {
	animation-delay: 500ms;
}
</style>
