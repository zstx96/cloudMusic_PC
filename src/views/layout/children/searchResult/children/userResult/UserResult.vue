
<template lang='pug'>
div(v-if="users")
    div(v-for="item in users" class="flex h-20 hover:bg-slate-200 cursor-pointer items-center justify-between gap-3 p-2")
        el-avatar(:src="item.avatarUrl" size="large"  @click="$router.push(`/user/${item.userId}`)")
        span(v-text="item.nickname")
        span.flex-1
        span(class="text-sm text-app-gray" v-text="item.signature")
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
getSearchResult<Result>(keyword, SearchType.user).then(res => {
	console.log(res)
	users.value = res.result.userprofiles
})

</script>

<style scoped lang="less">
</style>