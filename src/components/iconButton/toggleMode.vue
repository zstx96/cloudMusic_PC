<template lang='pug'>
div(v-if="appStore.isDarkMode" @click="appStore.toggleMode") 白天模式
div(v-else @click="appStore.toggleMode") 夜间模式
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store/appStore'


const appStore = useAppStore()

</script>

<style scoped lang="less">

</style>