import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import router from '@/router'
import { createPinia } from 'pinia'
import { globalProperties } from './plugin/globalProperties'
const app = createApp(App)

const pinia = createPinia()
app.use(ElementPlus).use(router).use(pinia).use(globalProperties)

app.mount('#app')
