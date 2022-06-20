<template>
	<div v-if="users?.length" v-loading>
		<div
			v-for="item in users"
			class="flex h-20 cursor-pointer items-center justify-between gap-3 p-2 hover:bg-slate-200"
		>
			<el-avatar :src="item.avatarUrl" size="large" @click="$router.push(`/user/${item.userId}`)"></el-avatar
			><span v-text="item.nickname"></span><span class="flex-1"></span
			><span class="text-sm text-app-gray" v-text="item.signature"></span>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useRouteQuery } from '@vueuse/router'
import { ref } from 'vue'
import { getSearchResult } from '@/api/search'
import { SearchType } from '@/enum'
import type { UserProfile } from '@/interface'

const keyword = useRouteQuery('keyword').value as string
const users = ref<UserProfile[]>()
type Result = { result: { userprofiles: UserProfile[] } }
getSearchResult<Result>(keyword, SearchType.user).then((res) => {
	users.value = res.result.userprofiles
})
</script>

<style scoped lang="less"></style>
