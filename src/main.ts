import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/loading/style/css'

import 'element-plus/theme-chalk/dark/css-vars.css'
import router from '@/router'
import { createPinia } from 'pinia'
import { globalProperties } from './plugin/globalProperties'
import { directives } from './plugin/directives'
const app = createApp(App)

const pinia = createPinia()
app.use(router).use(pinia).use(globalProperties).use(directives)

app.mount('#app')
