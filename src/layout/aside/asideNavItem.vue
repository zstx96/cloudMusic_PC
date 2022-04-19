<template lang='pug'>
div
    el-image(v-if="iconUrl" :src="iconUrl")
    span(v-text="title")
</template>

<script lang="ts" setup>
import type { NavItem } from '@/interface/app';

const props = defineProps<NavItem>()

</script>

<style scoped lang="less">
</style>