<template lang='pug'>
div(class='h-full flex items-center gap-2 px-1 ' v-if="data[0]")
    div(class='')
        el-avatar(:src="data[0].baseInfo.resource.mlogBaseData.coverUrl ")
    div(class='flex-1 ellipsis items-center py-2')
        span(v-text="data[0].baseInfo.resource.mlogBaseData.text ")
</template>

<script lang="ts" setup>
interface New_mlog{
    baseInfo:{
        id:string,
        resource:{
            mlogBaseData:{
                coverUrl:string,
                text:string
            },
            mlogExtVO:{
                likeCount:number,
                playCount:number,
                canCollect:boolean,
                commentCount:number
            }
        }
    },
    resourceId:string
}
defineProps<{data:New_mlog[]}>()
</script>

<style scoped lang="less">
</style>