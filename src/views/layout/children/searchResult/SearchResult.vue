<template lang="pug">
div(v-if="result")
	p.text-xl.font-bold 搜索 {{ keyword }}
	h3(class=" text-app-gray text-sm py-2") 你可能感兴趣
	div(class="flex  text-sm")
		div(v-for="item in result.orders" class="bg-slate-200 h-16 m-4 rounded cursor-pointer  w-1/3 px-2 ") 
			component(:is="loadComponent(item)" :data="result[item]" class="h-full flex items-center gap-2")
	el-tabs(:active-name="activeName" @tab-change="handleTabChange")
		el-tab-pane(v-for="item in tabs" :name="item.name" :label="item.label")
	div()
		//FIXME 切换页面因为scrollbar消失重新出现,导致页面一瞬间变形,并且有闪烁
		router-view(:key="$route.query.keyword")
</template>

<script lang="ts" setup>
import { getMultimatch } from '@/api/search'
import { SearchType } from '@/enum'
import { useRouteQuery } from '@vueuse/router'
import type { TabPanelName } from 'element-plus'
import { defineAsyncComponent, onActivated, ref, watch } from 'vue'
import type { Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const keyword = useRouteQuery('keyword') as Ref<string>

type SearchTypeKey = keyof typeof SearchType
const tabs: { label: string; name: `${SearchTypeKey}Result` }[] = [
	{
		label: '单曲',
		name: 'songResult',
	},
	{
		label: '歌手',
		name: 'artistResult',
	},
	{
		label: '专辑',
		name: 'albumResult',
	},
	{
		label: '视频',
		name: 'mvResult',
	},
	{
		label: '歌单',
		name: 'playlistResult',
	},
	{
		label: '歌词',
		name: 'lyricResult',
	},
	{
		label: '博客',
		name: 'radioResult',
	},
	{
		label: '声音',
		name: 'voiceResult',
	},
	{
		label: 'user',
		name: 'userResult',
	},
]
const activeName = ref(route.name as string)
const result = ref<Awaited<ReturnType<typeof getMultimatch>>['result']>()
watch(
	() => keyword.value,
	(keyword) => {
		getMultimatch(keyword).then((res) => {
			result.value = res.result
		})
	},
	{
		immediate: true,
	}
)

const handleTabChange = (name: TabPanelName) => {
	router.push({ name: name as string, query: { keyword: keyword.value } })
}
// vue component动态导入组件
const loadComponent = (name: string) => defineAsyncComponent(() => import(`./components/${name}.vue`))

// 非同页面进入
onActivated(() => {
	keyword.value = route.query.keyword as string
})
</script>

<style scoped lang="less"></style>
