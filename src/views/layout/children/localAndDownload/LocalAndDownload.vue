<template lang="pug">
div
    p 下载管理
    el-tabs(v-model="activeName")
        el-tab-pane( label="已下载" name="downloaded")
        el-tab-pane( label="正在下载" name="isLoading")
        el-tab-pane( label="test" name="test")
    component(:is="curComponent" )
</template>

<script lang="ts" setup>
import { computed, defineAsyncComponent, ref } from 'vue'

const activeName = ref('downloaded')

const components = import.meta.glob('./component/*.vue')

const curComponent = computed(() => {
	const key = `./component/${activeName.value}.vue`
	return defineAsyncComponent(components[key])
})
</script>

<style scoped lang="less"></style>
