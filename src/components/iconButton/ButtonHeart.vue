<template>
	<div class="h-5 w-5">
		<img v-show="isLike" :src="heartFill" title="取消喜欢" @click="$emit('dislike')" /><img
			v-show="!isLike"
			:src="heart"
			title="喜欢"
			@click="$emit('like')"
		/>
	</div>
</template>

<script lang="ts" setup>
import heart from '@/assets/icon/heart.png'
import heartFill from '@/assets/icon/heart-fill.png'
defineProps<{ isLike?: boolean }>()
defineEmits(['like', 'dislike'])
// TODO 想实现一个like动画，如果请求失败，回滚
</script>

<style scoped lang="less"></style>
