<template lang="pug">
p(class=" text-sm text-app-gray pt-2 cursor-pointer" @click="$emit('update:visible', !visible)" ) 
    span {{title}}
    el-icon(v-if="!visible")
        el-icon-caretRight()
    el-icon(v-else)
        el-icon-caretBottom
div(v-if="list.length" class="pl-1" v-show="visible")
    p(v-for="item in list" 
    :data-pid="item.id"
    class="flex gap-2 hover:bg-app-gray hover:bg-opacity-30 items-center cursor-pointer py-1 text-ellipsis overflow-hidden whitespace-nowrap"
    :class="[(activeNav === item.id.toString() )&&'bg-app-gray bg-opacity-30']"
    @click="($emit('update:activeNav',item.id.toString()),$router.push({name:'playlist',params:{id:item.id}}))"
    ) 
        el-icon
            el-icon-headset
        span {{ item.name }}
</template>

<script lang="ts" setup>
import type { Playlist } from '@/interface'

defineProps<{
	visible: boolean
	list: Playlist[]
	title: string
	activeNav: string
}>()
</script>

<style scoped lang="less"></style>
