<template lang="pug">
p(type="") fm
</template>

<script lang="ts" setup>
import { getPersonalFm } from '@/api/user'

getPersonalFm()
</script>

<style scoped lang="less"></style>
