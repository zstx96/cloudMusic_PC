<template lang='pug'>
div(v-if="albums" ) 
    div()
        div
        div
            el-table(:data="albums")
                el-table-column(type="index")
                el-table-column
                    template(#default="{ row }")
                        span() {{ row.name }}
                        span(class=" text-app-gray") ({{ row.alias[0] }})
                el-table-column
</template>

<script lang="ts" setup>
import { getArtistAlbum } from '@/api/artist';
import playlistDisplayVue from '@/components/playlist/playlistDisplay.vue';
import type { IHotAlbum } from '@/interface';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const id = parseInt(route.params.id as string)

const albums = ref<IHotAlbum[]>()
getArtistAlbum(id).then(res => {
    albums.value = res.hotAlbums
})


</script>

<style scoped lang="less">
</style>