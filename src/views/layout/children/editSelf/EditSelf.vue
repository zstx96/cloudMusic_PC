<template>
	<div v-if="form">
		<h2 class="text-2xl font-bold">编辑个人资料</h2>
		<div class="flex">
			<el-form class="flex-1"
				><el-form-item label="昵称"> <el-input v-model="form.nickname"></el-input></el-form-item
				><el-form-item label="介绍">
					<el-input v-model="form.signature" type="textarea" :rows="4"></el-input></el-form-item
				><el-form-item label="性别">
					<el-radio-group v-model="form.gender"
						><el-radio :label="0">保密</el-radio><el-radio :label="1">男</el-radio
						><el-radio :label="2">女</el-radio></el-radio-group
					></el-form-item
				><el-form-item label="生日">
					<el-select size="small"
						><el-option
							v-for="item in 100"
							:key="item"
							:label="1920 + item + '年'"
							:value="item + 1920"
						></el-option></el-select
					><el-select size="small"
						><el-option
							v-for="item in 12"
							:key="item"
							:label="item + '月'"
							:value="item"
						></el-option></el-select
					><el-select size="small"
						><el-option
							v-for="item in 31"
							:key="item"
							:label="item + '日'"
							:value="item"
						></el-option></el-select></el-form-item
				><el-form-item label="地区"> <el-select></el-select><el-select></el-select></el-form-item>
				<div class="ml-10">
					<el-button type="danger" round>保存</el-button><el-button round>取消</el-button>
				</div></el-form
			>
			<div class="flex flex-1 flex-col items-center gap-6">
				<el-image class="h-44 w-44" :src="userStore.user?.profile.avatarUrl"></el-image
				><el-upload action="1"><el-button round>修改头像</el-button></el-upload>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import type { UserProfile } from '@/interface'
import { useUserStore } from '@/store/userStore'

import { ref, watch } from 'vue'

// gender: 性别 0:保密 1:男性 2:女性
// birthday: 出生日期,时间戳 unix timestamp
// nickname: 用户昵称
// province: 省份id
// city: 城市id
// signature：用户签名

const userStore = useUserStore()
const form = ref<Pick<UserProfile, 'gender' | 'birthday' | 'nickname' | 'province' | 'city' | 'signature'>>()

watch(
	() => userStore.user,
	(user) => {
		if (user) {
			form.value = {
				gender: user?.profile.gender,
				birthday: user?.profile.birthday,
				nickname: user?.profile.nickname,
				province: user?.profile.province,
				city: user?.profile.city,
				signature: user?.profile.signature,
			}
		}
	},
	{ immediate: true }
)
</script>

<style scoped lang="less">
.el-select {
	width: 120px;
	margin-right: 6px;
}
</style>
