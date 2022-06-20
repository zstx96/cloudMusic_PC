<template>
	<el-table v-if="processData" :data="processData" class-name="text-sm" @row-dblclick="handleRowDblClick"
		><el-table-column v-if="startIndex === undefined" type="index" width="64"></el-table-column
		><el-table-column v-else type="index" width="64"
			><template #default="{ $index }"
				><span>{{ startIndex + $index }} </span></template
			></el-table-column
		><el-table-column label="操作" width="64"
			><template #default="{ row }"
				><heart-button-vue
					class="h-5 w-5"
					:is-like="row.isLiked"
					@like="handleLike(row, true)"
					@dislike="handleLike(row, false)"
				></heart-button-vue></template></el-table-column
		><el-table-column label="标题" :min-width="200" prop="name"
			><template #default="{ row }"
				><p class="flex items-center whitespace-nowrap">
					<!--  TODO 超长文本省略，最大长度为flex-1 --><span class="ellipsis select-all" :title="row.name">{{
						row.name
					}}</span
					><span class="flex-1"
						><span v-if="row.noCopyrightRcmd" class="ellipsis text-xs text-app-gray"
							><span class="m-1 rounded border">无音源</span
							><span>{{ row.noCopyrightRcmd.typeDesc }}</span></span
						><span v-else class="text-xs font-normal text-red-500"
							><span
								v-if="row.sq"
								class="round mx-1 border border-current px-1"
								@click="$router.push({ name: 'mv', params: { id: row.mv } })"
								>SQ</span
							><span
								v-if="row.mv"
								class="round mx-1 cursor-pointer border border-current px-1"
								@click="$router.push({ name: 'mv', params: { id: row.mv } })"
								>mv></span
							></span
						></span
					>
				</p></template
			></el-table-column
		><el-table-column label="歌手" :width="138"
			><template #default="{ row }"
				><div class="w-32 text-ellipsis whitespace-nowrap text-blue-500">
					<span
						v-for="(item, index) in row.ar"
						:key="index"
						class="cursor-pointer"
						@click="$router.push(`/artist/${item.id}`)"
						>{{ item.name }}<span :class="[index == row.ar.length - 1 && 'hidden']">/</span></span
					>
				</div></template
			></el-table-column
		><el-table-column label="专辑"
			><template #default="{ row }"
				><span
					class="w-32 text-ellipsis whitespace-nowrap"
					v-text="row.al.name"
				></span></template></el-table-column
		><slot>
			<el-table-column label="时长"
				><template #default="{ row }"
					><span v-text="$dayjs(row.dt).format('mm:ss')"></span></template></el-table-column
			><el-table-column v-if="showPlayTime" label="播放时间"
				><template #default="{ $index }"
					><slot :index="$index" name="playtime"></slot></template></el-table-column></slot
	></el-table>
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
