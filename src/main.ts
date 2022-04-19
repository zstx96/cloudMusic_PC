import { createApp } from 'vue'
import App from './App.vue'
import "./index.css"

import ElementPlus from "element-plus"
import 'element-plus/dist/index.css'
import { ArrowLeft, ArrowRight, Avatar, Close, CopyDocument, Delete, Fold, FolderAdd, Message, Search, Setting } from "@element-plus/icons-vue"

import Router from "@/router"
import { createPinia } from 'pinia'


const app = createApp(App)

app.use(ElementPlus).use(Router).use(createPinia())

app.component('el-icon-close', Close)
    .component('el-icon-message', Message)
    .component('el-icon-setting', Setting)
    .component('el-icon-copyDocument', CopyDocument)
    .component('el-icon-arrowLeft', ArrowLeft)
    .component('el-icon-arrowRight', ArrowRight)
    .component('el-icon-search', Search)
    .component('el-icon-delete', Delete)
    .component('el-icon-fold',Fold)
    .component('el-icon-foldAdd' ,FolderAdd)
    .component('el-icon-avatar',Avatar) 
app.mount('#app')
