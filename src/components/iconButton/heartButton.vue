<template lang="pug">
div(class=" w-5 h-5")
    img(v-show="isLike" :src="heartFill"  title="取消喜欢" @click="($emit('dislike'), isLike = false)")
    img(v-show="!isLike" :src="heart" title="喜欢" @click="($emit('like'), isLike = true)" )
</template>

<script lang="ts" setup>
import heart from '@/assets/icon/heart.png'
import heartFill from '@/assets/icon/heart-fill.png'
import { ref } from 'vue'
const props = defineProps<{ isLike?: boolean }>()
const isLike = ref(props.isLike)
</script>

<style scoped lang="less"></style>
