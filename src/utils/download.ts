import type { Song } from '@/interface'
import { useDownloadStore } from '@/store/downloadStore'
import Service from '@/utils/Service'
import { ElLoading, ElMessage } from 'element-plus'
import { throttle } from 'lodash'

const download = async (song: Song) => {
	const downloadStore = useDownloadStore()

	if (downloadStore.downloadIds.includes(song.id)) {
		ElMessage.info(`${song.name}已经下载过了`)
		return
	}

	Service.get(`/song/download/url?id=${song.id}`).then(async (res) => {
		const url = res.data.url
		if (url) {
			downloadStore.addStatus(song.id, { name: song.name, id: song.id })

			/* 	const instance = ElLoading.service({
				target: '#app',
				customClass: 'loading-custom',
				fullscreen: false,
				text: song.name,
			}) */

			const response = await fetch(url)
			const reader = response.body!.getReader()
			const chunks = []
			let receivedLength = 0
			const contentLength = response.headers.get('Content-Length')!

			let isLoading = true
			while (isLoading) {
				const { done, value } = await reader.read()
				if (done) {
					isLoading = false
					break
				}

				receivedLength += value.length
				throttle(() => {
					const percentage = (100 * receivedLength) / parseInt(contentLength)

					downloadStore.updateStatus(song.id, parseInt(percentage.toString()))
				}, 100)()

				chunks.push(value)
			}
			const chunksAll = new Uint8Array(receivedLength)
			let position = 0
			for (const chunk of chunks) {
				chunksAll.set(chunk, position)
				position += chunk.length
			}
			const b = new Blob([chunksAll])
			const a = document.createElement('a')
			const downloadUrl = window.URL.createObjectURL(b)
			a.href = downloadUrl
			a.download = `${song.name}.mp3`
			a.click()
			window.URL.revokeObjectURL(downloadUrl)
			downloadStore.removeStatus(song.id)
			downloadStore.addDownloaded(
				Object.assign(song, {
					size: receivedLength,
					downloadTime: Date.now(),
				})
			)
			// instance.close()
		}
	})
}

export { download }
