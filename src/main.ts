import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import dayjs from 'dayjs'

import {
	ArrowDown,
	ArrowLeft,
	ArrowRight,
	ArrowUp,
	Avatar,
	Bottom,
	CaretBottom,
	CaretRight,
	ChatLineRound,
	Close,
	CopyDocument,
	Delete,
	Download,
	Edit,
	EditPen,
	Fold,
	FolderAdd,
	FolderChecked,
	Headset,
	Message,
	Plus,
	Search,
	Setting,
	Share,
	Star,
	StarFilled,
} from '@element-plus/icons-vue'

import router from '@/router'
import { createPinia } from 'pinia'
import { globalProperties } from './plugin/globalProperties'
const app = createApp(App)

const pinia = createPinia()
app.use(ElementPlus).use(router).use(pinia).use(globalProperties)

app.component('ElIconClose', Close)
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
	.component('el-icon-download', Download)
	.component('el-icon-headset', Headset)
	.component('el-icon-editPen', EditPen)
	.component('el-icon-arrowUp', ArrowUp)
	.component('el-icon-arrowDown', ArrowDown)
	.component('el-icon-bottom', Bottom)
	.component('el-icon-edit', Edit)
	.component('el-icon-foldChecked', FolderChecked)

app.mount('#app')
