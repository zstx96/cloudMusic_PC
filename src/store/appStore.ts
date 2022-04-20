import type { Nav } from "@/interface"
import { Banner } from "@/interface/interface"
import { useLocalStorage } from "@vueuse/core"
import { defineStore } from "pinia"
import { ref } from "vue"


const asideData: Nav = [
    {
        title: "发现音乐",
        path: "discovery",
        children: [
            {
                title: "个性推荐",
                path: "personal"
            },
            {
                title: "专属定制",
                path: "custom"
            },
            {
                title: "歌单",
                path: "songList"
            },
            {
                title: "排行榜",
                path: "rank"
            },
            {
                title: "歌手",
                path: "artist"
            },
            {
                title: "最新音乐",
                path: "newSongs"
            }

        ]
    },
    {
        title: "播客",
        path: "djradio",
    },
    {
        title: "视频",
        path: "video",
    },
    {
        title: "关注",
        path: "follows",
    },
    {
        title: "直播",
        path: "live",
    },
    {
        title: "私人FM",
        path: "fm",
    },
    {
        path: "playlist"
    },
    {
        path: "user"
    }

]
const useAppStore = defineStore("app", () => {
    const banners = ref<Banner[]>([])
    const setBanners = (value: Banner[]) => {
        banners.value = value
    }

    return {
        asideData,
        banners,
        setBanners
    }
})

export { useAppStore }