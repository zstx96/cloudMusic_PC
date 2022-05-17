<template lang="pug">
div(class="")
    p 正在下载
    div(v-if="downloadStore.downloadList.length")
        template(v-for="item in downloadStore.downloadList" :key="item.id" class="flex gap-2")
            span {{item.name}}
            el-progress( :percentage="item.percentage")  
            p {{item.percentage}}
    el-empty(v-else)
</template>

<script lang="ts" setup>
import { useDownloadStore } from '@/store/downloadStore'

const downloadStore = useDownloadStore()
</script>

<style scoped lang="less"></style>
