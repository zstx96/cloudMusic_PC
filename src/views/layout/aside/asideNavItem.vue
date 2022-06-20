<template>
	<div><el-image v-if="item.iconUrl" :src="item.iconUrl"></el-image><span v-text="item.title"></span></div>
</template>

<script lang="ts" setup>
import type { NavItem } from '@/interface'

defineProps<{ item: NavItem }>()
</script>

<style scoped lang="less"></style>
