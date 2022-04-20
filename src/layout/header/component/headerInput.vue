<template lang='pug'>
div(class="relative")
    el-icon(@click="$router.back()" :size="28" color="white"  class="animate-pulse cursor-pointer  rounded-full bg-black p-1 bg-opacity-20" )
        el-icon-arrowLeft
    el-icon(@click="$router.forward()" :size="28" color="white" class=" animate-pulse cursor-pointer rounded-full bg-black p-1 bg-opacity-20")
        el-icon-arrowRight
    el-input( prefix-icon="el-icon-search" 
    :placeholder="showKeyword" v-model="realKeyword"
    @focus="handleFocus"
    @change="handleChange"
    )
    teleport(to="#app")
        div(v-show="suggestionVisible" @click.self="closeBox"  class="h-full w-full absolute top-0 left-0")
            el-card(class="absolute left-[268px] top-[60px]  h-[500px] w-[350px]  z-[10000] px-2" )
                header-input-suggest-box-vue
</template>

<script lang="ts" setup>
import { getSearchDefault } from '@/api/search';
import { useLocalStorage } from '@vueuse/core';
import { ref } from 'vue';
import headerInputSuggestBoxVue from "./headerInputSuggestBox.vue"

const showKeyword = ref('')
const realKeyword = ref('')

getSearchDefault().then(res => {
    showKeyword.value = res.data.showKeyword
    realKeyword.value = res.data.realKeyword
})

const suggestionVisible = ref(false)
const handleFocus = () => {
    suggestionVisible.value = true

}
const closeBox = () => {
    suggestionVisible.value = false
}
const searchHistory = useLocalStorage<string[]>('searchHistory', [])
const handleChange = (v: string | undefined) => {
    if (v) {
        searchHistory.value.push(v)
    }
}
</script>

<style scoped lang="less">
</style>