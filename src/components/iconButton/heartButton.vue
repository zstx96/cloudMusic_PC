<template lang='pug'>
div(class=" w-5 h-5")
    img(v-show="isLike" :src="heartFill"  title="取消喜欢" @click="$emit('dislike')")
    img(v-show="!isLike" :src="heart" title="喜欢" @click="$emit('like')" )
</template>

<script lang="ts" setup>
import heart from "@/assets/icon/heart.png"
import heartFill from "@/assets/icon/heart-fill.png"
defineProps<{ isLike: boolean }>()

</script>

<style scoped lang="less">
</style>