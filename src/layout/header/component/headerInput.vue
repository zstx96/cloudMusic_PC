<template lang='pug'>
div(class="relative")
    el-icon(@click="$router.back()" :size="28" color="white"  class=" rounded-full bg-black p-1 bg-opacity-20" )
        el-icon-arrowLeft
    el-icon(@click="$router.forward()" :size="28" color="white" class=" rounded-full bg-black p-1 bg-opacity-20")
        el-icon-arrowRight
    el-input( prefix-icon="el-icon-search" 
    :placeholder="showKeyword" v-model="realKeyword"
    @blur="handleBlur"
    @focus="handleFocus"
    @change="handleChange"
    )
    el-card(v-show="suggestionVisible" 
    class="absolute left-0 top-[60px]  h-[500px] w-[350px]  z-[10000] px-2" )
        headerInputSuggestBoxVue
</template>

<script lang="ts" setup>
import { getSearchDefault } from '@/api/search';
import { useLocalStorage } from '@vueuse/core';
import { ref } from 'vue';
import headerInputSuggestBoxVue from "./headerInputSuggestBox.vue"

const showKeyword = ref('')
const realKeyword = ref('')

getSearchDefault().then(res=>{
    showKeyword.value = res.data.showKeyword
    realKeyword.value = res.data.realKeyword
})

const suggestionVisible = ref(false)
const  handleFocus = () => {
    suggestionVisible.value = true
    
}
const handleBlur = () => {
    suggestionVisible.value = false
}
const searchHistory = useLocalStorage<string[]>('searchHistory',[])
const handleChange = (v:string | undefined)=>{
    if(v){
        searchHistory.value.push(v)
    }
}
</script>

<style scoped lang="less">

</style>