// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import '@/styles/common.scss'
// 引入懒加载指令插件并且注册
import { lazyPlugin } from '@/directives'
import {componentPlugin} from '@/components'
const app = createApp(App)

const pinia = createPinia()
app.use(componentPlugin)
app.use(lazyPlugin )
app.use(pinia)
app.use(router)
app.mount('#app')
