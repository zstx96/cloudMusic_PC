<template lang='pug'>
div(v-if="albums" ) {{ albums }}
    div(v-for="item in albums")
        div
        div
</template>

<script lang="ts" setup>
import { getArtistAlbum } from '@/api/artist';
import { IHotAlbum } from '@/interface';
import { ref } from 'vue';


const props = defineProps<{ id: number }>()
const id = props.id

const albums = ref<IHotAlbum[]>()
getArtistAlbum(id).then(res => {
    albums.value = res.hotAlbums
})


</script>

<style scoped lang="less">
</style>