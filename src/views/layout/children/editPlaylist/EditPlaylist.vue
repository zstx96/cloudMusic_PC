<template lang="pug">
div
    h1(class=" font-bold text-xl") 编辑歌单信息

    div(class="flex gap-4")
        div(class="flex-1")
            el-form(label-width="120px")
                el-form-item(label="歌单名:")
                    el-input(v-model="detail.name")
                el-form-item(label="标签:")
                    el-input(v-model="detail.tags")
                el-form-item(label="简介:")
                    el-input(type="textarea" v-model="detail.description"  :rows="5")

        div(class="flex items-center gap-3 mx-12 flex-col")
            el-image(:src="detail.coverImgUrl" class="w-52 h-52" )
            el-button 编辑封面

</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
const route = useRoute()

// FIXME 传参有问题
const detail = JSON.parse(useLocalStorage('editPlaylistDetail', (route.params.detail as string) || '{}').value)
</script>

<style scoped lang="less"></style>
