<template>
	<el-container class="h-full font-sans"
		><el-header :style="{ height: `${app_header_height}px` }"><layout-header-vue></layout-header-vue></el-header
		><el-container class="overflow-auto" :style="{ height: `${app_main_height}px` }"
			><el-aside class="border-r px-[10px]" width="200px"><layout-aside-vue></layout-aside-vue></el-aside
			><el-main id="subApp" class="overflow-y-auto overflow-x-hidden" :style="{ height: `${app_main_height}px` }"
				><router-view v-slot="{ Component }"
					><keep-alive
						><component :is="Component"></component></keep-alive></router-view></el-main></el-container
	></el-container>
</template>

<script lang="ts" setup>
import { app_main_height, app_header_height } from '@/config'
import layoutAsideVue from './aside/layoutAside.vue'
import layoutHeaderVue from './header/layoutHeader.vue'
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
