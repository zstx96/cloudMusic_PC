<template lang="pug">
div
    el-image(v-if="item.iconUrl" :src="item.iconUrl")
    span(v-text="item.title")
</template>

<script lang="ts" setup>
import type { NavItem } from '@/interface'

defineProps<{ item: NavItem }>()
</script>

<style scoped lang="less"></style>
