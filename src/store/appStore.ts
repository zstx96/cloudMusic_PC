import type { Nav } from '@/interface'
import { Banner } from '@/interface/interface'
import { defineStore } from 'pinia'
import { ref } from 'vue'


const asideData: Nav = [
	// layout
	{
		name: 'layout',
		children: [
			{
				title: '发现音乐',
				name: 'discovery',
				children: [
					{
						title: '个性推荐',
						name: 'personal'
					},
					{
						title: '专属定制',
						name: 'custom'
					},
					{
						title: '歌单',
						name: 'songList'
					},
					{
						title: '排行榜',
						name: 'rank'
					},
					{
						title: '歌手',
						name: 'artists'
					},
					{
						title: '最新音乐',
						name: 'newSongs'
					}

				]
			},
			{
				title: '播客',
				name: 'djradio',
			},
			{
				title: '视频',
				name: 'video',
			},
			{
				title: '关注',
				name: 'follows',
			},
			{
				title: '直播',
				name: 'live',
			},
			{
				title: '私人FM',
				name: 'fm',
			},
			// group 我的音乐
			{
				title: '本地与下载',
				name: 'download',
				group:'我的音乐'
			},
			{
				title: '最近播放',
				name: 'recentPlay',
				group:'我的音乐'
			},
			{
				title: '我的音乐云盘',
				name: 'myPan',
				group:'我的音乐'
			},
			{
				title: '我的播客',
				name: 'myDj',
				group:'我的音乐'
			},
			{
				title: '我的收藏',
				name: 'myCollection',
				group:'我的音乐'
			},
			// group 创建歌单
			{
				name: 'playlist',
				params: { id: true },
			},
			{
				name:'editPlaylist'
			},
			{
				name: 'user',
				params: {
					id: true
				}
			},
			{
				name: 'searchResult',
				children: [
					{
						title: '单曲',
						name: 'songResult'
					},
					{
						title: '歌手',
						name: 'artistResult'
					},
					{
						title: '专辑',
						name: 'albumResult'
					},
					{
						title: '视频',
						name: 'mvResult'
					},
					{
						title: '歌单',
						name: 'playlistResult'
					},
					{
						title: '歌词',
						name: 'lyricResult'
					},
					{
						title: '博客',
						name: 'radioResult'
					},
					{
						title: '声音',
						name: 'voiceResult'
					},
					{
						title: 'user',
						name: 'userResult'
					},
				]
			},
			{
				name: 'dailyRecommendSongs'
			},
			{
				name: 'artist',
				params: {
					id: true
				},
				children: [
					{
						name: 'artistAlbum'
					},
					{
						name: 'artistMv'
					},
					{
						name: 'artistDesc'
					},
					{
						name: 'artistSimi'
					}
				]
			},
			{
				name:'editSelf'
			}
		]
	},

	{
		name: 'song'
	},
	{
		name: 'mv',
		params:{id:true}
	}
]
const useAppStore = defineStore('app', () => {
	const banners = ref<Banner[]>([])

	const isDarkMode = ref(true)

	const toggleMode = () => {
		const app = <HTMLElement>document.querySelector('#app')
		if (isDarkMode.value) {
			app.style.setProperty('--background', '#fff')
			app.style.setProperty('--text', '#2c3e50')
		}else{
			app.style.setProperty('--background', '#2b2b2b')
			app.style.setProperty('--text', '#fff')
		}
		isDarkMode.value = !isDarkMode.value
	}

	const setBanners = (value: Banner[]) => {
		banners.value = value
	}

	return {
		asideData,
		banners,
		setBanners,
		isDarkMode,
		toggleMode
	}
})

export { useAppStore }