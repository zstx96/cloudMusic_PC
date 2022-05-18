<template lang="pug">
div
    p 最新音乐
    div(class="flex w-60 rounded-full overflow-hidden border text-center m-auto relative  ")
        div(class="absolute  bg-[#bbbbbb] rounded-full w-1/2 h-full overflow-hidden transform transition opacity-50" 
            :class="[(activeTab === '新碟上架')&& ' translate-x-full']"
         )
        div(
            class="flex-1 py-1 cursor-pointer"
            v-for="item in tabs"
            v-text="item"
            @click="activeTab = item"
        )  
    component(:is="NewSongsComp")
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
