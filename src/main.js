import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import Main from './Main.vue'
import Products from './components/Products.vue'
import Result from './components/Result.vue'
import App from './App.vue'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
    components,
    directives,
    iconfont: 'mdi',
})

const pinia = createPinia()

const routes = [
    {
        path: '/',
        component: Main,
    },
    {
        path: '/products',
        component: Products,
    },
    {
        path: '/result',
        component: Result,
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})

createApp(App).use(router).use(vuetify).use(pinia).mount('#app')