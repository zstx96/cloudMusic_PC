<template lang='pug'>
div
    div(class="flex gap-2 items-center text-sm text-app-gray")
        span 搜索历史
        el-icon(@click="deleteAll")
            el-icon-delete
        span.flex-1
        span 查看全部
    div( class="") 
        span(v-for="word in searchHistory" class="mr-2 px-2 border rounded-[10px]" v-text="word")


</template>

<script lang="ts" setup>import { useLocalStorage } from '@vueuse/core';


// 搜索历史 本地
const searchHistory = useLocalStorage('searchHistory',[])

const deleteAll = ()=>{
    searchHistory.value = []
}
</script>

<style scoped lang="less">

</style>