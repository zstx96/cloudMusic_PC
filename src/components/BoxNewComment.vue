<template lang="pug">
el-dialog(
    v-model="visible"
    :before-close="handleClose"
)
    template(#title)
        p(class=" text-center") 
            span 当前歌曲:
            span(class="font-normal text-xl") {{title}}
    el-input(
        v-model="text" 
        type="textarea" 
        :rows="5"
        placeholder="发表评论"
    )
    p(class=" font-normal text-xl") ☺ @ #
    .text-right 
        el-button(type="primary") 评论

</template>

<script lang="ts" setup>
import { ref } from 'vue'

defineProps<{ visible: boolean; title: string }>()
const emit = defineEmits<{
	(event: 'update:visible', arg1: boolean): void
}>()

const handleClose = () => {
	emit('update:visible', false)
}

const text = ref('')
</script>

<style scoped lang="less"></style>
