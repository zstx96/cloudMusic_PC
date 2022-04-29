import { createApp, watch } from 'vue'
import App from './App.vue'
import "./index.css"
import "video.js/dist/video-js.css";

import ElementPlus, { ElLoading } from "element-plus"
import 'element-plus/dist/index.css'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Avatar, CaretBottom, CaretRight, ChatLineRound, Close, CopyDocument, Delete, Download, EditPen, Fold, FolderAdd, Headset, Message, Plus, Search, Setting, Share, Star, StarFilled } from "@element-plus/icons-vue"

import Router from "@/router"
import { createPinia } from 'pinia'

import "video.js/dist/video-js.css"; // 引入video.js的css



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
    .component('el-icon-fold', Fold)
    .component('el-icon-foldAdd', FolderAdd)
    .component('el-icon-avatar', Avatar)
    .component('el-icon-star', Star)
    .component('el-icon-starFilled', StarFilled)
    .component('el-icon-chatLineRound', ChatLineRound)
    .component('el-icon-share', Share)
    .component('el-icon-caretRight', CaretRight)
    .component('el-icon-caretBottom', CaretBottom)
    .component('el-icon-plus', Plus)
    .component('el-icon-download',Download)
    .component('el-icon-headset',Headset)
    .component('el-icon-editPen',EditPen)
    .component('el-icon-arrowUp',ArrowUp)
    .component('el-icon-arrowDown',ArrowDown)
    
app.mount('#app')
