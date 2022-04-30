<template>
  <div>
    <video
      id="dplayer"
      preload="metadata"
      controls
      class=" h-[400px] w-[500px]"
      crossorigin="use-credentials"
    />
    <p> fsf </p>
  </div>
</template>

<script lang="ts" setup>
import Service from '@/utils/Service'
import { onMounted, ref } from 'vue'

import Hls from 'hls.js'
import DPlayer from 'dplayer'

const video = ref<HTMLVideoElement>()

const generateUrlById = (id: number) => {
	return '/se/index.php/webapi_v1/resource/playvideo/line/0/movie_id/' + id.toString() + '?sign=GPraZ4QaIJouHqx9Sz3sG9uEL4Z9rpeSknZduiuiGSAAfoRydw1S%2BJn4EdLB7w%2Bz4qqT4w06yrO2snxg3lMRDGWZz7SUARjqOCpSQf6XruC03D78d%2Bos8RzPgd4PibNwtqj1zfGR8%2BMOycOnQJnkIRzUmaSqKvwiYMPs5p2fnXYFAhjKdiS1cklBdzoH4tgW141qwdFcJIDPOe00BjRWY2O3U6gYmQYUMyqQJiYIHbJKWFszG6LJz8zBE7vVGJQYSQwJFOxft9PAA7HGFKvuSEekwanOgOMtDAvzq8pYFMQe35%2FeaHFd2203rI5PpDDodDPUfVIICYhufuhDCkTRW1KEVCIli%2BYuCoKrYzFJDxo6Ztu%2BhJP2PyOg5E5RQQn2GYhNRQxiAfmjsiDc6977ltW%2B41ixUiTdvRChZKe6blyjhm%2BBgBrT4asgUaie%2FGtKUYh%2F6SoAmVElZ7Z51Q8S4ti%2BpU%2FR%2FZi4WXjYAvxiCLfC8%2BuX0V9%2B7NIjR8eTB4DSyHbJkfjlfLOOtGStNBWErsLk%2BXBxXymcwdJrl1tYqPIUhtKQ09SNgmQITZ5E5Qzt%2FRkNUqpfmgzaNDR4WH27jzEVAMIm39RR0tcUzAxZy20R0AhQJSx6BIXVSgdvdp4sONTP7UaOOKTPfWtfCP20Ukzd18aflvHdvQRaPYp90UY%3D&movie.m3u8'

}

const formatm3u8 = async (v: HTMLVideoElement, id: number) => {
	const url = generateUrlById(id)
	const buffer = await (await fetch(url)).text()
	const arr = buffer.split('\n')
	const content = arr.slice(6)
	let src
	const firstErrorindex = content.findIndex(v => v.includes('dont'))
	if (firstErrorindex === -1) {
		src = new Blob([buffer], { type: 'text/plain' })

	} else {
		let len = content[firstErrorindex - 2].length
		if (!len) return
		let base = parseInt(content[firstErrorindex - 2].substring(len - 6, len - 3))
		const template = content[base].match(/com\/(.*)[0-9]{3}\.ts/)![1]


		content.forEach((v, index) => {
			if (v.includes('dontHaveFile') && index >= firstErrorindex) {
				base++
				content[index] = v.replace('dontHaveFile', `${template}${base.toString().padStart(3, '0')}`)
			}
		})
		const alted = [...arr.slice(0, 6), ...content].join('\n')
		src = new Blob([alted], { type: 'text/plain' })
	}
	v.src = URL.createObjectURL(src)
	v.oncanplay = () => {
		v.play()
	}
}



onMounted(async () => {
	const player = <HTMLVideoElement>document.getElementById('dplayer')!
	// src.value = URL.createObjectURL(res)
	const id = 11235
	await formatm3u8(player, id)
	const hls = new Hls
	hls.loadSource(player.src)
	hls.attachMedia(player)

})
</script>

<style scoped lang="less">
</style>