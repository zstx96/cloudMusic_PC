<template>
	<div><p>album</p></div>
</template>

<script lang="ts" setup>
import type { Album } from '@/interface'

defineProps<{ data: Album[] }>()
</script>

<style scoped lang="less"></style>
