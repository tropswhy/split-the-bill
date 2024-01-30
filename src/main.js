import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import Main from './Main.vue'
import App from './App.vue'

const vuetify = createVuetify({
    components,
    directives,
})

const pinia = createPinia()

const routes = [
    {
        path: '/',
        component: Main,
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})

createApp(App).use(router).use(vuetify).use(pinia).mount('#app')