<<<<<<< Updated upstream
=======
import { useLocalStorage } from '@vueuse/core'
import { Song } from './../interface/interface'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

interface DownloadStatus {
	id: number
	name: string
	percentage: number
	md5?: string
}
interface DownloadedStatus {
	id: number
	name: string
	ar: Song['ar']
	al: Song['al']
	size: number
	downloadTime: number
}
const downloadedList = useLocalStorage<(Song & { size: number; downloadTime: number })[]>('downloaded', [])
const downloadIds = useLocalStorage<number[]>('downloadIds', [])

const useDownloadStore = defineStore('download', () => {
	const downloadList = ref<DownloadStatus[]>([])

	const isLoading = computed(() => downloadList.value.some((item) => item.percentage !== undefined))

	const addStatus = (id: number, { name }: Omit<DownloadStatus, 'percentage'>) => {
		downloadList.value.push({ name, id, percentage: 0 })
	}
	const updateStatus = (id: number, percentage: number) => {
		if (percentage.toString().length > 5) debugger
		const index = downloadList.value.findIndex((item) => item.id === id)
		if (index !== -1) {
			downloadList.value[index].percentage = percentage
		}
	}
	const removeStatus = (id: number) => {
		const index = downloadList.value.findIndex((item) => item.id === id)
		if (index !== -1) {
			downloadList.value.splice(index, 1)
		}
	}

	const addDownloaded = ({ id, name, ar, al, size, downloadTime }: DownloadedStatus) => {
		// FIXME 目前要求接受song ，实际不是
		// @ts-ignore
		downloadedList.value.push({ name, ar, al, size, downloadTime, id })
		downloadIds.value.push(id)
	}

	return {
		isLoading,
		downloadList,
		addStatus,
		updateStatus,
		removeStatus,
		downloadedList,
		downloadIds,
		addDownloaded,
	}
})

export { useDownloadStore }
>>>>>>> Stashed changes
