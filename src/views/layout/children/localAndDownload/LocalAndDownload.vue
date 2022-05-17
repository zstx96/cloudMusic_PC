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

const curComponent = computed(() => {
	// NOTE 可能因为没有调用 所以没有追踪 activeName 这个
	// return defineAsyncComponent(() => import( `./component/${activeName.value}.vue`))
	const path = `./component/${activeName.value}.vue`
	return defineAsyncComponent(() => import(path))
})
</script>

<style scoped lang="less"></style>
