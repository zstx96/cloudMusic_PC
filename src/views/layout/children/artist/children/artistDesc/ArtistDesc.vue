<template lang='pug'>
div(v-if="desc")
    h2.font-bold 歌手描述
    p(class=" indent-[2rem] font-light") {{desc.briefDesc}}
</template>

<script lang="ts" setup>
import { getArtistDesc } from '@/api/artist'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = parseInt(route.params.id as string)

const desc = ref<Awaited<ReturnType<typeof getArtistDesc>>>()
getArtistDesc(id).then(res => {
	desc.value = res
})

</script>

<style scoped lang="less">
</style>