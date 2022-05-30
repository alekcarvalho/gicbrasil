import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createHead } from '@vueuse/head'
import { http, https } from '~/services/http'
import { createPinia } from 'pinia'
import { setupLayouts } from 'virtual:generated-layouts'
import Maska from 'maska'
import generatedRoutes from 'virtual:generated-pages'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import VueLazyLoad from 'vue3-lazyload'
import App from './App.vue'

// css
import 'virtual:windi.css'
import '~/assets/scss/main.scss'

//libs
const routes = setupLayouts(generatedRoutes)
export const router = createRouter({
  history: createWebHistory(),
  routes,
})
const app = createApp(App)
const head = createHead()
const pinia = createPinia()

//persist state
pinia.use(piniaPluginPersistedstate)

//app use
app.use(router)
app.use(head)
app.use(pinia)
app.use(VueLazyLoad)
app.use(Maska)

//provides
app.provide('$http', http)
app.provide('$https', https)

//mount app
app.mount('#app')
