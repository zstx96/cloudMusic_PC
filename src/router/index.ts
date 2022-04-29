import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from "vue-router"
import Layout from "@/layout/Layout.vue"



const routes: RouteRecordRaw[] = [
  
    
  /*   {
        name:'song',
        path:"/song",
        component:()=>import("@/views/song/Song.vue")
    }
     */
]


const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router