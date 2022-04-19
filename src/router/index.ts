import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import Layout from "@/layout/Layout.vue"



const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "home",
        component: Layout,
        redirect: "discovery",
        children:[
            {
                path:"artist",
                component:()=>import("@/views/artist/Artist.vue")
            }
        ]
    },
    {
        path: "/song",
        name: "song",
        component: () => import("@/views/Song.vue")
    },
]


const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router