<template>
	<div v-if="follows">
		<p>{{ name }}的关注</p>
		<div class="flex flex-wrap justify-between text-sm font-light">
			<div v-for="item in follows" class="el-card m-2 flex w-[380px] items-center gap-3 p-3">
				<div class="relative flex h-[70px] w-[70px] items-center">
					<img
						class="overflow-hidden rounded-full"
						:src="item.avatarUrl"
						@click="$router.push({ name: 'user', params: { id: item.userId } })"
					/><img
						v-if="item.avatarDetail"
						class="absolute top-[45px] left-[45px] h-6 w-6"
						:src="item.avatarDetail.identityIconUrl"
					/>
				</div>
				<div>
					<p class="py-2 text-base font-normal">{{ item.nickname }}</p>
					<p class="w-[180px] overflow-hidden text-ellipsis whitespace-nowrap">{{ item.signature }}</p>
					<div class="flex gap-4">
						<span>歌单: {{ item.playlistCount }}</span
						><span>|</span><span>粉丝: {{ item.follows }}</span>
					</div>
				</div>
				<div><el-button icon="i-ep-message" round>私信</el-button></div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { getFollows } from '@/api/user'
import type { Follower } from '@/interface'

const route = useRoute()
const id = parseInt(route.params.id as string)
const name = route.query.name

const follows = ref<Follower[]>()
getFollows(id).then((res) => {
	follows.value = res.follow
})
</script>

<style scoped lang="less"></style>
