<template lang='pug'>
el-table(:data="data" class="text-sm" stripe @row-dblclick="handleRowDblClick")
    el-table-column(type="index")
    el-table-column(label="操作" width="64")
        template(#default="{ row }")
            heart-button-vue(:is-like="row.isLiked" class=" w-5 h-5")
    el-table-column(label="标题" prop="name")
    el-table-column(label="歌手" :width="138" )
        template(#default="{ row }")
            div(class=" w-32  text-ellipsis  whitespace-nowrap ")
                span(v-for="item in row.ar" class=" cursor-pointer text-blue-500") {{ item.name }}/
    el-table-column(label="专辑")
        template(#default="{ row }")
            span(v-text="row.al.name" class=" w-32  text-ellipsis  whitespace-nowrap ")
    el-table-column(label="时间" prop=" ")
        template(#default="{ row }")
            span(v-text="dayjs(row.dt).format('mm:ss')")
</template>

<script lang="ts" setup>
import dayjs from "dayjs"
defineProps<{ data: any[] }>()
</script>

<style scoped lang="less">
</style>