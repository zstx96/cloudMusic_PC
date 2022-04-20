<template lang='pug'>
el-container(class="h-full font-sans")
    el-header(class="w-full" :style="{ 'height': `${app_header_height}px` }")
        header-vue
    el-container(class="")
        el-aside(width="200px" class="px-[10px] border-r")
            aside-vue
        el-main(class=" overflow-x-hidden" :style="{ 'height': `${app_main_height}px` }")
            router-view
</template>

<script lang="ts" setup>
import headerVue from "./header/header.vue"
import asideVue from "./aside/aside.vue";
import { app_main_height, app_header_height } from "@/config";
</script>

<style scoped lang="less">
.el-header {
    padding: 0 !important;
}

.rb-page {
    height: calc();
}
</style>