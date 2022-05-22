<template lang="pug">
el-table(
    v-if="processData"
    :data="processData" 
    class-name="text-sm" 
    @row-dblclick="handleRowDblClick"
)

    el-table-column(type="index" width="64" v-if="startIndex === undefined")
    el-table-column(type="index" width="64" v-else)
        template(#default="{$index}")
            span() {{startIndex+$index}} 
    el-table-column(label="操作" width="64")
        template(#default="{ row }")
            heart-button-vue(:is-like="row.isLiked" 
                @like="handleLike(row,true)" 
                @dislike="handleLike(row,false)"  
                class=" w-5 h-5"
            )
    el-table-column(label="标题" :min-width="200" prop="name")
        template(#default="{row}")
            p(class="flex items-center whitespace-nowrap")
                //- TODO 超长文本省略，最大长度为flex-1
                span(class="ellipsis  select-all" :title="row.name") {{row.name}}
                span.flex-1
                    span(v-if="row.noCopyrightRcmd" class=" ellipsis text-app-gray  text-xs ")
                        span(class="border rounded  m-1") 无音源
                        span( ) {{row.noCopyrightRcmd.typeDesc}}
                    span(v-else class="font-normal text-xs text-red-500")
                        span(v-if="row.sq" class="border round mx-1 px-1 border-current" @click="$router.push({name:'mv',params:{id:row.mv}})") SQ
                        span(v-if="row.mv" class="border round mx-1 px-1 border-current cursor-pointer" @click="$router.push({name:'mv',params:{id:row.mv}})") mv>
    el-table-column(label="歌手" :width="138" )
        template(#default="{ row }")
            div(class=" w-32  text-ellipsis text-blue-500  whitespace-nowrap")
                span(v-for="(item, index) in row.ar" class=" cursor-pointer" @click="$router.push(`/artist/${item.id}`)") {{ item.name }}
                    span(:class="[(index == row.ar.length - 1) && 'hidden']") /
    el-table-column(label="专辑")
        template(#default="{ row }")
            span(v-text="row.al.name" class=" w-32  text-ellipsis  whitespace-nowrap ")
    slot 
        el-table-column(label="时长")
            template(#default="{ row }")
                span(v-text="$dayjs(row.dt).format('mm:ss')")
        
        el-table-column(label="播放时间" v-if="showPlayTime")
            template(#default="{ $index}")
                slot( :index="$index" name="playtime")
           
    
    
</template>

<script lang="ts" setup>
import { likeSong } from '@/api/song'
import type { Song } from '@/interface'
import { usePlayerStore } from '@/store/playerStore'
import { useRecordStore } from '@/store/recordStore'
import { useUserStore } from '@/store/userStore'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import heartButtonVue from './iconButton/ButtonHeart.vue'

const props = defineProps<{ data: Song[]; showPlayTime?: boolean; startIndex?: number }>()

const recordStore = useRecordStore()
const processData = ref<Song[]>()
const userStore = useUserStore()
const playerStore = usePlayerStore()
const ids = userStore.likedIds

props.data.forEach((v) => {
	v.isLiked = ids?.includes(v.id) ? true : false
})

// eslint-disable-next-line vue/no-setup-props-destructure
processData.value = props.data

const handleRowDblClick = async (row: Song) => {
	if (!playerStore.currentSong || playerStore.currentSong!.id !== row.id) {
		recordStore.addPlayRecord([row])
		playerStore.$patch({
			currentSong: row,
		})
	}
}
const handleLike = async (song: Song, t: boolean) => {
	song.isLiked = t
	userStore.addLikeSong(song.id)
	const isSameWithCurrentSong = playerStore.currentSong?.id === song.id

	if (isSameWithCurrentSong) {
		playerStore.currentSong!.isLiked = t
	}

	const { code } = await likeSong(song.id, t)
	if (code !== 200) {
		ElMessage.error('网络发生了些错误,喜欢失败')
		song.isLiked = !t
		userStore.removeLikeSong(song.id)
		if (isSameWithCurrentSong) {
			playerStore.currentSong!.isLiked = !t
		}
	}
}
</script>

<style scoped lang="less"></style>
