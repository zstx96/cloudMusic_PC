<template lang='pug'>
div(class="relative")
    el-icon(@click="$router.back()" :size="28" color="white"  class="animate-pulse cursor-pointer  rounded-full bg-black p-1 bg-opacity-20" )
        el-icon-arrowLeft
    el-icon(@click="$router.forward()" :size="28" color="white" class=" animate-pulse animation-delay  cursor-pointer rounded-full bg-black p-1 bg-opacity-20")
        el-icon-arrowRight
    el-input( prefix-icon="el-icon-search" 
    class="z-[10002]"
    :placeholder="showKeyword" 
    v-model="realKeyword"
    @focus="handleFocus"
    @change="handleSelectWord"
    @keyup.enter="handleSelectWord(realKeyword)"
    ref="searchEl"
    )
    teleport(to="#app") 
        div(v-show="suggestionVisible" @click.self="closeBox"  class="z-[10001]  h-full w-full absolute top-0 left-0")
            div(class=" bg-slate-200 p-5 overflow-y-auto overflow-x-hidden absolute left-[268px] top-[60px]  h-[500px] w-[350px]  " )
                header-input-suggest-box-vue( @select-word="handleSelectWord" )
</template>

<script lang="ts" setup>
import { getSearchDefault } from '@/api/search'
import { useRecordStore } from '@/store/recordStore'
import { useLocalStorage } from '@vueuse/core'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import headerInputSuggestBoxVue from './headerInputSuggestBox.vue'

const recordStore = useRecordStore()
const router = useRouter()
const searchEl = ref()
const showKeyword = ref('')
const realKeyword = ref('')
let baseKeyword = ''

getSearchDefault().then(res => {
	showKeyword.value = res.data.showKeyword
	baseKeyword = res.data.realkeyword

})

const suggestionVisible = ref(false)
const handleFocus = () => {
	suggestionVisible.value = true
}
const closeBox = () => {
	console.log('close box')
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
		console.log(baseKeyword)

		realKeyword.value = baseKeyword
	}
	handleChange(word)
	router.push(`/searchResult?keyword=${realKeyword.value}`)
}
</script>

<style scoped lang="less">
.animation-delay {
    animation-delay: 500ms;
}
</style>