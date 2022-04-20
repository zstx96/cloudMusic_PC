<script setup lang="ts">
// 根据config设置#app的宽高

import { onMounted } from 'vue';
import config, { app_height, app_width, resizeWindow } from "@/config"
import { useRouter } from 'vue-router';
import { getLoginStatus, getUserDetail } from './api/user';
import { useAppStore } from "@/store/appStore"

import type { Nav } from './interface';
import type { RouteRecordRaw } from 'vue-router';
import { useUserStore } from './store/userStore';
import { getLikelist } from './api/songlist';
import playerVue from './components/player/player.vue';
import { useLocalStorage } from '@vueuse/core';

const appStore = useAppStore()
const asideData = appStore.asideData
const router = useRouter()
const userStore = useUserStore()

getLoginStatus().then(res => {
  if (res.data.code === 200) {
    const userId = res.data.profile.userId
    getUserDetail(userId).then(userInfo => {
      userStore.setUser(userInfo)
    })
    getLikelist(userId).then(res => {
      userStore.$patch({
        likedIds: res.ids
      })
    })
  }
})


const firstWordUpper = (str: string) => str.replace(/^\S/, s => s.toUpperCase())
const addRecordToRouter = (parentName: string, navs: Nav, parentFileName?: string) => {
  const router = useRouter()
  navs.forEach(nav => {
    const name = nav.path
    const record: RouteRecordRaw = {
      path: nav.path,
      name,
      component: () => import(`../src/views/${parentFileName ? (parentFileName + '/children/') : `${name}`}/${firstWordUpper(name)}.vue`)
    }
    if (nav.children) {
      record.redirect = { name: nav.children[0].path }
    }
    router.addRoute(parentName, record)
    if (nav.children) {
      addRecordToRouter(name, nav.children, name)
    }
  })
}
addRecordToRouter("home", asideData)
router.addRoute("home", {
  path: "/:pathMatch(.*)*",
  component: () => import("../src/views/404.vue")
})
// router.replace(router.currentRoute.value.fullPath)

const lastPage = useLocalStorage('lastPage', '')
router.push(lastPage.value)
router.afterEach((to) => {
  lastPage.value = to.fullPath
})

onMounted(() => {
  resizeWindow()
})

</script>

<template lang="pug">
div(class=" overflow-y-auto flex-1 ")
  router-view(#default="{ Component }" :key="$route.query.id")
    keep-alive
      component(:is="Component")
div(class="h-[70px]")
  player-vue()
</template>

<style>
html,
body {
  height: 100%;
  width: 100%;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(126, 117, 81);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: aliceblue;
  position: relative;
  display: flex;
  flex-direction: column;
}
</style>
