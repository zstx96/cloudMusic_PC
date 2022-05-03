<template lang='pug'>
div(v-if="form")
    h2(class="font-bold text-2xl") 编辑个人资料
    div(class="flex  ")
        el-form(class="flex-1"  )
            el-form-item(label="昵称") 
                el-input(v-model="form.nickname")
            el-form-item(label="介绍") 
                el-input(type="textarea" :rows="4" v-model="form.signature")
            el-form-item(label="性别") 
                el-radio-group(v-model="form.gender" )
                    el-radio(:label="0") 保密
                    el-radio(:label="1") 男
                    el-radio(:label="2") 女
            el-form-item(label="生日") 
                el-select(size="small")
                    el-option(v-for="item in 100" :label="1920+item+'年'" :value="item+1920")
                el-select(size="small")
                    el-option(v-for="item in 12" :label="item+'月'" :value="item")
                el-select(size="small")
                    el-option(v-for="item in 31" :label="item+'日'" :value="item")
            el-form-item(label="地区") 
                el-select
                el-select
            div(class="ml-10")
                el-button(type="danger" round) 保存
                el-button(round) 取消
        div(class="flex-1 flex flex-col items-center gap-6" )
            el-image(:src="userStore.user?.profile.avatarUrl" class="h-44 w-44")
            el-upload(action="1")
                el-button(round) 修改头像
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

watch(() => userStore.user, (user) => {
	if (user) {
		form.value = {
			gender: user?.profile.gender,
			birthday: user?.profile.birthday,
			nickname: user?.profile.nickname,
			province: user?.profile.province,
			city: user?.profile.city,
			signature: user?.profile.signature
		}
	}
},{immediate:true})


</script>

<style scoped lang="less">
.el-select{
    width: 120px;
    margin-right: 6px;
}
</style>