<template lang="pug">
el-container(class="h-full font-sans")
    el-header( :style="{ 'height': `${app_header_height}px` }")
        header-vue
    el-container(class="overflow-auto"   :style="{ 'height': `${app_main_height}px` }")
        el-aside(width="200px" class="px-[10px] border-r")
            aside-vue
        el-main(class=" overflow-x-hidden overflow-y-auto " id="subApp" :style="{ 'height': `${app_main_height}px` }")
            router-view(#default="{Component}" )
                keep-alive
                    component(:is="Component")
</template>

<script lang="ts" setup>
import headerVue from './header/header.vue'
import asideVue from './aside/aside.vue'
import { app_main_height, app_header_height } from '@/config'
</script>

<style scoped lang="less">
.el-header {
	padding: 0 !important;
}
.rb-page {
	height: calc();
}
#subApp {
	scrollbar-gutter: both;
}
</style>
